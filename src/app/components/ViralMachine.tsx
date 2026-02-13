import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import Particles from "./Particles";

// ─── Network Canvas ─────────────────────────────────────
// Ambient animated node graph behind the hero stats section

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    phase: number;
    baseAlpha: number;
}

function NetworkCanvas({ active }: { active?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const animRef = useRef<number>(0);
    const opacityRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        const NODE_COUNT = 120;
        const CONNECTION_DIST = 150;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            canvas!.width = canvas!.offsetWidth * dpr;
            canvas!.height = canvas!.offsetHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function initNodes() {
            const w = canvas!.offsetWidth;
            const h = canvas!.offsetHeight;
            nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: 1.5 + Math.random() * 1.5,
                phase: Math.random() * Math.PI * 2,
                baseAlpha: 0.15 + Math.random() * 0.35,
            }));
        }

        resize();
        initNodes();
        window.addEventListener("resize", resize);

        let time = 0;
        function draw() {
            const w = canvas!.offsetWidth;
            const h = canvas!.offsetHeight;
            const nodes = nodesRef.current;

            // Fade in/out
            const targetOpacity = 1;
            opacityRef.current += (targetOpacity - opacityRef.current) * 0.02;

            ctx.clearRect(0, 0, w, h);
            time += 0.003;

            // Update positions
            for (const node of nodes) {
                node.x += node.vx + Math.sin(time + node.phase) * 0.15;
                node.y += node.vy + Math.cos(time + node.phase * 1.3) * 0.15;
                // Wrap around
                if (node.x < -20) node.x = w + 20;
                if (node.x > w + 20) node.x = -20;
                if (node.y < -20) node.y = h + 20;
                if (node.y > h + 20) node.y = -20;
            }

            const globalAlpha = opacityRef.current;

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.12 * globalAlpha;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            for (const node of nodes) {
                const pulse = 0.7 + 0.3 * Math.sin(time * 2 + node.phase);
                const alpha = node.baseAlpha * pulse * globalAlpha;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        }

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full pointer-events-none"
            style={{ opacity: active ? 1 : 0, transition: "opacity 1.5s ease" }}
        />
    );
}

// ─── Pipeline Flow ──────────────────────────────────────
// Animated glowing dots flowing through a pipeline

function PipelineFlow({ active }: { active?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            canvas!.width = canvas!.offsetWidth * dpr;
            canvas!.height = canvas!.offsetHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();
        window.addEventListener("resize", resize);

        interface Particle {
            progress: number; // 0-1 through pipeline
            speed: number;
            size: number;
            offsetY: number;
            hue: number;
        }

        const particles: Particle[] = [];
        const SPAWN_RATE = 0.03;

        function draw() {
            const w = canvas!.offsetWidth;
            const h = canvas!.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            // Spawn particles
            if (Math.random() < SPAWN_RATE) {
                particles.push({
                    progress: 0,
                    speed: 0.002 + Math.random() * 0.002,
                    size: 2 + Math.random() * 3,
                    offsetY: (Math.random() - 0.5) * 30,
                    hue: 200 + Math.random() * 60,
                });
            }

            // Pipeline path — horizontal across the screen at center
            const centerY = h * 0.5;
            const startX = w * 0.1;
            const endX = w * 0.9;
            const pipeLen = endX - startX;

            // Draw pipeline track (subtle)
            ctx.beginPath();
            ctx.moveTo(startX, centerY);
            ctx.lineTo(endX, centerY);
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Stage markers
            const stages = [0.15, 0.5, 0.85];
            for (const s of stages) {
                const sx = startX + pipeLen * s;
                ctx.beginPath();
                ctx.arc(sx, centerY, 4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.15)";
                ctx.fill();
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.progress += p.speed;

                if (p.progress > 1) {
                    particles.splice(i, 1);
                    continue;
                }

                const px = startX + pipeLen * p.progress;

                // Multiply effect — more particles spread as progress increases
                const spread = p.progress * p.progress * 40;
                const count = Math.floor(1 + p.progress * p.progress * 4);

                for (let j = 0; j < count; j++) {
                    const offsetY =
                        p.offsetY + (j > 0 ? (Math.random() - 0.5) * spread : 0);
                    const alpha = 0.3 + p.progress * 0.5;

                    // Glow
                    const gradient = ctx.createRadialGradient(
                        px,
                        centerY + offsetY,
                        0,
                        px,
                        centerY + offsetY,
                        p.size * 4
                    );
                    gradient.addColorStop(
                        0,
                        `hsla(${p.hue}, 80%, 70%, ${alpha * 0.6})`
                    );
                    gradient.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
                    ctx.beginPath();
                    ctx.arc(px, centerY + offsetY, p.size * 4, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    // Core dot
                    ctx.beginPath();
                    ctx.arc(px, centerY + offsetY, p.size * (0.5 + p.progress * 0.5), 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${alpha})`;
                    ctx.fill();
                }
            }

            animRef.current = requestAnimationFrame(draw);
        }

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full pointer-events-none"
            style={{
                opacity: active ? 0.7 : 0,
                transition: "opacity 1s ease",
            }}
        />
    );
}

// ─── Animated Counter ───────────────────────────────────

function AnimatedCounter({
    end,
    suffix,
    label,
    active,
    delay = 0,
}: {
    end: number;
    suffix: string;
    label: string;
    active?: boolean;
    delay?: number;
}) {
    const [value, setValue] = useState(0);
    const hasStarted = useRef(false);
    const animRef = useRef<number>(0);

    useEffect(() => {
        if (!active || hasStarted.current) return;
        hasStarted.current = true;

        const duration = 1800;
        const startTime = performance.now() + delay;

        function tick(now: number) {
            const elapsed = now - startTime;
            if (elapsed < 0) {
                animRef.current = requestAnimationFrame(tick);
                return;
            }
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic — starts fast, decelerates
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * end));

            if (progress < 1) {
                animRef.current = requestAnimationFrame(tick);
            } else {
                setValue(end);
            }
        }

        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    }, [active, end, delay]);

    // Reset when deactivated
    useEffect(() => {
        if (!active) {
            hasStarted.current = false;
        }
    }, [active]);

    function formatNumber(n: number): string {
        if (end >= 1_000_000_000) {
            return (n / 1_000_000_000).toFixed(n === end ? 0 : 1);
        }
        if (end >= 1_000_000) {
            return (n / 1_000_000).toFixed(n === end ? 0 : 1);
        }
        return n.toLocaleString("en-US");
    }

    return (
        <motion.div
            className="flex flex-col items-start gap-[8px]"
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: delay / 1000,
            }}
        >
            <p className="font-headline font-medium leading-[0.9] text-[96px] text-[#fcfaf5] tracking-[-2.88px]">
                {formatNumber(value)}
                {suffix}
            </p>
            <p className="font-body font-medium leading-[1.5] text-[12px] text-[#fcfaf5] uppercase tracking-[0.12px]">
                {label}
            </p>
        </motion.div>
    );
}

// ─── Stage Icons (animated SVG) ─────────────────────────

function StageIcon({
    stage,
    active,
}: {
    stage: 1 | 2 | 3;
    active?: boolean;
}) {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] as const },
        },
    };

    const size = 48;

    if (stage === 1 || stage === 3) {
        // Scissors / clip icon
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <motion.path
                    d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate={active ? "visible" : "hidden"}
                />
                <motion.path
                    d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate={active ? "visible" : "hidden"}
                />
                <motion.path
                    d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate={active ? "visible" : "hidden"}
                />
            </svg>
        );
    }

    if (stage === 2) {
        // Camera / person icon
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <motion.path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate={active ? "visible" : "hidden"}
                />
                <motion.path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate={active ? "visible" : "hidden"}
                />
            </svg>
        );
    }

    // Stage 3 — Broadcast / explosion icon
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <motion.path
                d="M4.93 19.07C3.11565 17.2557 2.01156 14.8585 1.81046 12.3052C1.60937 9.75182 2.32374 7.21091 3.82 5.13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
            />
            <motion.path
                d="M20.07 4.93C21.8844 6.7443 22.9884 9.14153 23.1895 11.6948C23.3906 14.2482 22.6763 16.7891 21.18 18.87"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
            />
            <motion.path
                d="M7.76 16.24C6.6784 15.1583 6.01348 13.7279 5.88112 12.2034C5.74876 10.6789 6.15716 9.15618 7.03 7.9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
            />
            <motion.path
                d="M16.24 7.76C17.3216 8.84173 17.9865 10.2721 18.1189 11.7966C18.2512 13.3211 17.8428 14.8438 16.97 16.1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
            />
            <motion.circle
                cx="12"
                cy="12"
                r="2"
                stroke="white"
                strokeWidth="1.5"
                variants={pathVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
            />
        </svg>
    );
}

// ─── Section Components ─────────────────────────────────

export function ViralMachineHero({ visible }: { visible?: boolean }) {
    return (
        <div
            data-snap-section
            className="bg-[#0A0A0A] flex flex-col h-screen items-center justify-center relative shrink-0 w-full overflow-hidden"
        >
            <div className="relative z-[1] flex flex-col items-center gap-[48px] px-[24px] max-w-[1000px] w-full will-change-transform">
                {/* Title row: THE VIRAL [icon] MACHINE */}
                <div className="flex items-center justify-center gap-[8px] overflow-hidden">
                    <motion.span
                        className="font-headline font-medium leading-[0.9] text-[96px] text-[#fcfaf5] tracking-[-2.88px] uppercase text-center"
                        initial={{ x: -200, opacity: 0 }}
                        animate={visible ? "visible" : "hidden"}
                        variants={{
                            visible: { x: 0, opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
                            hidden: { x: -200, opacity: 0, transition: { duration: 0, delay: 0.9 } },
                        }}
                    >
                        The Viral
                    </motion.span>
                    {/* Inline icon */}
                    <motion.div
                        className="flex items-center justify-center w-[64px] shrink-0"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={visible ? "visible" : "hidden"}
                        variants={{
                            visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 } },
                            hidden: { scale: 0, opacity: 0, transition: { duration: 0, delay: 0.9 } },
                        }}
                    >
                        <img
                            alt=""
                            className="block w-full"
                            src="/_media/viral-icon.svg"
                        />
                    </motion.div>
                    <motion.span
                        className="font-headline font-medium leading-[0.9] text-[96px] text-[#fcfaf5] tracking-[-2.88px] uppercase text-center"
                        initial={{ x: 200, opacity: 0 }}
                        animate={visible ? "visible" : "hidden"}
                        variants={{
                            visible: { x: 0, opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 } },
                            hidden: { x: 200, opacity: 0, transition: { duration: 0, delay: 0.9 } },
                        }}
                    >
                        Machine
                    </motion.span>
                </div>

                {/* Subtitle */}
                <ScrollReveal
                    as="div"
                    textClassName="font-body font-medium leading-[1.5] text-[12px] text-[#fcfaf5] uppercase tracking-[0.12px] text-center"
                    visible={visible}
                    enableBlur={true}
                    baseOpacity={0}
                    baseRotation={2}
                    blurStrength={4}
                >
                    Our proprietary distribution infrastructure. This is not a service you can buy anywhere else.
                </ScrollReveal>
            </div>
        </div>
    );
}

interface ViralMachineStageProps {
    stage: 1 | 2 | 3;
    title: string;
    subtitle?: string;
    description: string;
    visible: boolean;
    align?: 'left' | 'right';
    isNewStage1?: boolean;
}

export function StageIndicator({ stage, visible, onStageClick }: { stage: 1 | 2 | 3; visible: boolean; onStageClick?: (s: 1 | 2 | 3) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-row items-center gap-[2px] p-[12px] rounded-[96px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[16px] ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
        >
            {[1, 2, 3].map((s) => (
                <div
                    key={s}
                    onClick={() => onStageClick?.(s as 1 | 2 | 3)}
                    className="cursor-pointer p-[6px] flex items-center justify-center group"
                >
                    <motion.div
                        animate={{
                            width: s === stage ? 16 : 6,
                            backgroundColor: s === stage ? "#fcfaf5" : "#8e929d",
                            opacity: s === stage ? 1 : 0.4
                        }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="h-[6px] rounded-[32px] shrink-0 group-hover:opacity-80"
                    />
                </div>
            ))}
        </motion.div>
    );
}

export function ViralMachineStage({
    stage,
    title,
    description,
    visible,
    align = 'left',
}: ViralMachineStageProps) {
    // Split title into lines for masked animation
    const titleLines = title.split('\n');

    return (
        <div
            data-snap-section
            className="flex flex-col h-screen items-center justify-center relative shrink-0 w-full"
        >
            <div className={`relative z-[1] flex flex-col gap-[48px] px-[24px] max-w-[500px] w-full ${align === 'right' ? 'items-start text-left self-end mr-[10%]' : 'items-start text-left self-start ml-[10%]'}`}>


                <div className={`flex flex-col gap-[48px] items-start`}>
                    {/* Title Group with Masked Animation */}
                    <div className={`flex flex-col items-start`}>
                        {titleLines.map((line: string, i: number) => (
                            <div key={i} className="overflow-hidden flex items-end">
                                <motion.h2
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={visible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.25, 0.1, 0.25, 1],
                                        delay: 0.1 + (i * 0.1)
                                    }}
                                    className="font-headline font-medium leading-[0.8] text-[64px] md:text-[80px] text-[#fcfaf5] tracking-[-0.03em] m-0"
                                >
                                    {line}
                                </motion.h2>

                                {/* Icon on the last line */}
                                {i === titleLines.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: "100%" }}
                                        animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: "100%" }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.25, 0.1, 0.25, 1],
                                            delay: 0.1 + (i * 0.1) + 0.1
                                        }}
                                        className={`${align === 'right' ? 'mr-[12px]' : 'ml-[12px]'} mb-[6px]`}
                                    >
                                        <StageIcon stage={stage} active={visible} />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <ScrollReveal
                        as="p"
                        textClassName={`font-body font-medium leading-[1.5] text-[12px] text-[#fcfaf5] uppercase tracking-[0.12px] text-left`}
                        visible={visible}
                        enableBlur={true}
                        delay={0.5}
                    >
                        {description}
                    </ScrollReveal>
                </div>
            </div>
        </div >
    );
}

export function ViralMachineClosing({ visible }: { visible?: boolean }) {
    return (
        <div
            data-snap-section
            className="bg-transparent flex flex-col h-screen items-center justify-center relative shrink-0 w-full overflow-hidden"
        >
            <motion.div
                className="relative z-[1] flex flex-col items-center gap-[40px] px-[24px] max-w-[1000px] w-full text-center"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                }}
            >
                <div className="flex flex-col gap-[32px]">
                    <div className="flex flex-col gap-[8px]">
                        <h2 className="font-headline font-medium leading-[0.8] text-[64px] md:text-[80px] text-[#fcfaf5] tracking-[-0.03em]">
                            Content goes in.
                        </h2>
                        <h2 className="font-headline font-medium leading-[0.8] text-[64px] md:text-[80px] text-[#fcfaf5] tracking-[-0.03em]">
                            Virality comes out.
                        </h2>
                    </div>

                    <p className="font-body font-medium leading-[1.5] text-[12px] text-[#fcfaf5] uppercase tracking-[0.12px]">
                        We own every layer of the machine.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-[80px] left-1/2 -translate-x-1/2 z-[1]"
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            >
                <button className="bg-[#fcfaf5] hover:bg-white text-black font-headline font-medium text-[14px] px-[24px] py-[12px] h-[40px] rounded-full uppercase tracking-[0.28px] transition-colors flex items-center justify-center whitespace-nowrap">
                    Get in Touch
                </button>
            </motion.div>
        </div>
    );
}

export function SectionStats({ visible }: { visible?: boolean }) {
    return (
        <div
            data-snap-section
            className="bg-[#0A0A0A] flex flex-col h-screen items-center justify-center relative shrink-0 w-full overflow-hidden"
        >
            <div className="relative z-[1] flex flex-col items-start max-w-[1000px] w-full px-[24px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] w-full">
                    {/* Empty first col to push list to the right */}
                    <div className="hidden md:block"></div>
                    <div className="flex flex-col gap-[72px] items-start">
                        <AnimatedCounter
                            active={visible}
                            end={30000}
                            suffix="+"
                            label="Micro Creators"
                            delay={100}
                        />
                        <AnimatedCounter
                            active={visible}
                            end={6000000000}
                            suffix="B+"
                            label="Monthly Impressions"
                            delay={300}
                        />
                        <AnimatedCounter
                            active={visible}
                            end={4000000000}
                            suffix="B+"
                            label="O&O Monthly Views"
                            delay={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
