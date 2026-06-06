const HeroAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Hero Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Change filename if different */}
        <source
          src="/videos/hero-electric.webm"
          type="video/webm"
        />

        <source
          src="/videos/hero-electric.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Energy Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(250,204,21,0.15), transparent 60%)",
        }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
};

export default HeroAnimation;