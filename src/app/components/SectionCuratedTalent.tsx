import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const TALENT_DATA = [
    {
        name: "Cono",
        handle: "@cono",
        avatar: "http://localhost:3845/assets/48f9b56d620be90095aa7724fd333b75414ec600.png",
        platformIcon: "http://localhost:3845/assets/95da3e3cb1e8af92cd0e1007e8ef80e3d3e0a10d.svg",
        title: "Content Video Title Here",
        description: "Laboris eiusmod sunt aute nisi excepteur fugiat voluptate enim consequat labore ad veniam.",
        video: "https://youtu.be/sx_CI-jdO4Y",
        stats: [
            { value: "13M+", label: "Engaged Views" },
            { value: "21M+", label: "Metric Title Here" },
        ],
    },
    {
        name: "Zach Justice",
        handle: "@Thezachjustice",
        avatar: "http://localhost:3845/assets/bf57c821fac4accdb4122ea19c5f3c5cbdfd5d3f.png",
        platformIcon: "http://localhost:3845/assets/95da3e3cb1e8af92cd0e1007e8ef80e3d3e0a10d.svg",
        title: "Content Video Title Here",
        description: "Laboris eiusmod sunt aute nisi excepteur fugiat voluptate enim consequat labore ad veniam.",
        video: "https://youtu.be/YKz85Fp1NHg",
        stats: [
            { value: "13M+", label: "Engaged Views" },
            { value: "21M+", label: "Metric Title Here" },
        ],
    },
    {
        name: "Yonna Jay",
        handle: "@Yonna_jay",
        avatar: "http://localhost:3845/assets/e994c8e0f8b2b2d50d918f317225b2edd9b448ed.png",
        platformIcon: "http://localhost:3845/assets/95da3e3cb1e8af92cd0e1007e8ef80e3d3e0a10d.svg",
        title: "Content Video Title Here",
        description: "Laboris eiusmod sunt aute nisi excepteur fugiat voluptate enim consequat labore ad veniam.",
        video: "https://youtu.be/cn4kRq2TMDI",
        stats: [
            { value: "13M+", label: "Engaged Views" },
            { value: "21M+", label: "Metric Title Here" },
        ],
    },
];

export default function SectionCuratedTalent({ visible }: { visible?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        if (!containerRef.current) return;
        const items = containerRef.current.children as HTMLCollectionOf<HTMLElement>;
        if (items[index]) {
            const container = containerRef.current;
            const item = items[index];
            const targetLeft = item.offsetLeft - (container.clientWidth - item.clientWidth) / 2;
            container.scrollTo({ left: targetLeft, behavior: 'smooth' });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const items = container.children as HTMLCollectionOf<HTMLElement>;
        if (items.length === 0) return;

        const scrollLeft = container.scrollLeft;
        const containerCenter = scrollLeft + container.clientWidth / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(items).forEach((item, i) => {
            const itemCenter = item.offsetLeft + item.clientWidth / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    };

    return (
        <div
            data-snap-section
            className="relative shrink-0 w-full h-screen bg-transparent overflow-visible flex items-center justify-center px-[24px]"
        >
            <div className="flex flex-col items-center justify-center w-full max-h-[80vh] overflow-visible">

                {/* Carousel Container - Fluid height */}
                <div
                    className="flex flex-col gap-[32px] md:gap-[48px] items-center w-full overflow-visible"
                >
                    {/* Scrollable Area */}
                    <div
                        ref={containerRef}
                        onScroll={handleScroll}
                        className="flex gap-[24px] md:gap-[56px] overflow-x-auto snap-x snap-mandatory no-scrollbar w-full px-[calc(50%-min(500px,42.5vw))] pb-[20px] overflow-visible"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {TALENT_DATA.map((talent, index) => {
                            const isYoutube = talent.video.includes("youtube.com") || talent.video.includes("youtu.be");
                            const youtubeId = isYoutube ? getYoutubeId(talent.video) : null;

                            return (
                                <motion.div
                                    key={index}
                                    className="flex flex-col gap-[24px] md:gap-[40px] w-[min(1000px,85vw)] shrink-0 snap-center"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false, margin: "-10%" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    {/* Video Card - Flexible height based on VH */}
                                    <div className="relative w-full h-[240px] md:h-[min(498px,45vh)] rounded-[16px] overflow-hidden bg-[rgba(255,255,255,0.05)]">
                                        {isYoutube && youtubeId ? (
                                            <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
                                                    title={talent.name}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    className="w-full h-full object-cover pointer-events-none scale-[1.35]"
                                                    style={{ pointerEvents: 'none' }}
                                                ></iframe>
                                                {/* Overlay to prevent interaction */}
                                                <div className="absolute inset-0 z-10 bg-transparent"></div>
                                            </div>
                                        ) : (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="absolute inset-0 w-full h-full object-cover opacity-100"
                                            >
                                                <source src={talent.video} />
                                            </video>
                                        )}
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr] gap-[24px] md:gap-[40px] w-full">

                                        {/* Col 1: Profile */}
                                        <div className="flex flex-col gap-[20px] items-start">
                                            <div className="w-[56px] h-[56px] rounded-[16px] overflow-hidden bg-gray-800">
                                                <img src={talent.avatar} alt={talent.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col gap-[8px]">
                                                <p className="font-headline font-medium text-[14px] leading-[0.9] text-[#fcfaf5]">
                                                    {talent.name}
                                                </p>
                                                <div className="flex items-center gap-[8px]">
                                                    <div className="w-[22px] h-[16px]">
                                                        <img src={talent.platformIcon} alt="Platform" className="w-full h-full block" />
                                                    </div>
                                                    <p className="font-body font-normal text-[14px] leading-none text-[#fcfaf5] opacity-60">
                                                        {talent.handle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Col 2: Info */}
                                        <div className="flex flex-col gap-[16px] max-w-[320px]">
                                            <h4 className="font-headline font-medium text-[24px] leading-none tracking-[-0.48px] text-[#fcfaf5]">
                                                {talent.title}
                                            </h4>
                                            <p className="font-body font-medium leading-[1.5] text-[12px] text-[#fcfaf5] uppercase tracking-[0.12px]">
                                                {talent.description}
                                            </p>
                                        </div>

                                        {/* Col 3: Stats */}
                                        <div className="flex gap-[8px] w-full">
                                            {talent.stats.map((stat, i) => (
                                                <div key={i} className="flex-1 bg-[rgba(142,146,157,0.1)] rounded-[12px] p-[16px] flex flex-col gap-[8px]">
                                                    <p className="font-headline font-medium text-[24px] leading-[0.9] text-[#fcfaf5] uppercase">
                                                        {stat.value}
                                                    </p>
                                                    <p className="font-body font-normal text-[14px] leading-[1.2] text-[#fcfaf5] opacity-60">
                                                        {stat.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Talent Navigation Indicator - Improved styles: no border, extra blur */}
                <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex items-center gap-[12px] z-[100]">
                    {/* Arrow Left */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToIndex(Math.max(0, activeIndex - 1));
                        }}
                        className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.05)] backdrop-blur-[16px] flex items-center justify-center text-[#fcfaf5] hover:bg-[rgba(255,255,255,0.15)] transition-colors disabled:opacity-20 pointer-events-auto"
                        disabled={activeIndex === 0}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Dots Pill */}
                    <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[16px] px-[16px] py-[16px] rounded-[96px] flex gap-[12px] items-center shadow-xl">
                        {TALENT_DATA.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    scrollToIndex(i);
                                }}
                                className={`rounded-[32px] transition-all duration-300 pointer-events-auto ${i === activeIndex ? "w-[16px] h-[6px] bg-[#fcfaf5]" : "w-[6px] h-[6px] bg-[#8e929d]"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Arrow Right */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToIndex(Math.min(TALENT_DATA.length - 1, activeIndex + 1));
                        }}
                        className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.05)] backdrop-blur-[16px] flex items-center justify-center text-[#fcfaf5] hover:bg-[rgba(255,255,255,0.15)] transition-colors disabled:opacity-20 pointer-events-auto"
                        disabled={activeIndex === TALENT_DATA.length - 1}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
}
