import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './ScrollReveal.css';

interface ScrollRevealProps {
    children: React.ReactNode;
    visible?: boolean;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    as?: React.ElementType; // Allow changing wrapping element
    delay?: number; // Delay before animation starts (seconds)
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    visible = false,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    as: Component = 'div', // Changed default from h2 to div for versatility
    delay = 0,
}) => {
    const containerRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const splitText = useMemo(() => {
        if (typeof children !== 'string') return children;

        // Split by spaces but preserve them as elements for spacing
        return children.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) {
                return <span key={index} className="word whitespace-pre inline-block">{word}</span>;
            }
            return (
                <span className="word inline-block" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Cleanup previous animation and state
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // Target words specifically
        const words = el.querySelectorAll('.word');

        if (visible) {
            // Force reset to initial state immediately when visible becomes true
            gsap.set(el, { rotate: baseRotation, transformOrigin: '0% 50%' });
            gsap.set(words, {
                opacity: baseOpacity,
                filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
                y: 20
            });

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            // Animate Container Rotation
            tl.to(el, {
                rotate: 0,
                duration: 1.2,
                ease: 'power3.out'
            }, delay);

            // Animate Words
            tl.to(words, {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 0.8,
                stagger: 0.02,
                ease: 'power2.out'
            }, delay + 0.1);

            timelineRef.current = tl;
        }

        return () => {
            if (timelineRef.current) timelineRef.current.kill();
        };
    }, [visible, baseRotation, baseOpacity, blurStrength, enableBlur, delay]);

    return (
        <Component ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
            <p className={`scroll-reveal-text ${textClassName} block`}>
                {splitText}
            </p>
        </Component>
    );
};

export default ScrollReveal;
