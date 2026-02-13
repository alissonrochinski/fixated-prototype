import imgImage from "figma:asset/1bceb5f81b5a7b4df0465a6b3aceb8f91b23c723.png";
import imgImage1 from "figma:asset/ebf046c54ff6840ffb2c97250dfdf128572abea1.png";
import imgImage2 from "figma:asset/6d8f06dbc079ecbc821709b62d47f911b1bca241.png";
import imgImage3 from "figma:asset/c8a9d31ed2c7feb368f22c9967dae5d88e9e7d74.png";
import imgImage4 from "figma:asset/06e6ebbfd2a57c33337a198654981e807b45e4cd.png";
import imgImage5 from "figma:asset/461ae3a6af4193a2c682d1002a4a34243433ed50.png";

function ServiceCardTalent() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[16px] shrink-0 size-[120px]" data-name="service-card-talent">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function Infos1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="infos">
      <p className="font-['Stack_Sans_Headline:Regular',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black">Botez Sisters</p>
    </div>
  );
}

function Infos() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="infos">
      <Infos1 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-none opacity-60 relative shrink-0 text-[14px] text-black">2.4M</p>
    </div>
  );
}

function TalentCard() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] col-[1] justify-self-stretch relative rounded-[16px] row-[1] self-stretch shrink-0" data-name="Talent Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[4px] relative size-full">
          <ServiceCardTalent />
          <Infos />
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[16px] shrink-0 size-[120px]" data-name="service-card-talent">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Infos3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="infos">
      <p className="font-['Stack_Sans_Headline:Regular',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black">The Sketch Real</p>
    </div>
  );
}

function Infos2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="infos">
      <Infos3 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-none opacity-60 relative shrink-0 text-[14px] text-black">2.4M</p>
    </div>
  );
}

function TalentCard1() {
  return (
    <div className="col-[2] justify-self-stretch relative rounded-[16px] row-[1] self-stretch shrink-0" data-name="Talent Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[4px] relative size-full">
          <ServiceCardTalent1 />
          <Infos2 />
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[16px] shrink-0 size-[120px]" data-name="service-card-talent">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-[-4.54%] max-w-none size-[109.09%] top-[-3.42%]" src={imgImage2} />
        </div>
      </div>
    </div>
  );
}

function Infos5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="infos">
      <p className="font-['Stack_Sans_Headline:Regular',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black">Zach Justice</p>
    </div>
  );
}

function Infos4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="infos">
      <Infos5 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-none opacity-60 relative shrink-0 text-[14px] text-black">2.4M</p>
    </div>
  );
}

function TalentCard2() {
  return (
    <div className="col-[1] justify-self-stretch relative rounded-[16px] row-[2] self-stretch shrink-0" data-name="Talent Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[4px] relative size-full">
          <ServiceCardTalent2 />
          <Infos4 />
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[16px] shrink-0 size-[120px]" data-name="service-card-talent">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
    </div>
  );
}

function Infos7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="infos">
      <p className="font-['Stack_Sans_Headline:Regular',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black">Jimmy Zhang</p>
    </div>
  );
}

function Infos6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="infos">
      <Infos7 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-none opacity-60 relative shrink-0 text-[14px] text-black">2.4M</p>
    </div>
  );
}

function TalentCard3() {
  return (
    <div className="col-[2] justify-self-stretch relative rounded-[16px] row-[2] self-stretch shrink-0" data-name="Talent Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[4px] relative size-full">
          <ServiceCardTalent3 />
          <Infos6 />
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[16px] shrink-0 size-[120px]" data-name="service-card-talent">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
    </div>
  );
}

function Infos9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="infos">
      <p className="font-['Stack_Sans_Headline:Regular',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black">Ronnie Coleman</p>
    </div>
  );
}

function Infos8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="infos">
      <Infos9 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-none opacity-60 relative shrink-0 text-[14px] text-black">2.4M</p>
    </div>
  );
}

function TalentCard4() {
  return (
    <div className="col-[1] justify-self-stretch relative rounded-[16px] row-[3] self-stretch shrink-0" data-name="Talent Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[4px] relative size-full">
          <ServiceCardTalent4 />
          <Infos8 />
        </div>
      </div>
    </div>
  );
}

function ServiceCardTalent5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[16px] shrink-0 size-[120px]" data-name="service-card-talent">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      </div>
    </div>
  );
}

function Infos11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="infos">
      <p className="font-['Stack_Sans_Headline:Regular',sans-serif] leading-[0.9] not-italic relative shrink-0 text-[14px] text-black">Craft Culture</p>
    </div>
  );
}

function Infos10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0" data-name="infos">
      <Infos11 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-none opacity-60 relative shrink-0 text-[14px] text-black">2.4M</p>
    </div>
  );
}

function TalentCard5() {
  return (
    <div className="col-[2] justify-self-stretch relative rounded-[16px] row-[3] self-stretch shrink-0" data-name="Talent Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[4px] relative size-full">
          <ServiceCardTalent5 />
          <Infos10 />
        </div>
      </div>
    </div>
  );
}

function Grid() {
  return (
    <div className="gap-[8px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(3,_fit-content(100%))] relative shrink-0 w-full" data-name="grid">
      <TalentCard />
      <TalentCard1 />
      <TalentCard2 />
      <TalentCard3 />
      <TalentCard4 />
      <TalentCard5 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start max-w-[1000px] relative shrink-0 w-full" data-name="content">
      <p className="font-['Stack_Sans_Headline:Medium',sans-serif] leading-[0.9] not-italic opacity-40 relative shrink-0 text-[14px] text-black tracking-[0.14px] uppercase">Featured talent</p>
      <Grid />
    </div>
  );
}

export default function SectionServices() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[120px] relative size-full" data-name="section-services">
      <Content />
    </div>
  );
}