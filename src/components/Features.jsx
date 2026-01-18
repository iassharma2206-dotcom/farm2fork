function Features() {
  const features = [
    {
      icon: "🔄",
      title: "Reverse Procurement",
      description: "Post buy requests first, suppliers respond. Demand-driven sourcing that reduces waste."
    },
    {
      icon: "⚡",
      title: "One-Click Claims",
      description: "Suppliers can instantly claim requests. Fast matching, less back-and-forth."
    },
    {
      icon: "📍",
      title: "Hyper-Local Sourcing",
      description: "Connect with nearby producers. Shorter supply chains, fresher products, lower emissions."
    },
    {
      icon: "🤖",
      title: "Automated Invoicing",
      description: "Streamlined payment workflows. Automated matching between requests and deliveries."
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <h2 className="features-title">Cool Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
