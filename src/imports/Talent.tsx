import svgPaths from "./svg-7uktqo1iio";
import imgContent from "figma:asset/d9061e62f8dc4cc92f7bdc443b4b682ada856490.png";

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="text">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black tracking-[0.28px] uppercase">Get in Touch</p>
    </div>
  );
}

function Button() {
  return (
    <div className="backdrop-blur-[16px] bg-[rgba(0,0,0,0.05)] content-stretch flex gap-[8px] h-[40px] items-center justify-center p-[12px] relative rounded-[999px] shrink-0" data-name="Button">
      <Text />
    </div>
  );
}

function TabMenu() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="tab menu">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black tracking-[0.98px] uppercase">Talent</p>
    </div>
  );
}

function TabMenu1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="tab menu">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black tracking-[0.98px] uppercase">Content</p>
    </div>
  );
}

function TabMenu2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="tab menu">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black tracking-[0.98px] uppercase">Brands</p>
    </div>
  );
}

function Nav() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[24px] h-[56px] items-center justify-center left-1/2 px-[24px] py-[12px] rounded-[999px] top-1/2" data-name="nav">
      <TabMenu />
      <TabMenu1 />
      <TabMenu2 />
    </div>
  );
}

function NavR() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 p-[24px] right-0 top-0" data-name="nav R7">
      <div className="h-[18px] relative shrink-0 w-[154px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 154 18">
          <g id="Vector">
            <path d={svgPaths.p217c6300} fill="var(--fill-0, black)" />
            <path d={svgPaths.pd1f38f0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p10ce3a00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p152ba680} fill="var(--fill-0, black)" />
            <path d={svgPaths.p35c2d100} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3260aa00} fill="var(--fill-0, black)" />
            <path d={svgPaths.paa33240} fill="var(--fill-0, black)" />
            <path d={svgPaths.p33c06f80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2f828980} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2fd71c00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1a73dc00} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <Button />
      <Nav />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[200px] items-end justify-center py-[40px] relative shrink-0 w-full" data-name="content">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContent} />
      <div className="flex-[1_0_0] font-['Stack_Sans_Headline:Medium',sans-serif] leading-none max-w-[408px] min-h-px min-w-px not-italic relative text-[#fcfaf5] text-[24px] text-center uppercase whitespace-pre-wrap">
        <p className="mb-0">The Operating System</p>
        <p>for Creators</p>
      </div>
    </div>
  );
}

function SectionHero() {
  return (
    <div className="content-stretch flex flex-col h-[800px] items-center justify-end relative shrink-0 w-full" data-name="section-hero">
      <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/7298e8f61203061ca8eba9290a258284485fbc39" />
      </video>
      <Content />
    </div>
  );
}

function GroupInfos() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 text-black uppercase w-full whitespace-pre-wrap" data-name="group-infos">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[64px] tracking-[-1.92px] w-full">We represent the creators shaping internet culture.</p>
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[12px] tracking-[0.12px] w-full">We don’t just manage talent—we build creator businesses.</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="text">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[#fcfaf5] text-[14px] tracking-[0.28px] uppercase">Get in Touch</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black content-stretch flex gap-[8px] h-[40px] items-center justify-center p-[12px] relative rounded-[999px] shrink-0" data-name="Button">
      <Text2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-full" data-name="text">
      <GroupInfos />
      <Button1 />
    </div>
  );
}

function PageContainer() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1000px] relative shrink-0 w-full" data-name="page-container">
      <Text1 />
    </div>
  );
}

function SectionHeading() {
  return (
    <div className="h-[800px] relative shrink-0 w-full" data-name="section-heading">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center pb-[200px] pt-[280px] px-[24px] relative size-full">
          <PageContainer />
        </div>
      </div>
    </div>
  );
}

function Infos() {
  return (
    <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] mb-[-8px] relative shrink-0 to-[rgba(0,0,0,0.3)] w-full" data-name="infos">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[80px] px-[24px] relative w-full">
        <div className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[#fcfaf5] text-[24px] uppercase whitespace-nowrap">
          <p className="mb-0">Talent</p>
          <p>Management</p>
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent() {
  return (
    <div className="bg-[rgba(0,0,0,0.9)] content-stretch flex flex-col h-[420px] items-start justify-end overflow-clip pb-[8px] relative rounded-[16px] shrink-0 w-[328px]" data-name="service-card-talent">
      <video autoPlay className="absolute max-w-none object-cover opacity-20 size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/528fafdf8bf27a93ca0eba616db722d9bbe7662c" />
      </video>
      <Infos />
    </div>
  );
}

function Infos1() {
  return (
    <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] mb-[-8px] relative shrink-0 to-[rgba(0,0,0,0.3)] w-full" data-name="infos">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[80px] px-[24px] relative w-full">
        <div className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[#fcfaf5] text-[24px] uppercase whitespace-nowrap">
          <p className="mb-0">CONTENT</p>
          <p>STUDIO</p>
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent1() {
  return (
    <div className="bg-[rgba(0,0,0,0.9)] content-stretch flex flex-col h-[420px] items-start justify-end overflow-clip pb-[8px] relative rounded-[16px] shrink-0 w-[328px]" data-name="service-card-talent">
      <video autoPlay className="absolute max-w-none object-cover opacity-20 size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/06ce4af65e5b5dd7cac9ba305aea725d2cec73d4" />
      </video>
      <Infos1 />
    </div>
  );
}

function Infos2() {
  return (
    <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] mb-[-8px] relative shrink-0 to-[rgba(0,0,0,0.3)] w-full" data-name="infos">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[80px] px-[24px] relative w-full">
        <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[#fcfaf5] text-[24px] uppercase">MONETIZATION</p>
      </div>
    </div>
  );
}

function ServiceCardTalent2() {
  return (
    <div className="bg-[rgba(0,0,0,0.9)] content-stretch flex flex-col h-[420px] items-start justify-end overflow-clip pb-[8px] relative rounded-[16px] shrink-0 w-[328px]" data-name="service-card-talent">
      <video autoPlay className="absolute max-w-none object-cover opacity-20 size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/4f974240f74e73280f96f49f3b5fd686c3f5eed0" />
      </video>
      <Infos2 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[420px] items-start max-w-[1000px] relative shrink-0 w-full" data-name="content">
      <ServiceCardTalent />
      <ServiceCardTalent1 />
      <ServiceCardTalent2 />
    </div>
  );
}

function SectionMegaServices() {
  return (
    <div className="relative shrink-0 w-full" data-name="section-mega-services">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[24px] py-[200px] relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0.9] max-w-[1000px] not-italic relative shrink-0 text-black w-[1000px]" data-name="action">
      <div className="font-['Stack_Sans_Headline:Medium',sans-serif] relative shrink-0 text-[64px] tracking-[-1.92px] uppercase whitespace-nowrap">
        <p className="mb-0">Get in</p>
        <p>touch</p>
      </div>
      <p className="font-['Stack_Sans_Headline:Light',sans-serif] h-[84px] relative shrink-0 text-[120px] tracking-[-6px] w-[97px] whitespace-pre-wrap">→</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#fcfaf5] h-[400px] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[80px] relative size-full">
          <Action />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Stack_Sans_Headline:Regular',sans-serif] gap-[20px] items-start leading-[0.9] min-h-px min-w-px not-italic relative text-[16px] text-black tracking-[0.32px] whitespace-pre-wrap" data-name="list">
      <p className="relative shrink-0 w-full">Talent</p>
      <p className="relative shrink-0 w-full">Content</p>
      <p className="relative shrink-0 w-full">Brands</p>
      <p className="relative shrink-0 w-full">Careers</p>
    </div>
  );
}

function Youtube() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="youtube">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="youtube">
          <path d={svgPaths.p35f23f00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="instagram">
          <g id="Vector">
            <path d={svgPaths.p13994680} fill="var(--fill-0, black)" />
            <path d={svgPaths.p20a88c00} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="x">
          <path d={svgPaths.p7504f00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="list">
      <Youtube />
      <Instagram />
      <X />
    </div>
  );
}

function Columns() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="columns">
      <List />
      <div className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px relative text-[12px] text-black uppercase whitespace-pre-wrap">
        <p className="mb-0">9999 Lorem Ipsum</p>
        <p className="mb-0">Santa Monica, CA</p>
        <p>00000</p>
      </div>
      <List1 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[88px] items-start justify-end max-w-[1000px] pt-[80px] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Columns />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[12px] text-black uppercase">© 2026 Fixated all Rights reserved.</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#fcfaf5] relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[80px] px-[24px] relative w-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function SectionFooterR() {
  return (
    <div className="bg-[#fcfaf5] content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-[1440px]" data-name="section-footer-r7">
      <Content2 />
      <Content3 />
    </div>
  );
}

function Page() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="page">
      <SectionHero />
      <SectionHeading />
      <SectionMegaServices />
      <SectionFooterR />
    </div>
  );
}

export default function Talent() {
  return (
    <div className="bg-[#fcfaf5] content-stretch flex flex-col items-start relative size-full" data-name="Talent">
      <NavR />
      <Page />
    </div>
  );
}