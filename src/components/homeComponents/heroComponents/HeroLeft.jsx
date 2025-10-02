export default function HeroLeft() {
  return (
    <div className="flex-2 text-center text-white">
      <div className="flex flex-col items-center justify-center space-y-6">
        <img
          src="brand.png"
          alt="We Invite Logo Text"
          className="h-auto w-2/3 object-contain"
        />
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-lg font-poppins">
          Your Digital Wedding Invitation <br /> Instan, Mudah, Eksklusif
        </p>
      </div>
    </div>
  );
}
