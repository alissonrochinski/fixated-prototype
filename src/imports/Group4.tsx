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
    <div className="absolute bg-[rgba(0,0,0,0.9)] content-stretch flex flex-col h-[500px] items-start justify-end left-0 overflow-clip pb-[8px] rounded-[16px] top-0 w-[328px]" data-name="service-card-talent">
      <video autoPlay className="absolute max-w-none object-cover opacity-20 size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/528fafdf8bf27a93ca0eba616db722d9bbe7662c" />
      </video>
      <Infos />
    </div>
  );
}

function Infos1() {
  return (
    <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] mb-[-8px] relative shrink-0 to-[66.325%] to-[rgba(0,0,0,0.9)] w-full" data-name="infos">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[80px] px-[24px] relative w-full">
        <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.2] min-w-full opacity-70 relative shrink-0 text-[#fcfaf5] text-[14px] tracking-[0.14px] w-[min-content] whitespace-pre-wrap">Full 360° business management for the internet’s top creators, from content strategy to brand deals to long-term career architecture.</p>
      </div>
    </div>
  );
}

function ServiceCardTalent1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.9)] content-stretch flex flex-col h-[500px] items-start justify-end left-[398px] overflow-clip pb-[8px] rounded-[16px] top-0 w-[328px]" data-name="service-card-talent">
      <video autoPlay className="absolute max-w-none object-cover opacity-80 size-full" controlsList="nodownload" loop playsInline>
        <source src="/_videos/v1/528fafdf8bf27a93ca0eba616db722d9bbe7662c" />
      </video>
      <Infos1 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <ServiceCardTalent />
      <ServiceCardTalent1 />
    </div>
  );
}