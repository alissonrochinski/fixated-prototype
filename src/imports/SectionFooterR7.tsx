import svgPaths from "./svg-ugn9dwczws";

function Action1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between max-w-[1000px] min-h-px min-w-px not-italic relative" data-name="action">
      <div className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-none relative shrink-0 text-[48px] text-black tracking-[-1.44px] uppercase whitespace-nowrap">
        <p className="mb-0">Get in</p>
        <p>touch</p>
      </div>
      <p className="font-['Stack_Sans_Headline:Light',sans-serif] leading-[0.9] relative shrink-0 text-[120px] tracking-[-6px]">→</p>
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center max-w-[1000px] min-h-px min-w-px relative" data-name="action">
      <Action1 />
    </div>
  );
}

function Action2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between max-w-[1000px] min-h-px min-w-px relative" data-name="action">
      <p className="flex-[1_0_0] font-['Stack_Sans_Headline:Medium',sans-serif] leading-none min-h-px min-w-px not-italic relative text-[48px] text-black tracking-[-1.44px] uppercase whitespace-pre-wrap">Request full roster</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[104px] items-end max-w-[1000px] min-h-px min-w-px relative w-full" data-name="content">
      <Action />
      <Action2 />
    </div>
  );
}

function Content() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[88px] items-center justify-center px-[24px] py-[80px] relative size-full">
          <Content1 />
          <div className="-translate-x-1/2 absolute bottom-0 left-1/2 top-0 w-0">
            <div className="absolute inset-[0_-0.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 418">
                <path d="M0.5 0V418" id="Vector 13" stroke="var(--stroke-0, black)" strokeOpacity="0.08" />
              </svg>
            </div>
          </div>
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

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[88px] items-start justify-end max-w-[1000px] pt-[80px] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.08)] border-solid border-t inset-0 pointer-events-none" />
      <Columns />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[12px] text-black uppercase">© 2026 Fixated all Rights reserved.</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[80px] px-[24px] relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

export default function SectionFooterR() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-center relative size-full" data-name="section-footer-r7">
      <Content />
      <Content2 />
    </div>
  );
}