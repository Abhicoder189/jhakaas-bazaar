const About = () => {
  return (
    <div className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">About Jhakaas Bazaar</h1>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="card p-8">
            <h2 className="text-3xl font-display font-bold text-maroon-500 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Jhakaas Bazaar was born from a deep appreciation for India's rich cultural heritage
              and the incredible artisans who keep traditional crafts alive. We believe that every
              handcrafted product tells a story—a story of skill passed down through generations,
              of communities working together, and of the beauty that emerges when tradition meets
              passion.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our mission is simple: to create a platform where talented artisans from across India
              can showcase their work to a global audience, while ensuring they receive fair
              compensation and recognition for their incredible craftsmanship.
            </p>
          </div>

          <div className="card p-8 bg-gradient-to-r from-saffron-50 to-gold-50">
            <h2 className="text-3xl font-display font-bold text-maroon-500 mb-4">
              What We Offer
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-saffron-600 mr-3 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>Authentic Handicrafts:</strong> From pottery to wood carving, every piece
                  is genuinely handmade.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-saffron-600 mr-3 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>Traditional Jewelry:</strong> Kundan, terracotta, silver—crafted using
                  age-old techniques.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-saffron-600 mr-3 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>Apparel & Textiles:</strong> Hand-woven sarees, block-printed kurtas, and
                  more.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-saffron-600 mr-3 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>Home Décor:</strong> Transform your space with authentic Indian art and
                  décor.
                </p>
              </li>
            </ul>
          </div>

          <div className="card p-8">
            <h2 className="text-3xl font-display font-bold text-maroon-500 mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to ethical sourcing, fair trade practices, and sustainability. When
              you shop with Jhakaas Bazaar, you're not just buying a product—you're supporting
              livelihoods, preserving cultural traditions, and contributing to a more sustainable
              future.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every purchase makes a difference. Thank you for being a part of our journey to
              celebrate and preserve India's incredible artistic heritage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
