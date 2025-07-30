import React from 'react';

const LandingPage = () => {
  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Master SEO & AI Search Domination in 2025
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Audited over{' '}
          <span id="counter" className="text-yellow-400 font-semibold">
            1,500
          </span>{' '}
          sites · Results ready in minutes
        </p>
        <div className="flex flex-col sm:flex-row justify-center max-w-xl mx-auto mt-6">
          <input
            type="text"
            placeholder="Enter your website URL (e.g., example.com)"
            className="w-full sm:w-96 px-4 py-3 text-black rounded-l-md"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 font-bold rounded-r-md">
            Start FREE Audit
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          No signup required • Instant results • Professional insights
        </p>
      </section>

      {/* AI + SEO Highlights */}
      <section className="py-16 px-6 text-center bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">What We Check</h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-10">
          We analyse over <span className="text-yellow-400 font-semibold">75 SEO factors</span> and more than{' '}
          <span className="text-yellow-400 font-semibold">50 AI/LLM readiness signals</span> to give your site a tactical edge.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">On-Page SEO</h3>
            <p className="text-gray-300">Headers, keyword structure, title optimisation</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Technical Performance</h3>
            <p className="text-gray-300">Load speed, errors, core vitals, sitemap, indexing</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">AI & LLM Compatibility</h3>
            <p className="text-gray-300">Voice readiness, ChatGPT answers, schema matching</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic */}
          <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">White Label Basic</h3>
            <p className="mb-4 text-xl font-semibold">$349 USD</p>
            <ul className="text-sm text-gray-300 mb-6 space-y-2">
              <li>✅ Branded reports</li>
              <li>✅ Subdomain access</li>
              <li>✅ 10 audits included</li>
              <li>🚫 No custom domain</li>
              <li>🚫 No resale rights</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-bold rounded-md">
              Get Basic
            </button>
          </div>

          {/* Premium */}
          <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">White Label Premium</h3>
            <p className="mb-4 text-xl font-semibold">$549 USD</p>
            <ul className="text-sm text-gray-300 mb-6 space-y-2">
              <li>✅ All Basic features</li>
              <li>✅ Custom domain</li>
              <li>✅ UI/theme control</li>
              <li>✅ 25 audits included</li>
              <li>🚫 No resale rights</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-bold rounded-md">
              Get Premium
            </button>
          </div>

          {/* Commercial */}
          <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Commercial License</h3>
            <p className="mb-4 text-xl font-semibold">$950 USD</p>
            <ul className="text-sm text-gray-300 mb-6 space-y-2">
              <li>✅ Unlimited audits</li>
              <li>✅ API access</li>
              <li>✅ Full resale rights</li>
              <li>✅ Platform customisation</li>
              <li>✅ Enterprise support</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 font-bold rounded-md">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center px-4 bg-gray-900">
        <h2 className="text-3xl font-bold mb-4">Ready to See How You Rank?</h2>
        <p className="text-gray-300 mb-6">Start your FREE SEO + AI audit and get tactical insights within minutes.</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 font-bold rounded-md">
          Run My Audit Now
        </button>
      </section>
    </main>
  );
};

export default LandingPage;
