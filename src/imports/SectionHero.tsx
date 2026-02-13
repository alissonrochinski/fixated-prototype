import imgContent from "figma:asset/d9061e62f8dc4cc92f7bdc443b4b682ada856490.png";

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

export default function SectionHero() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative size-full" data-name="section-hero">
      <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/7298e8f61203061ca8eba9290a258284485fbc39" />
      </video>
      <Content />
    </div>
  );
}