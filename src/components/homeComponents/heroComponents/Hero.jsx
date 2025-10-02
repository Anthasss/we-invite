import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
  return (
    <div className="h-screen w-full bg-[url('/bg-landing.png')] bg-cover bg-center">
      {/* content overlay */}
      <div className="h-screen w-full bg-secondary/70 flex items-center justify-center px-8">
        {/* content flex - responsive layout */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Side logo & text */}
          <HeroLeft />

          {/* right side cta & button */}
          <HeroRight />
          
        </div>
      </div>
    </div>
  );
}
