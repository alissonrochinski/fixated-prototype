import svgPaths from "../imports/svg-7uktqo1iio";

import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  ViralMachineHero,
  ViralMachineStage,
  ViralMachineClosing,
  SectionStats,
  StageIndicator,
} from "./components/ViralMachine";
import SectionCuratedTalent from "./components/SectionCuratedTalent";
import Particles from "./components/Particles";
import ScrollReveal from "./components/ScrollReveal";

import ContactPage from "./pages/ContactPage";

// Talent Roster Images
import rosterImg0 from "../assets/1bceb5f81b5a7b4df0465a6b3aceb8f91b23c723.png";
import rosterImg1 from "../assets/ebf046c54ff6840ffb2c97250dfdf128572abea1.png";
import rosterImg2 from "../assets/6d8f06dbc079ecbc821709b62d47f911b1bca241.png";
import rosterImg3 from "../assets/c8a9d31ed2c7feb368f22c9967dae5d88e9e7d74.png";
import rosterImg4 from "../assets/06e6ebbfd2a57c33337a198654981e807b45e4cd.png";
import rosterImg5 from "../assets/461ae3a6af4193a2c682d1002a4a34243433ed50.png";
import heroPoster from "../assets/c48ddcb7f4173d0541b5828f10b02512883d069e.png";
import cardThumb from "../assets/b4cdd0e70ebde04b9101587fb11ab4298f40d8de.png";



// ─── Fullpage Engine ────────────────────────────────────
const DURATION = 900;        // duração da transição (ms)
const WHEEL_THRESHOLD = 40;   // delta mínimo para disparar (filtra ruído do trackpad)
const TOUCH_THRESHOLD = 30;  // swipe mínimo em px para mobile
const PARALLAX_FACTOR = 0.425; // vídeo se move a 42.5% da velocidade do scroll (reduced by 15%)

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const HERO_IMG = "https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjb250ZW50JTIwY3JlYXRvcnMlMjBzZWxmaWV8ZW58MXx8fHwxNzcwODE5NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD1_IMG = "https://images.unsplash.com/photo-1760561993749-1b5034aa9a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0YWxlbnQlMjBtYW5hZ2VtZW50JTIwY3JlYXRvcnxlbnwxfHx8fDE3NzA4MTk0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const SCISSORS_ICON = "https://www.figma.com/design/PTXbpayc6onVUhyZDN0iZG/Playground?node-id=448-9654&t=OtC6T9IxOgtUNPoY-4"; // This is a placeholder for the SVG integration Headeropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb250ZW50JTIwc3R1ZGlvJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzA4MTk0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD3_IMG = "https://images.unsplash.com/photo-1769798644300-e53957efab03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaWdpdGFsJTIwbW9uZXRpemF0aW9uJTIwY3JlYXRvciUyMGVjb25vbXl8ZW58MXx8fHwxNzcwODE5NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* 
   Original assets restored.
*/


const ROSTER = [
  { name: "Botez Sisters", followers: "2.4M", image: rosterImg0 },
  { name: "The Sketch Real", followers: "2.4M", image: rosterImg1 },
  { name: "Zach Justice", followers: "2.4M", image: rosterImg2 },
  { name: "Jimmy Zhang", followers: "2.4M", image: rosterImg3 },
  { name: "Ronnie Coleman", followers: "2.4M", image: rosterImg4 },
  { name: "Craft Culture", followers: "2.4M", image: rosterImg5 },
];

let hasNavAnimatedGlobal = false;

function Logo({ light }: { light?: boolean }) {
  const fill = light ? "#fcfaf5" : "black";
  return (
    <Link to="/" className="h-[18px] relative shrink-0 w-[154px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 154 18">
        <g>
          <path d={svgPaths.p217c6300} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.pd1f38f0} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p10ce3a00} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p152ba680} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p35c2d100} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p3260aa00} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.paa33240} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p33c06f80} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p2f828980} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p2fd71c00} fill={fill} className="transition-[fill] duration-500" />
          <path d={svgPaths.p1a73dc00} fill={fill} className="transition-[fill] duration-500" />
        </g>
      </svg>
    </Link>
  );
}

function NavButton({ light }: { light?: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/contact')}
      className={`backdrop-blur-[16px] cursor-pointer flex gap-[8px] h-[40px] items-center justify-center p-[12px] rounded-[999px] shrink-0 transition-colors duration-500 ${light ? "bg-[rgba(255,255,255,0.15)]" : "bg-[rgba(0,0,0,0.05)]"}`}
    >
      <div className="flex items-center justify-center px-[4px]">
        <p className={`font-headline font-medium leading-[0.9] text-[14px] tracking-[0.28px] uppercase transition-colors duration-500 ${light ? "text-[#fcfaf5]" : "text-black"}`}>
          Get in Touch
        </p>
      </div>
    </div>
  );
}

function NavLinks({ light }: { light?: boolean }) {
  const routes: Record<string, string> = {
    Talent: '/talent',
    Content: '/content',
    Brands: '/brands',
  };
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute flex gap-[24px] h-[56px] items-center justify-center left-1/2 px-[24px] py-[12px] rounded-[999px] top-1/2">
      {Object.entries(routes).map(([item, path]) => (
        <Link
          key={item}
          to={path}
          className="flex items-center justify-center cursor-pointer no-underline"
        >
          <p className={`font-headline font-medium leading-[0.9] text-[14px] tracking-[0.98px] uppercase transition-colors duration-500 ${light ? "text-[#fcfaf5]" : "text-black"}`}>
            {item}
          </p>
        </Link>
      ))}
    </div>
  );
}

function NavBar({ light, ready }: { light?: boolean; ready?: boolean }) {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  // Only animate if it's the first time on the home page
  const shouldAnimate = isHome && !hasNavAnimatedGlobal;

  useEffect(() => {
    if (ready && isHome) {
      hasNavAnimatedGlobal = true;
    }
  }, [ready, isHome]);

  if (!shouldAnimate) {
    return (
      <div className="absolute flex items-center justify-between left-0 p-[24px] right-0 top-0 z-10 transition-none">
        <Logo light={light} />
        <NavButton light={light} />
        <NavLinks light={light} />
      </div>
    );
  }

  return (
    <div
      className="absolute flex items-center justify-between left-0 p-[24px] right-0 top-0 z-10 transition-all duration-[800ms] ease-out"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(-20px)",
        transitionDelay: "300ms",
      }}
    >
      <Logo light={light} />
      <NavButton light={light} />
      <NavLinks light={light} />
    </div>
  );
}

function HeroOverlay({ ready, leaving }: { ready?: boolean; leaving?: boolean }) {
  // Determine text state: entering (not ready), visible (ready & not leaving), or leaving
  const getStyle = (delay: string) => {
    if (leaving) {
      return {
        opacity: 0,
        transform: "translateY(40px)",
        transitionDelay: "0ms",
      };
    }
    return {
      opacity: ready ? 1 : 0,
      transform: ready ? "translateY(0)" : "translateY(18px)",
      transitionDelay: delay,
    };
  };

  return (
    <div className="flex h-[200px] items-end justify-center py-[40px] relative shrink-0 w-full">
      <div className="flex-[1_0_0] font-headline font-medium leading-none max-w-[408px] min-h-px min-w-px relative text-[#fcfaf5] text-[24px] text-center uppercase whitespace-pre-wrap">
        <p
          className="mb-0 transition-all duration-[600ms] ease-out"
          style={getStyle("100ms")}
        >
          The Operating System
        </p>
        <p
          className="transition-all duration-[600ms] ease-out"
          style={getStyle("200ms")}
        >
          for Creators
        </p>
      </div>
    </div>
  );
}

const SectionHero = memo(({ ready, leaving, heroVideo = 'https://youtu.be/FweUZMuwzyE' }: { ready?: boolean; leaving?: boolean; heroVideo?: string }) => {
  const isYoutube = heroVideo.includes("youtube.com") || heroVideo.includes("youtu.be");
  const youtubeId = isYoutube ? getYoutubeId(heroVideo) : null;

  return (
    <div data-snap-section className="flex flex-col h-screen items-center justify-end relative shrink-0 w-full overflow-hidden bg-black">
      {isYoutube && youtubeId ? (
        <div data-parallax-hero className="absolute inset-0 w-full h-full scale-[1.35] pointer-events-none select-none will-change-transform">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
            title="Hero Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full object-cover pointer-events-none"
            style={{ pointerEvents: 'none' }}
          ></iframe>
          {/* Overlay to prevent interaction */}
          <div className="absolute inset-0 z-10 bg-transparent"></div>
        </div>
      ) : (
        <video
          data-parallax-hero
          autoPlay
          muted
          className="absolute max-w-none object-cover size-full scale-[1.15] will-change-transform"
          controlsList="nodownload"
          loop
          playsInline
          poster={heroPoster}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}
      <HeroOverlay ready={ready} leaving={leaving} />
    </div>
  );
});

function GetInTouchButton() {
  return (
    <div className="bg-black cursor-pointer flex gap-[8px] h-[40px] items-center justify-center p-[12px] rounded-[999px] shrink-0">
      <div className="flex items-center justify-center px-[4px]">
        <p className="font-headline font-medium leading-[0.9] text-[#fcfaf5] text-[14px] tracking-[0.28px] uppercase">
          Get in Touch
        </p>
      </div>
    </div>
  );
}
function WordReveal({ text, visible, baseDelay = 0 }: { text: string; visible?: boolean; baseDelay?: number }) {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap gap-x-[0.5em] gap-y-[0.1em] w-full">
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            className="font-headline font-medium leading-[0.9] text-[80px] tracking-[-1.92px] text-black"
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            variants={{
              visible: {
                y: "0%",
                transition: {
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: baseDelay + i * 0.1,
                },
              },
              hidden: {
                y: "110%",
                transition: { duration: 0, delay: 0.9 },
              },
            }}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  visible,
  title1 = "We don't just make content.",
  title2 = "We make it go viral.",
  description = "From original production to guaranteed distribution. 6B+ impressions per month through infrastructure we own."
}: {
  visible?: boolean;
  title1?: string;
  title2?: string;
  description?: string
}) {
  return (
    <div data-snap-section className="h-screen relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col items-center justify-center px-[24px] size-full">
          <div className="flex flex-col items-start max-w-[1280px] w-full">
            <div className="flex flex-col gap-[80px] items-start w-full">
              <div className="flex flex-col gap-[48px] items-start text-black uppercase w-full">
                <div className="flex flex-col items-start w-full gap-[8px]">
                  <WordReveal
                    text={title1}
                    visible={visible}
                    baseDelay={0.2}
                  />
                  <WordReveal
                    text={title2}
                    visible={visible}
                    baseDelay={0.6}
                  />
                </div>
                <p className="font-body font-medium leading-[1.5] text-[12px] tracking-[0.12px] w-full uppercase">
                  {description}
                </p>
              </div>
              <div>
                <GetInTouchButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

function ServiceCard({
  title,
  subtitle,
  image,
  video,
  poster,
  description,
  visible,
  index,
  height = "500px",
}: {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
  poster?: string;
  description: string;
  visible?: boolean;
  index: number;
  height?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // React doesn't reliably set `muted` via JSX — force it imperatively
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const isYoutube = video?.includes("youtube.com") || video?.includes("youtu.be");
  const youtubeId = isYoutube && video ? getYoutubeId(video) : null;

  return (
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <motion.div
        className="bg-[rgba(0,0,0,0.9)] flex flex-col items-start justify-end overflow-clip relative rounded-[16px] cursor-pointer group"
        style={{ height }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1], // cubic-bezier for a nice slide up
              delay: index * 0.1, // Subtle delay between cards
            },
          },
          hidden: {
            y: 100, // Pronounced slide up distance
            opacity: 0,
            transition: { duration: 0.5 },
          },
        }}
      >
        {/* Media container with parallax targeting */}
        <div
          className="absolute inset-0 scale-[1.4] group-hover:scale-[1.48] transition-transform duration-[400ms] ease-out"
        >
          {isYoutube && youtubeId ? (
            <div className="absolute inset-0 w-full h-full scale-[1.35] pointer-events-none select-none">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full object-cover pointer-events-none"
                style={{ pointerEvents: 'none' }}
              ></iframe>
              {/* Overlay to prevent interaction */}
              <div className="absolute inset-0 z-10 bg-transparent"></div>
            </div>
          ) : video ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
              poster={poster}
            >
              <source src={video} type="video/mp4" />
            </video>
          ) : (
            <img src={image} className="size-full object-cover" alt={title} />
          )}
        </div>

        {/* Gradient: default (light) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] from-[50%] to-[rgba(0,0,0,0.35)] transition-opacity duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100 group-hover:opacity-0 pointer-events-none" />

        {/* Gradient: hover (heavy) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] from-[30%] to-[rgba(0,0,0,0.9)] to-[90%] transition-opacity duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-0 group-hover:opacity-100 pointer-events-none" />

        {/* Content area */}
        <div className="relative w-full px-[24px] pb-[24px]">
          {/* Title — pushed up and out by description */}
          <div className="font-headline font-medium leading-[0.9] text-[#fcfaf5] text-[24px] uppercase whitespace-nowrap pb-[4px] transition-opacity duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-100 group-hover:opacity-0">
            <p className={subtitle ? "mb-0" : ""}>{title}</p>
            {subtitle && <p>{subtitle}</p>}
          </div>

          {/* Description — grows from 0 height, pushing title out */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            <div className="overflow-hidden min-h-0">
              <p className="font-body font-medium leading-[1.4] text-[#fcfaf5] text-[14px] tracking-[0.14px] opacity-70 pt-[8px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div >
    </div >
  );
}

function SectionServicesContent({ visible }: { visible?: boolean }) {
  return (
    <div data-snap-section data-invasion-source className="relative shrink-0 w-full h-screen z-1" style={{ transformOrigin: 'center center' }}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col items-center justify-center px-[24px] w-full">
          <div className="grid grid-cols-2 gap-[8px] max-w-[1280px] w-full">
            <ServiceCard
              title="CONTENT STUDIO"
              video="https://youtu.be/sx_CI-jdO4Y"
              poster={cardThumb}
              description="Professional production for high-impact visual storytelling across all platforms, ensuring your message lands with precision."
              visible={visible}
              index={0}
              height="35vh"
            />
            <ServiceCard
              title="CONTENT STRATEGY"
              video="https://youtu.be/YKz85Fp1NHg"
              poster={cardThumb} // Using the same thumb as placeholder if video_b poster is missing
              description="Data-driven insights and creative frameworks to optimize your content ecosystem for maximum engagement and retention."
              visible={visible}
              index={1}
              height="35vh"
            />
            <ServiceCard
              title="SYNDICATION"
              video="https://youtu.be/cn4kRq2TMDI"
              poster={cardThumb}
              description="Cross-platform distribution logic to maximize reach and engagement for every piece of content you produce."
              visible={visible}
              index={2}
              height="35vh"
            />
            <ServiceCard
              title="UGC NETWORK"
              video="https://youtu.be/OjeLwdytgOg"
              poster={cardThumb}
              description="Authentic community-led content that drives trust and conversions at scale through real faces and real stories."
              visible={visible}
              index={3}
              height="35vh"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionServicesBrands({ visible }: { visible?: boolean }) {
  return (
    <div data-snap-section data-invasion-source className="relative shrink-0 w-full h-screen z-1" style={{ transformOrigin: 'center center' }}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col items-center justify-center px-[24px] w-full">
          <div className="grid grid-cols-2 gap-[8px] max-w-[1280px] w-full">
            <ServiceCard
              title="CREATOR PARTNERSHIPS"
              video="https://youtu.be/sx_CI-jdO4Y"
              poster={cardThumb}
              description="Seamless integrations with top-tier creators that drive authentic brand affinity and measurable results."
              visible={visible}
              index={0}
              height="35vh"
            />
            <ServiceCard
              title="BRANDED CONTENT"
              video="https://youtu.be/YKz85Fp1NHg"
              poster={cardThumb}
              description="High-fidelity original production that blends brand messaging with native creator-style storytelling."
              visible={visible}
              index={1}
              height="35vh"
            />
            <ServiceCard
              title="AMPLIFICATION & DISTRIBUTION"
              video="https://youtu.be/cn4kRq2TMDI"
              poster={cardThumb}
              description="Exponentially scale your message through our proprietary distribution network and targeted amplification strategies."
              visible={visible}
              index={2}
              height="35vh"
            />
            <ServiceCard
              title="FULL-FUNNEL SOLUTIONS"
              video="https://youtu.be/OjeLwdytgOg"
              poster={cardThumb}
              description="Comprehensive cross-platform campaigns designed to drive everything from awareness to direct conversion."
              visible={visible}
              index={3}
              height="35vh"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPartnerBrands({ visible }: { visible?: boolean }) {
  const logos = [
    "/_logos/Red-Bull.svg",
    "/_logos/Roblox.svg",
    "/_logos/Samsung.svg",
    "/_logos/Disney-Now.svg",
    "/_logos/YouTube.svg",
    "/_logos/Verizon.svg",
    "/_logos/High-Colorado.svg",
    "/_logos/Porsche.svg",
    "/_logos/Star-Wars.svg",
    "/_logos/Amazon.svg",
    "/_logos/AMG.svg",
    "/_logos/Coca-Cola.svg",
  ];

  return (
    <div data-snap-section className="relative shrink-0 w-full h-screen">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="max-w-[1000px] w-full px-[24px]">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-[8px] items-center justify-items-center w-full">
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center justify-center w-full"
              >
                <img
                  src={logo}
                  alt="Brand Logo"
                  className="w-[120px] h-auto object-contain brightness-0 opacity-100"
                  onError={(e) => console.error("Logo failed to load:", logo)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

function SectionCases({ visible }: { visible?: boolean }) {
  const cases = [
    {
      name: "Yonna Jay",
      handle: "@Yonna_jay",
      image: "http://localhost:3845/assets/e994c8e0f8b2b2d50d918f317225b2edd9b448ed.png",
      title: "SCALING OPERATIONS TO 60+ UPLOADS & $31K REVENUE/MO.",
      stats: [
        { label: "Long-form uploads/mo", value: "60+" },
        { label: "Est. Partner Revenue", value: "$31,582+" },
        { label: "Engaged Views", value: "13M+" }
      ]
    }
  ];

  return (
    <div data-snap-section className="relative shrink-0 w-full h-screen">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="max-w-[1000px] w-full px-[24px]">
          <div className="flex flex-col gap-[120px]">
            {/* Header Row */}
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-[24px] items-start w-full">
              {/* Profile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-[20px]"
              >
                <div className="size-[72px] rounded-[16px] overflow-hidden shrink-0">
                  <img src={cases[0].image} alt={cases[0].name} className="size-full object-cover" />
                </div>
                <div className="flex flex-col gap-[4px] justify-center h-[72px]">
                  <p className="font-headline text-[14px] leading-tight uppercase m-0">{cases[0].name}</p>
                  <div className="flex items-center gap-[8px]">
                    <svg className="w-[16px] h-auto" viewBox="0 0 24 16" fill="black">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <p className="font-body text-[14px] opacity-60 m-0">{cases[0].handle}</p>
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-headline text-[32px] leading-[0.9] tracking-[-0.02em] uppercase m-0"
              >
                {cases[0].title}
              </motion.h3>

              {/* Nav */}
              <div className="flex justify-end gap-[12px] h-[72px] items-center">
                <button className="size-[32px] flex items-center justify-center opacity-20 cursor-not-allowed">
                  <span className="text-[32px] leading-none rotate-180">→</span>
                </button>
                <button className="size-[32px] flex items-center justify-center opacity-20 cursor-not-allowed">
                  <span className="text-[32px] leading-none">→</span>
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-[12px] w-full">
              {cases[0].stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className="flex flex-col gap-[8px]"
                >
                  <p className="font-headline text-[24px] leading-none uppercase m-0">{stat.value}</p>
                  <p className="font-body text-[14px] leading-tight opacity-60 max-w-[180px] m-0">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function SectionServicesTalent({ visible }: { visible?: boolean }) {
  return (
    <div data-snap-section data-invasion-source className="relative shrink-0 w-full h-screen" style={{ transformOrigin: 'center center' }}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col items-center justify-center px-[24px] w-full">
          <div className="flex gap-[8px] items-start max-w-[1280px] w-full">
            <ServiceCard
              title="Talent"
              subtitle="Management"
              video="https://youtu.be/sx_CI-jdO4Y"
              poster={cardThumb}
              description="Full 360° business management for the internet's top creators, from content strategy to brand deals to long-term career architecture."
              visible={visible}
              index={0}
              height="50vh"
            />
            <ServiceCard
              title="Content"
              subtitle="Studio"
              video="https://youtu.be/YKz85Fp1NHg"
              description="End-to-end production capabilities—from ideation and scripting to filming, editing, and distribution across every platform."
              visible={visible}
              index={1}
              height="50vh"
            />
            <ServiceCard
              title="Monetization"
              subtitle="Service"
              video="https://youtu.be/cn4kRq2TMDI"
              description="Strategic revenue diversification through brand partnerships, licensing, merchandise, and digital product development."
              visible={visible}
              index={2}
              height="50vh"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TalentCard({
  talent,
  index,
  visible,
}: {
  talent: (typeof ROSTER)[number];
  index: number;
  visible?: boolean;
}) {
  return (
    <motion.div
      className="relative rounded-[20px] cursor-pointer group transition-colors duration-300 hover:bg-[rgba(0,0,0,0.05)]"
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: visible ? 0.6 : 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        delay: visible ? 0.1 + index * 0.07 : 1,
      }}
    >
      <div className="flex items-center gap-[16px] p-[4px] size-full">
        {/* Thumbnail */}
        <div className="overflow-clip rounded-[16px] shrink-0 size-[120px]">
          <img
            alt={talent.name}
            className="max-w-none object-cover size-full transition-transform duration-500 group-hover:scale-[1.05]"
            src={talent.image}
          />
        </div>
        {/* Info */}
        <div className="flex flex-col gap-[8px] items-start justify-center">
          <p className="font-headline font-medium leading-[0.9] text-[14px] text-black">
            {talent.name}
          </p>
          <p className="font-body font-normal leading-none opacity-60 text-[14px] text-black">
            {talent.followers}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionFeaturedTalent({ visible }: { visible?: boolean }) {
  return (
    <div data-snap-section className="relative shrink-0 w-full h-screen bg-[#fcfaf5]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="max-w-[1000px] w-full px-[24px] flex flex-col gap-[40px]">
          <p className="font-headline font-medium text-[14px] text-black/40 uppercase tracking-[0.14px]">
            Featured talent
          </p>
          <div className="grid grid-cols-2 gap-x-[8px] gap-y-[8px] w-full">
            {ROSTER.map((talent, i) => (
              <TalentCard
                key={talent.name}
                talent={talent}
                visible={visible}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Assuming this block is meant to be a new component or part of an existing stage-handling component
// For the purpose of this edit, it's placed as a standalone function.
function Stage1Content({ stage }: { stage: number }) {
  if (stage === 1) {
    return (
      <div className="flex flex-col items-start gap-[48px] max-w-[1000px] w-full px-[24px]">
        {/* Stage Label */}
        <div className="bg-[#0a0a0a] border border-[rgba(142,146,157,0.3)] px-[12px] py-[6px] rounded-full">
          <span className="font-headline font-medium text-[12px] text-[#fcfaf5] uppercase">Stage 1</span>
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="flex items-end gap-[16px]">
            <h2 className="font-headline text-[64px] md:text-[80px] leading-[0.9] text-[#fcfaf5] uppercase tracking-[-0.03em]">
              Micro<br />Creator<br />Network
            </h2>
            <div className="pb-[12px]">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 18C16.2091 18 18 16.2091 18 14C18 11.7909 16.2091 10 14 10C11.7909 10 10 11.7909 10 14C10 16.2091 11.7909 18 14 18Z" stroke="#fcfaf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M34 18C36.2091 18 38 16.2091 38 14C38 11.7909 36.2091 10 34 10C31.7909 10 30 11.7909 30 14C30 16.2091 31.7909 18 34 18Z" stroke="#fcfaf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.15 17.15L31.85 31.85" stroke="#fcfaf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30.85 17.15L24 24L21.5 26.5L16.15 31.85" stroke="#fcfaf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="font-body font-medium text-[14px] md:text-[16px] leading-[1.5] text-[#8e929d] max-w-[400px]">
            30,000+ trained creators distribute your content across every platform. We test, we learn, we identify what hits.
          </p>
        </div>
      </div>
    );
  }
  return null; // Or handle other stages
}



function ActionSection() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col gap-[88px] items-center justify-center px-[24px] py-[80px] relative size-full">
          <div className="flex flex-[1_0_0] gap-[104px] items-end max-w-[1000px] min-h-px min-w-px relative w-full">
            {/* Get in Touch */}
            <div className="flex flex-[1_0_0] items-center max-w-[1000px] min-h-px min-w-px relative cursor-pointer group">
              <div className="flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
                <div className="flex flex-col items-start font-headline font-medium leading-none relative shrink-0 text-[48px] text-black tracking-[-1.44px] uppercase whitespace-nowrap">
                  <div className="relative block w-fit">
                    <p className="mb-0">Get in</p>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </div>
                  <div className="relative block w-fit mt-1">
                    <p>touch</p>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* Request Full Roster */}
            <div className="flex flex-[1_0_0] items-center justify-between max-w-[1000px] min-h-px min-w-px relative cursor-pointer group">
              <div className="flex flex-col items-start font-headline font-medium leading-none min-h-px min-w-px text-[48px] text-black tracking-[-1.44px] uppercase whitespace-nowrap">
                <div className="relative block w-fit">
                  <p className="mb-0">Request full</p>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                </div>
                <div className="relative block w-fit mt-1">
                  <p>roster</p>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Vertical center divider */}
          <div className="-translate-x-1/2 absolute bottom-0 left-1/2 top-0 w-0 pointer-events-none">
            <div className="absolute inset-[0_-0.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 418">
                <path d="M0.5 0V418" stroke="black" strokeOpacity="0.08" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YoutubeIcon() {
  return (
    <div className="shrink-0 size-[24px] cursor-pointer">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p35f23f00} fill="black" />
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div className="shrink-0 size-[24px] cursor-pointer">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p13994680} fill="black" />
        <path d={svgPaths.p20a88c00} fill="black" />
      </svg>
    </div>
  );
}

function XIcon() {
  return (
    <div className="shrink-0 size-[24px] cursor-pointer">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p7504f00} fill="black" />
      </svg>
    </div>
  );
}

function FooterContent() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center size-full">
        <div className="flex flex-col items-center pb-[80px] px-[24px] w-full">
          <div className="flex flex-col gap-[88px] items-start justify-end max-w-[1000px] pt-[80px] relative w-full">
            <div
              aria-hidden="true"
              className="absolute border-[rgba(0,0,0,0.08)] border-solid border-t inset-0 pointer-events-none"
            />
            {/* Columns */}
            <div className="flex items-start w-full">
              {/* Links list */}
              <div className="flex flex-[1_0_0] flex-col font-headline font-medium gap-[20px] items-start leading-[0.9] min-h-px min-w-px text-[16px] text-black tracking-[0.32px]">
                {["Talent", "Content", "Brands", "Careers"].map((item) => (
                  <p key={item} className="w-full cursor:pointer hover:opacity-70 transition-opacity">
                    {item}
                  </p>
                ))}
              </div>
              {/* Address */}
              <div className="flex-[1_0_0] font-body font-medium leading-[1.5] min-h-px min-w-px text-[12px] text-black uppercase whitespace-pre-wrap">
                <p className="mb-0">9999 Lorem Ipsum</p>
                <p className="mb-0">Santa Monica, CA</p>
                <p>00000</p>
              </div>
              {/* Social icons */}
              <div className="flex gap-[8px] items-start">
                <YoutubeIcon />
                <InstagramIcon />
                <XIcon />
              </div>
            </div>
            <p className="font-body font-medium leading-[1.5] text-[12px] text-black uppercase">
              © 2026 Fixated all Rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionFooter({ visible }: { visible?: boolean }) {
  return (
    <div data-snap-section className="bg-[rgba(0,0,0,0.05)] flex flex-col items-center h-screen overflow-clip w-full">
      <ActionSection />
      <FooterContent />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/content" element={<PersistentViews />} />
      <Route path="/talent" element={<PersistentViews />} />
      <Route path="/brands" element={<PersistentViews />} />
      <Route path="/contact" element={<PageShell><ContactPage /></PageShell>} />
      <Route path="*" element={<PersistentViews defaultHome />} />
    </Routes>
  );
}

function PersistentViews({ defaultHome }: { defaultHome?: boolean }) {
  const location = useLocation();
  const path = location.pathname;

  const isContent = path === "/content";
  const isTalent = path === "/talent";
  const isBrands = path === "/brands";
  const isHome = defaultHome || path === "/" || (!isContent && !isTalent && !isBrands);

  return (
    <>
      <div style={{ display: isHome ? 'block' : 'none' }}>
        <ContentPage key="home" mode="home" heroVideo="https://youtu.be/RSqxXbTFkaI" isActive={isHome} />
      </div>
      <div style={{ display: isContent ? 'block' : 'none' }}>
        <ContentPage key="content" mode="content" heroVideo="https://youtu.be/FXjDyHNL9IM" isActive={isContent} />
      </div>
      <div style={{ display: isTalent ? 'block' : 'none' }}>
        <ContentPage key="talent" mode="talent" heroVideo="https://youtu.be/RSqxXbTFkaI" isActive={isTalent} />
      </div>
      <div style={{ display: isBrands ? 'block' : 'none' }}>
        <ContentPage key="brands" mode="brands" heroVideo="https://youtu.be/FweUZMuwzyE" isActive={isBrands} />
      </div>
    </>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative bg-[#fcfaf5]">
      <NavBar ready={ready} />
      {children}
    </div>
  );
}

function ContentPage({ mode = 'content', heroVideo = '/_media/hero.mp4', isActive = true }: { mode?: 'content' | 'talent' | 'brands' | 'home'; heroVideo?: string; isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [navLight, setNavLight] = useState(true);
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [leavingSection, setLeavingSection] = useState<number | null>(null);
  const goToRef = useRef<(index: number) => void>(() => { });

  // Track active state in ref for event listeners
  const activeRef = useRef(isActive);
  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  // Dispara as animações de entrada após o primeiro render
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>("[data-snap-section]");
    const sectionCount = mode === 'content' ? 11 : (mode === 'brands' ? 6 : 5);
    const heroVideo = container.querySelector<HTMLVideoElement>("[data-parallax-hero]");

    // Invasion elements
    const invasionSource = container.querySelector<HTMLElement>("[data-invasion-source]");
    const invasionTarget = container.querySelector<HTMLElement>("[data-invasion-target]");
    const viralContent = container.querySelector<HTMLElement>("[data-parallax-viral]");

    // Disable invasion for talent mode to avoid issues with target indices
    const INVASION_FROM = mode === 'content' ? 2 : -1;
    const INVASION_TO = mode === 'content' ? 3 : -1;

    const PARALLAX_SCALE = 0.04; // how much the source scales down (0.04 = 4%)
    const PARALLAX_SHIFT = 40;   // px the source shifts up
    const VIRAL_PARALLAX = 300; // px: how far below center the content starts
    const CARD_PARALLAX_FACTOR = -0.20; // intensified elegant parallax factor Header

    // Mapa de seções escuras (onde a nav deve ser light)
    const darkSections = mode === 'content'
      ? new Set([0, 3, 4, 5, 6, 7, 8, 9])
      : new Set([0]);

    let currentIndex = 0;
    let targetIndex = 0;
    let isAnimating = false;
    let animFrameId: number;
    let lastGoToTime = 0;
    const COOLDOWN = 1000; // ms entre transições (filtra inércia do trackpad)

    // Ease-in-out quart com início cortado — remove os frames "parados" do começo
    const T_START = 0.15;
    const START_VAL = 8 * Math.pow(T_START, 4); // valor da curva em T_START
    function ease(t: number): number {
      const t2 = T_START + t * (1 - T_START); // remapeia [0,1] → [T_START,1]
      const raw = t2 < 0.5
        ? 8 * t2 * t2 * t2 * t2
        : 1 - Math.pow(-2 * t2 + 2, 4) / 2;
      return (raw - START_VAL) / (1 - START_VAL); // normaliza pra 0→1
    }

    // Card Parallax Logic
    function updateCardParallax(offset: number) {
      // Removed card parallax logic
    }

    // Atualiza parallax do vídeo hero com base no offset do container
    function updateParallax(offset: number) {
      if (!heroVideo) return;
      const baseScale = heroVideo.tagName === 'DIV' ? 1.35 : 1.15;
      heroVideo.style.transform = `scale(${baseScale}) translateY(${offset * PARALLAX_FACTOR}px)`;
    }

    // Reset invasion transforms
    function resetInvasion() {
      if (invasionSource) {
        invasionSource.style.transform = '';
      }
      if (invasionTarget) {
        invasionTarget.style.transform = '';
      }
      if (viralContent) {
        viralContent.style.transform = '';
      }
    }

    // Lê a posição visual atual do container (px de deslocamento)
    function getCurrentOffset(): number {
      const transform = container!.style.transform;
      const match = transform.match(/translateY\((-?[\d.]+)px\)/);
      return match ? -parseFloat(match[1]) : currentIndex * window.innerHeight;
    }

    // Helper to get current invasion progress state
    function getCurrentInvasionState() {
      if (!invasionTarget) return null;
      const match = invasionTarget.style.transform.match(/translateY\((-?[\d.]+)px\)/);
      return match ? parseFloat(match[1]) : null;
    }

    function goTo(index: number) {
      if (index < 0 || index >= sectionCount || index === targetIndex) return;

      // Atualiza esquema da nav ao iniciar a transição
      setNavLight(darkSections.has(index));
      setActiveSection(index);

      // Cancela animação em andamento
      cancelAnimationFrame(animFrameId);
      lastGoToTime = Date.now();

      // Fix: Desync "Empty Section" bug.
      // Only apply cleanup if we are initiating a NORMAL transition (not an invasion).
      // If we are doing an invasion (Forward/Reverse), the invasion logic handles the start state naturally.
      // If we blindly cleanup here, we reset the invasionTarget to 0, which causes the invasion logic to snap.
      const isNextInvasionForward = targetIndex === INVASION_FROM && index === INVASION_TO;
      const isNextInvasionReverse = targetIndex === INVASION_TO && index === INVASION_FROM;
      const isNextInvasion = (isNextInvasionForward || isNextInvasionReverse) && invasionSource && invasionTarget;

      const invState = getCurrentInvasionState();
      if (!isNextInvasion && invState !== null && invState !== 0) {
        const currentContainerY = parseFloat(container!.style.transform.match(/translateY\((-?[\d.]+)px\)/)?.[1] || '0');
        const newContainerY = currentContainerY + invState;
        container!.style.transform = `translateY(${newContainerY}px)`;
        resetInvasion();
      }

      const fromIndex = targetIndex;
      targetIndex = index;
      isAnimating = true;

      const vh = window.innerHeight;

      // ── Invasion transition (2→3 or 3→2) ──
      const isInvasionForward = fromIndex === INVASION_FROM && index === INVASION_TO;
      const isInvasionReverse = fromIndex === INVASION_TO && index === INVASION_FROM;

      if ((isInvasionForward || isInvasionReverse) && invasionSource && invasionTarget) {

        const currentY = getCurrentInvasionState();
        const duration = DURATION * 1.25; // slightly longer for dramatic feel
        let start: number | null = null;

        if (isInvasionForward) {
          // FORWARD (2->3)
          // Target moves from 0px (or current) -> -vh
          const startY = currentY ?? 0;
          const endY = -vh;
          const dist = Math.abs(endY - startY);
          // Adjust duration relative to distance remaining. Min 250ms to keep it snappy but not instant.
          const adjDuration = Math.max(250, duration * (dist / vh));

          const stayOffset = INVASION_FROM * vh;
          container!.style.transform = `translateY(${-stayOffset}px)`;

          function stepForward(ts: number) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / adjDuration, 1);
            const eased = ease(progress);

            const targetY = startY + (endY - startY) * eased;
            invasionTarget!.style.transform = `translateY(${targetY}px)`;

            // Card Parallax during invasion
            // const currentOffset = stayOffset + (targetY / -vh) * vh;
            // updateCardParallax(currentOffset);

            // Viral content parallax: content starts below center, ends at center
            if (viralContent) {
              const pProgress = targetY / -vh; // 0 -> 1
              const pOffset = VIRAL_PARALLAX * (1 - pProgress);
              viralContent.style.transform = `translateY(${pOffset}px)`;
            }

            // Derive source parallax from target progress 
            // Target goes 0 -> -vh. Ratio 0 -> 1.
            const ratio = Math.max(0, Math.min(1, targetY / -vh));

            const scale = 1 - PARALLAX_SCALE * ratio;
            const shift = -PARALLAX_SHIFT * ratio;
            invasionSource!.style.transform = `scale(${scale}) translateY(${shift}px)`;

            if (progress < 1) {
              animFrameId = requestAnimationFrame(stepForward);
            } else {
              invasionTarget!.style.transform = `translateY(${-vh}px)`;
              // Ao final, atualiza para o offset real do container e limpa transform
              currentIndex = index;
              container!.style.transform = `translateY(${-index * vh}px)`;
              resetInvasion();
              isAnimating = false;
            }
          }
          animFrameId = requestAnimationFrame(stepForward);

        } else {
          // REVERSE (3->2)
          // Target moves from -vh (or current) -> 0px
          const startY = currentY ?? -vh;
          const endY = 0;
          const dist = Math.abs(endY - startY);
          const adjDuration = Math.max(250, duration * (dist / vh));

          const stayOffset = INVASION_FROM * vh;
          container!.style.transform = `translateY(${-stayOffset}px)`;

          function stepReverse(ts: number) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / adjDuration, 1);
            const eased = ease(progress);

            const targetY = startY + (endY - startY) * eased;
            invasionTarget!.style.transform = `translateY(${targetY}px)`;

            // Card Parallax during invasion
            // const currentOffset = stayOffset + (targetY / -vh) * vh;
            // updateCardParallax(currentOffset);

            // Viral content parallax reverse
            if (viralContent) {
              const pProgress = targetY / -vh; // 1 -> 0
              const pOffset = VIRAL_PARALLAX * (1 - pProgress);
              viralContent.style.transform = `translateY(${pOffset}px)`;
            }

            // Derived parallax
            const ratio = Math.max(0, Math.min(1, targetY / -vh));
            const scale = 1 - PARALLAX_SCALE * ratio;
            const shift = -PARALLAX_SHIFT * ratio;
            invasionSource!.style.transform = `scale(${scale}) translateY(${shift}px)`;

            if (progress < 1) {
              animFrameId = requestAnimationFrame(stepReverse);
            } else {
              invasionTarget!.style.transform = `translateY(0px)`;
              currentIndex = index;
              container!.style.transform = `translateY(${-index * vh}px)`;
              resetInvasion();
              isAnimating = false;
              setLeavingSection(null);
            }
          }
          animFrameId = requestAnimationFrame(stepReverse);
        }
        return;
      }

      // ── Normal Transition ──
      const startY = getCurrentOffset();
      const endY = index * vh;
      const dist = Math.abs(endY - startY);
      const duration = DURATION;
      // Adjust duration based on distance? keeping standard for consistent feel
      // or: const adjDuration = Math.min(DURATION, Math.max(400, DURATION * (dist / vh)));

      let start: number | null = null;
      function step(ts: number) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = ease(progress);

        const currentScroll = startY + (endY - startY) * eased;
        container!.style.transform = `translateY(${-currentScroll}px)`;

        updateParallax(currentScroll);
        // updateCardParallax(currentScroll);

        if (progress < 1) {
          animFrameId = requestAnimationFrame(step);
        } else {
          container!.style.transform = `translateY(${-endY}px)`; // Ensure final position is exact
          currentIndex = index;
          isAnimating = false;
        }
      }
      animFrameId = requestAnimationFrame(step);
    }

    // Assign goTo to ref so it can be used outside
    goToRef.current = goTo;


    // ── Wheel with Strict Single-Section Lock ──
    function onWheel(e: WheelEvent) {
      if (!activeRef.current) return;
      e.preventDefault();

      // STRICT LOCK: If animating, ignore ALL input.
      // This prevents interruptions and forces 1 section per scroll.
      if (isAnimating) return;

      const currentDelta = Math.abs(e.deltaY);
      if (currentDelta < WHEEL_THRESHOLD) return;

      // Double check cooldown (safety)
      if (Date.now() - lastGoToTime < COOLDOWN) return;

      goTo(e.deltaY > 0 ? targetIndex + 1 : targetIndex - 1);
    }

    // ── Touch ──
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      if (!activeRef.current) return;
      touchStartY = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      if (!activeRef.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < TOUCH_THRESHOLD) return;
      goTo(diff > 0 ? targetIndex + 1 : targetIndex - 1);
    }

    // ── Keyboard ──
    function onKeyDown(e: KeyboardEvent) {
      if (!activeRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goTo(targetIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(targetIndex - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(sectionCount - 1);
      }
    }

    // ── Resize — reposiciona sem animar ──
    function onResize() {
      const offset = currentIndex * window.innerHeight;
      container!.style.transform = `translateY(${-offset}px)`;
      updateParallax(offset);
    }

    // ── Navigate-to (from nav links) ──
    function onNavigateTo(e: Event) {
      const idx = (e as CustomEvent).detail;
      if (typeof idx === "number") goTo(idx);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    container.addEventListener("navigate-to", onNavigateTo);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("navigate-to", onNavigateTo);
      cancelAnimationFrame(animFrameId);
    };
  }, []);



  const handleContentClick = useCallback(() => {
    // Dispatch custom event to trigger goTo(3) inside the scroll engine
    containerRef.current?.dispatchEvent(
      new CustomEvent("navigate-to", { detail: 3 })
    );
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative bg-[#fcfaf5]">
      <NavBar light={navLight} ready={ready} />

      {/* ── Global Particles Layer (Fixed) ── */}
      <div
        className={`fixed inset-0 z-0 bg-[#0A0A0A] transition-opacity duration-500 pointer-events-none ${(mode === 'content' && activeSection >= 3 && activeSection <= 9) ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ transitionDelay: (mode === 'content' && activeSection === 3) ? '700ms' : '0ms' }}
      >
        <Particles
          stage={activeSection >= 5 && activeSection <= 7 ? (activeSection - 4) : 0}
          particleColors={["#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div ref={containerRef} className="w-full will-change-transform">
        <SectionHero ready={ready} leaving={activeSection > 0} heroVideo={heroVideo} />

        {mode === 'content' ? (
          <>
            <SectionHeading visible={activeSection === 1 || leavingSection === 1} />
            <SectionServicesContent visible={activeSection === 2 || leavingSection === 2} />
            {/* ── Viral Machine (dark) — elevated z-index for invasion overlay ── */}
            <div data-invasion-target className="relative z-10 bg-transparent">
              <ViralMachineHero visible={activeSection === 3 || leavingSection === 3} />
              <SectionStats visible={activeSection === 4 || leavingSection === 4} />
              <ViralMachineStage
                stage={1}
                isNewStage1={true}
                title={`Micro\nCreator\nNetwork`}
                subtitle=""
                description="30,000+ trained creators distribute your content across every platform. We test, we learn, we identify what hits."
                visible={activeSection === 5 || leavingSection === 5}
              />
              <ViralMachineStage
                stage={2}
                align="right"
                title={`UGC\nCreator\nNetwork`}
                subtitle=""
                description="Real faces. Real product integration. Authentic reviews, unboxings, and testimonials that feel native—not scripted."
                visible={activeSection === 6 || leavingSection === 6}
              />
              <ViralMachineStage
                stage={3}
                align="left"
                title={`Owned &\nOperated\nNetwork`}
                subtitle=""
                description="We run some of the biggest meme brands on the internet. When content wins in Stages 1 and 2, we scale it through media properties we own. Not rented. Ours."
                visible={activeSection === 7 || leavingSection === 7}
              />
              <ViralMachineClosing visible={activeSection === 8 || leavingSection === 8} />
            </div>
            <SectionCuratedTalent visible={activeSection === 9 || leavingSection === 9} />
            <SectionFooter visible={activeSection === 10 || leavingSection === 10} />
          </>
        ) : mode === 'brands' ? (
          <>
            <SectionHeading
              visible={activeSection === 1 || leavingSection === 1}
              title1="ONE PARTNER. FULL COVERAGE."
              title2="GUARANTEED SCALE."
              description="CREATOR INTEGRATIONS, ORIGINAL CONTENT, AND MASS DISTRIBUTION—ALL UNDER ONE ROOF. THE ONLY FULLY VERTICALLY INTEGRATED CREATOR ECONOMY PLATFORM."
            />
            {/* For now, utilizing Brands specific services */}
            <SectionServicesBrands visible={activeSection === 2 || leavingSection === 2} />
            <SectionPartnerBrands visible={activeSection === 3 || leavingSection === 3} />
            <SectionCases visible={activeSection === 4 || leavingSection === 4} />
            <SectionFooter visible={activeSection === 5 || leavingSection === 5} />
          </>
        ) : (
          <>
            <SectionHeading
              visible={activeSection === 1 || leavingSection === 1}
              title1="We represent the creators"
              title2="shaping internet culture."
              description="Full-service talent management and content strategy for the world's most influential creators."
            />
            <SectionServicesTalent visible={activeSection === 2 || leavingSection === 2} />
            <SectionFeaturedTalent visible={activeSection === 3 || leavingSection === 3} />
            <SectionFooter visible={activeSection === 4 || leavingSection === 4} />
          </>
        )}
      </div>

      {
        mode === 'content' && (
          <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <StageIndicator
              stage={Math.max(1, Math.min(3, activeSection - 4)) as 1 | 2 | 3}
              visible={activeSection >= 5 && activeSection <= 7}
              onStageClick={(s) => goToRef.current(s + 4)}
            />
          </div>
        )
      }
    </div >
  );
}