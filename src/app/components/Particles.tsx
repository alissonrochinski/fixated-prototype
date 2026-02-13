import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';
import gsap from 'gsap';
import './Particles.css';

/* ── Shaders ───────────────────────────────────────────────────────── */

const vertexParticles = /* glsl */ `
  attribute vec3 position;
  attribute vec3 color;
  attribute float size;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uPulse;
  uniform float uTime;

  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPos = viewMatrix * modelMatrix * vec4(position, 1.0);

    float pulseFactor = 1.0;
    if (uPulse > 0.0) {
      pulseFactor = 1.0 + uPulse * 0.5 * (0.5 + 0.5 * sin(uTime * 4.0));
    }

    gl_PointSize = (size * pulseFactor) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentParticles = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uPulse;
  uniform float uHoverTime;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    float alpha;
    float glow = 1.0;

    if (uPulse > 0.0) {
      // Stage 1: solid core + breathing outer glow + periodic ripple
      float pulse = sin(uTime * 6.0) * 0.5 + 0.5; // 0..1 oscillation
      
      // Solid bright core
      float core = smoothstep(0.25, 0.15, d);
      
      // Soft outer glow that breathes
      float glowRadius = 0.3 + pulse * 0.15;
      float outerGlow = smoothstep(0.5, 0.0, d) * (0.4 + pulse * 0.4);
      
      // Periodic expanding ring (ripple/outline)
      float rippleSpeed = 0.6; // seconds per cycle
      float ripplePhase = fract(uTime / rippleSpeed); // 0..1 repeating
      float rippleRadius = ripplePhase * 0.5; // expands from center to edge
      float rippleWidth = 0.03;
      float ring = smoothstep(rippleWidth, 0.0, abs(d - rippleRadius));
      float rippleFade = 1.0 - ripplePhase; // fades as it expands
      float ripple = ring * rippleFade * 0.6;
      
      // Hover-triggered ripple
      float hoverElapsed = uTime - uHoverTime;
      float hoverRipple = 0.0;
      if (hoverElapsed > 0.0 && hoverElapsed < 1.0) {
        float hRadius = hoverElapsed * 0.6;
        float hRing = smoothstep(0.04, 0.0, abs(d - hRadius));
        hoverRipple = hRing * (1.0 - hoverElapsed) * 0.8;
      }
      
      alpha = core + outerGlow + ripple + hoverRipple;
      glow = 1.0 + pulse * 0.3;
    } else {
      // Stages 2/3: crisp solid circle, no blur
      alpha = smoothstep(0.5, 0.42, d);
    }

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor * glow, alpha);
  }
`;

const vertexLines = /* glsl */ `
  attribute vec3 position;
  attribute float alpha;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  varying float vAlpha;

  void main() {
    vAlpha = alpha;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

const fragmentLines = /* glsl */ `
  precision highp float;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * 0.35);
  }
`;

/* ── Types ─────────────────────────────────────────────────────────── */

interface ParticlesProps {
    stage?: number;
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    pixelRatio?: number;
    className?: string;
}

/* ── Helpers ───────────────────────────────────────────────────────── */

const defaultColors = ['#ffffff', '#4fd1c5', '#81e6d9'];

function hexToRgb(hex: string) {
    const b = parseInt(hex.replace('#', ''), 16);
    return [(b >> 16) & 255, (b >> 8) & 255, b & 255].map(v => v / 255);
}

function mix(a: number, b: number, t: number) { return a + (b - a) * t; }

/* ── Component ─────────────────────────────────────────────────────── */

const Particles: React.FC<ParticlesProps> = ({
    stage = 0,
    particleCount = 500,
    speed = 0.1,
    particleColors,
    moveParticlesOnHover = false,
    particleHoverFactor = 1,
    particleBaseSize = 100,
    sizeRandomness = 1,
    cameraDistance = 20,
    disableRotation = false,
    pixelRatio = 1,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lerpedMouse = useRef({ x: 0, y: 0 });
    const reqId = useRef<number>(0);
    const stageRef = useRef(stage);

    // Drag rotation state
    const dragRef = useRef({
        active: false,
        startX: 0, startY: 0,
        rotX: 0, rotY: 0,
        velX: 0, velY: 0,
        lastX: 0, lastY: 0,
    });

    /* CPU particle data */
    const dataRef = useRef<{
        base: Float32Array; // unit-disk base positions [ x,y, 0 ]
        rnd: Float32Array; // 4 randoms per particle
        depth: Float32Array; // per-particle depth/parallax factor (0..1)
        szMult: Float32Array; // per-particle size jitter
        cur: Float32Array; // current world positions (updated every frame)
    }>();

    /* GSAP-driven animation state (mutated by tween, read by rAF loop) */
    const anim = useRef({
        count: 0,
        spread: 4,
        baseSize: particleBaseSize,
        pulse: 0,
        orbit: 0.5,
    });

    /* ── Init (runs once) ──────────────────────────────────── */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Renderer
        const renderer = new Renderer({ dpr: pixelRatio, depth: false, alpha: true });
        const gl = renderer.gl;
        el.appendChild(gl.canvas);
        gl.clearColor(0, 0, 0, 0);

        // Camera — wider FOV so particles fill the viewport
        const camera = new Camera(gl, { fov: 45 });
        camera.position.set(0, 0, cameraDistance);

        // Resize
        const resize = () => {
            renderer.setSize(el.clientWidth, el.clientHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        window.addEventListener('resize', resize);
        resize();

        // Mouse move
        const onMouse = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
            mouseRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
            // Drag rotation (stages 2/3)
            const dr = dragRef.current;
            if (dr.active && stageRef.current >= 2) {
                const dx = e.clientX - dr.lastX;
                const dy = e.clientY - dr.lastY;
                dr.velX = dx * 0.003;
                dr.velY = dy * 0.003;
                dr.rotY += dr.velX;
                dr.rotX += dr.velY;
                dr.lastX = e.clientX;
                dr.lastY = e.clientY;
            }
        };
        if (moveParticlesOnHover) window.addEventListener('mousemove', onMouse);

        // Drag start/end
        const onDown = (e: MouseEvent) => {
            if (stageRef.current < 2) return;
            const dr = dragRef.current;
            dr.active = true;
            dr.lastX = e.clientX;
            dr.lastY = e.clientY;
            dr.velX = 0; dr.velY = 0;
            (gl.canvas as HTMLCanvasElement).style.cursor = 'grabbing';
        };
        const onUp = () => {
            dragRef.current.active = false;
            (gl.canvas as HTMLCanvasElement).style.cursor = 'grab';
        };
        gl.canvas.addEventListener('mousedown', onDown as any);
        window.addEventListener('mouseup', onUp);
        (gl.canvas as HTMLCanvasElement).style.cursor = 'grab';

        // Generate particle data
        const N = particleCount;
        const base = new Float32Array(N * 3);
        const rnd = new Float32Array(N * 4);
        const depth = new Float32Array(N);
        const szMult = new Float32Array(N);
        const colors = new Float32Array(N * 3);
        const pal = particleColors?.length ? particleColors : defaultColors;

        for (let i = 0; i < N; i++) {
            if (i === 0) {
                // First particle always at exact center (used as Stage 1 seed)
                base.set([0, 0, 0], 0);
            } else {
                // Uniform disk distribution (flat, no Z)
                let x: number, y: number, l: number;
                do { x = Math.random() * 2 - 1; y = Math.random() * 2 - 1; l = x * x + y * y; }
                while (l > 1 || l === 0);
                const r2 = Math.sqrt(Math.random());
                base.set([x * r2, y * r2, 0], i * 3);
            }

            // Randoms (orbit phase/speed)
            rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

            // Depth factor: 0.2 → 1.0, controls parallax amount
            // Particles with higher depth react MORE to mouse (foreground feeling)
            depth[i] = 0.2 + Math.random() * 0.8;

            // Size jitter
            szMult[i] = sizeRandomness > 0 ? 1 + sizeRandomness * (Math.random() - 0.5) : 1;

            // Color: init to dark grey #858585
            colors.set([0.52, 0.52, 0.52], i * 3);
        }

        dataRef.current = { base, rnd, depth, szMult, cur: new Float32Array(N * 3) };

        // ── Points mesh ──────────────────────────────────────
        const pGeo = new Geometry(gl, {
            position: { size: 3, data: new Float32Array(N * 3) },
            color: { size: 3, data: colors },
            size: { size: 1, data: new Float32Array(N) },
        });
        // Mark all attributes dynamic
        (pGeo.attributes.position as any).needsUpdate = true;
        (pGeo.attributes.size as any).needsUpdate = true;
        (pGeo.attributes.color as any).needsUpdate = true;

        const pProg = new Program(gl, {
            vertex: vertexParticles,
            fragment: fragmentParticles,
            uniforms: { uTime: { value: 0 }, uPulse: { value: 0 }, uHoverTime: { value: -10 } },
            transparent: true, depthTest: false, depthWrite: false,
        });
        const pMesh = new Mesh(gl, { mode: gl.POINTS, geometry: pGeo, program: pProg });
        let lastHoverTrigger = -10;

        // ── Lines mesh ───────────────────────────────────────
        const MAX_LINES = 3000;
        const lGeo = new Geometry(gl, {
            position: { size: 3, data: new Float32Array(MAX_LINES * 6) },
            alpha: { size: 1, data: new Float32Array(MAX_LINES * 2) },
        });
        const lProg = new Program(gl, {
            vertex: vertexLines, fragment: fragmentLines,
            transparent: true, depthTest: false,
        });
        const lMesh = new Mesh(gl, { mode: gl.LINES, geometry: lGeo, program: lProg });

        // ── Animation loop ───────────────────────────────────
        let prev = performance.now();
        let elapsed = 0;

        const frame = (t: number) => {
            reqId.current = requestAnimationFrame(frame);
            const dt = t - prev; prev = t;
            elapsed += dt * speed;
            const time = elapsed * 0.001;

            // Uniforms
            pProg.uniforms.uTime.value = time;
            pProg.uniforms.uPulse.value = anim.current.pulse;

            // Smooth mouse
            const lm = lerpedMouse.current;
            const tm = mouseRef.current;
            lm.x += (tm.x - lm.x) * 0.08;
            lm.y += (tm.y - lm.y) * 0.08;

            // ── Update particle positions (CPU) ────────────────
            const d = dataRef.current!;
            const cnt = Math.floor(anim.current.count);
            const sp = anim.current.spread;
            const orb = anim.current.orbit;
            const bsz = anim.current.baseSize * pixelRatio;

            const posArr = pGeo.attributes.position.data as Float32Array;
            const sizeArr = pGeo.attributes.size.data as Float32Array;
            const colorArr = pGeo.attributes.color.data as Float32Array;

            // Mouse world position (for proximity size boost)
            const halfH = Math.tan(22.5 * Math.PI / 180) * cameraDistance;
            const aspect = gl.canvas.width / gl.canvas.height;
            const halfW = halfH * aspect;
            const wmx = lm.x * halfW;
            const wmy = lm.y * halfH;
            const RADIUS = 7.0;
            const MAX_BOOST = 2.0;

            for (let i = 0; i < cnt; i++) {
                const i3 = i * 3, i4 = i * 4;

                // Spread base position
                let px = d.base[i3] * sp;
                let py = d.base[i3 + 1] * sp;

                // Orbit noise (per-particle unique sine waves)
                const amp = mix(0.1, 1.0, d.rnd[i4]) * orb;
                px += Math.sin(time * d.rnd[i4 + 2] + 6.28 * d.rnd[i4 + 3]) * amp;
                py += Math.sin(time * d.rnd[i4 + 1] + 6.28 * d.rnd[i4]) * amp;
                const pz = Math.sin(time * d.rnd[i4 + 3] + 6.28 * d.rnd[i4 + 1]) * amp * 0.3;

                // Per-particle parallax
                const depthFactor = d.depth[i];
                const mx = -lm.x * particleHoverFactor * depthFactor;
                const my = -lm.y * particleHoverFactor * depthFactor;

                const fx = px + mx;
                const fy = py + my;

                d.cur[i3] = fx;
                d.cur[i3 + 1] = fy;
                d.cur[i3 + 2] = pz;

                posArr[i3] = fx;
                posArr[i3 + 1] = fy;
                posArr[i3 + 2] = pz;

                // Mouse proximity: size boost + color brightening
                const pdx = fx - wmx;
                const pdy = fy - wmy;
                const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
                const proximity = Math.max(0, 1 - pDist / RADIUS);
                const sizeBoost = 1 + proximity * proximity * MAX_BOOST;

                sizeArr[i] = bsz * d.szMult[i] * sizeBoost;

                // Breathing scale for Stage 1 (pulse > 0)
                if (anim.current.pulse > 0.5) {
                    const breathe = 1 + Math.sin(time * 16.0) * 0.15;
                    sizeArr[i] *= breathe;

                    // Hover ripple trigger: detect mouse near particle 0 in stage 1
                    if (i === 0) {
                        const hDist = Math.sqrt(
                            (fx - wmx) * (fx - wmx) + (fy - wmy) * (fy - wmy)
                        );
                        if (hDist < 2.0 && time - lastHoverTrigger > 0.8) {
                            lastHoverTrigger = time;
                            pProg.uniforms.uHoverTime.value = time;
                        }
                    }
                }

                // Color: dark grey → white based on proximity, always white when pulsing (stage 1)
                const isPulsing = anim.current.pulse > 0.5;
                const col = isPulsing ? 1.0 : 0.52 + proximity * 0.48;
                colorArr[i3] = col;
                colorArr[i3 + 1] = col;
                colorArr[i3 + 2] = col;
            }

            (pGeo.attributes.position as any).needsUpdate = true;
            (pGeo.attributes.size as any).needsUpdate = true;
            (pGeo.attributes.color as any).needsUpdate = true;
            pGeo.setDrawRange(0, cnt);

            // Rotation: subtle auto + drag (with inertia)
            const dr = dragRef.current;
            if (!dr.active) {
                // Decay drag velocity (inertia)
                dr.velX *= 0.95;
                dr.velY *= 0.95;
                dr.rotY += dr.velX;
                dr.rotX += dr.velY;
            }
            const rx = (disableRotation ? 0 : Math.sin(elapsed * 0.00015) * 0.05) + dr.rotX;
            const ry = (disableRotation ? 0 : Math.cos(elapsed * 0.0003) * 0.08) + dr.rotY;
            pMesh.rotation.set(rx, ry, 0);
            lMesh.rotation.set(rx, ry, 0);

            // ── Lines (2D proximity) ───────────────────────────
            let lineCnt = 0;
            const lPos = lGeo.attributes.position.data as Float32Array;
            const lAlph = lGeo.attributes.alpha.data as Float32Array;
            const THR = 8.0; // connection distance threshold

            if (cnt > 1 && cnt < 600) {
                for (let i = 0; i < cnt; i++) {
                    for (let j = i + 1; j < cnt; j++) {
                        const dx = d.cur[i * 3] - d.cur[j * 3];
                        const dy = d.cur[i * 3 + 1] - d.cur[j * 3 + 1];
                        const dSq = dx * dx + dy * dy;

                        if (dSq < THR * THR) {
                            if (lineCnt >= MAX_LINES) break;
                            const dist = Math.sqrt(dSq);
                            const a = 1.0 - dist / THR;

                            const vi = lineCnt * 6;
                            const ai = lineCnt * 2;
                            lPos[vi] = d.cur[i * 3];
                            lPos[vi + 1] = d.cur[i * 3 + 1];
                            lPos[vi + 2] = d.cur[i * 3 + 2];
                            lPos[vi + 3] = d.cur[j * 3];
                            lPos[vi + 4] = d.cur[j * 3 + 1];
                            lPos[vi + 5] = d.cur[j * 3 + 2];
                            lAlph[ai] = a;
                            lAlph[ai + 1] = a;
                            lineCnt++;
                        }
                    }
                }
            }

            lGeo.setDrawRange(0, lineCnt * 2);
            (lGeo.attributes.position as any).needsUpdate = true;
            (lGeo.attributes.alpha as any).needsUpdate = true;

            // Render (points first, then lines on top without clearing)
            // Lines first (behind), then particles on top
            renderer.render({ scene: lMesh, camera });
            renderer.render({ scene: pMesh, camera, clear: false });
        };

        reqId.current = requestAnimationFrame(frame);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('mouseup', onUp);
            gl.canvas.removeEventListener('mousedown', onDown as any);
            cancelAnimationFrame(reqId.current);
            if (el.contains(gl.canvas)) el.removeChild(gl.canvas);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* ── Stage transitions (GSAP) ─────────────────────────── */
    useEffect(() => {
        let count = 0, spread = 4, sizeMult = 1, pulse = 0, orbit = 0.5;

        switch (stage) {
            case 1: // Single glowing seed
                count = 1; spread = 0.15; orbit = 0.08;
                sizeMult = 10; pulse = 1;
                break;
            case 2: // Network (30 nodes + lines)
                count = 30; spread = 7; orbit = 0.6;
                sizeMult = 1; pulse = 0;
                break;
            case 3: // Explosion
                count = particleCount; spread = 12; orbit = 1.0;
                sizeMult = 1; pulse = 0;
                break;
            default: // hidden
                count = 0; spread = 7;
        }

        // Kill any running tweens on anim to prevent overlap
        gsap.killTweensOf(anim.current);
        if (containerRef.current) {
            gsap.killTweensOf(containerRef.current);
            // Ensure opacity is reset if we are entering an active stage
            if (stage !== 0) {
                containerRef.current.style.opacity = '1';
            }
        }

        const prevStage = stageRef.current;
        stageRef.current = stage;

        if (stage === 0) {
            if (prevStage === 3) {
                // "Zoom into the universe" — particles rush past the camera
                gsap.to(anim.current, {
                    spread: 100, duration: 1.8, ease: 'power2.in',
                });
                gsap.to(anim.current, {
                    baseSize: anim.current.baseSize * 5, duration: 1.8, ease: 'power2.in',
                });
                // Fade out the canvas near the end
                if (containerRef.current) {
                    gsap.to(containerRef.current, {
                        opacity: 0, duration: 0.8, delay: 1.0, ease: 'power2.out',
                        onComplete: () => {
                            anim.current.count = 0;
                            // Do not reset opacity here to avoid blink
                        },
                    });
                }
            } else {
                // Regular zoom out (from stage 1)
                gsap.to(anim.current, {
                    baseSize: 0, duration: 0.6, ease: 'power2.in',
                    onComplete: () => { anim.current.count = 0; },
                });
                gsap.to(anim.current, { spread, orbit, duration: 0.5, ease: 'power2.out' });
            }
        } else if (stage === 1) {
            if (prevStage >= 2) {
                // Camera pulling back: particles converge to center
                gsap.to(anim.current, {
                    spread: 0.15, orbit: 0.08, duration: 1.2, ease: 'power2.in',
                });
                // Drop count after they converge
                gsap.to(anim.current, {
                    count, duration: 0.3, delay: 0.9, ease: 'power2.out',
                });
                // Size + pulse
                gsap.to(anim.current, {
                    baseSize: particleBaseSize * sizeMult,
                    pulse, duration: 1.0, ease: 'power2.out',
                });
            } else {
                // Coming from 0: zoom-in entrance
                anim.current.count = 1;
                anim.current.spread = 0.15;
                anim.current.orbit = 0.08;
                anim.current.baseSize = 0;
                gsap.to(anim.current, {
                    baseSize: particleBaseSize * sizeMult,
                    pulse, duration: 1.2, ease: 'back.out(1.7)',
                });
            }
        } else if (stage === 2) {
            if (prevStage === 1) {
                // Camera advancing: particles appear from center and expand
                anim.current.count = count;
                anim.current.spread = 0;
                anim.current.pulse = 0;
                anim.current.baseSize = particleBaseSize * sizeMult;

                // Spread expands — like camera flying forward into the network
                gsap.to(anim.current, {
                    spread, orbit, duration: 1.8, ease: 'power2.out',
                });
            } else {
                // Coming from stage 3: gentle morph
                gsap.to(anim.current, {
                    count, duration: 1.8, ease: 'power2.out',
                });
                gsap.to(anim.current, {
                    spread, orbit, duration: 2.2, ease: 'power3.inOut',
                });
                gsap.to(anim.current, {
                    baseSize: particleBaseSize * sizeMult,
                    pulse, duration: 1.5, ease: 'power2.out',
                });
            }
        } else if (stage === 3) {
            // Stage 3: EXPLOSION — sudden burst for impact
            // Instant count jump
            anim.current.count = count;

            // Brief white flash via pulse
            anim.current.pulse = 0.8;
            gsap.to(anim.current, { pulse: 0, duration: 0.6, ease: 'power2.out' });

            // Overshoot spread: burst outward then settle
            anim.current.spread = 0;
            gsap.to(anim.current, {
                spread: 20, duration: 0.4, ease: 'power4.out',
            });
            gsap.to(anim.current, {
                spread, duration: 1.5, delay: 0.4, ease: 'power2.inOut',
            });

            // Particles start big and shrink to normal
            anim.current.baseSize = particleBaseSize * sizeMult * 3;
            gsap.to(anim.current, {
                baseSize: particleBaseSize * sizeMult,
                duration: 1.2, ease: 'power3.out',
            });

            // Fast orbit that decays
            anim.current.orbit = 3.0;
            gsap.to(anim.current, {
                orbit, duration: 2.0, ease: 'power2.out',
            });
        }
    }, [stage, particleCount, particleBaseSize]);

    return <div ref={containerRef} className={`particles-container ${className || ''}`} />;
};

export default Particles;
