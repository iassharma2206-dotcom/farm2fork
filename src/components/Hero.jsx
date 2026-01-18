function Hero({ onScrollToForm }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Farm2Fork Hub</h1>
        <p className="hero-subtitle">
          Revolutionize your supply chain with reverse procurement. Post your needs first,
          and let local producers respond directly—no inventory, no waste, just fresh connections.
        </p>
        <button className="hero-cta" onClick={onScrollToForm}>
          Create Buy Request
        </button>
      </div>
    </section>
  );
}

export default Hero;
