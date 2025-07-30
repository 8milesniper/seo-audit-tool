import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PricingTable = () => {
  const tiers = [
    {
      title: "White Label Basic",
      price: "$349",
      features: [
        "✅ Unlimited audit reports",
        "✅ Branded reports (your logo)",
        "✅ Hosted on our subdomain (you.8milesniper.com)",
        "✅ Shareable live report links",
        "🚫 No custom domain",
        "🚫 No UI/theme control",
        "🚫 No resale rights",
        "📧 Email-only support"
      ]
    },
    {
      title: "White Label Premium",
      price: "$549",
      features: [
        "✅ Unlimited audit reports",
        "✅ All Basic features included",
        "✅ Your custom domain (yourdomain.com)",
        "✅ Full theme/UI control",
        "✅ Priority support",
        "🚫 No resale rights"
      ]
    },
    {
      title: "Commercial License",
      price: "$950",
      features: [
        "✅ Unlimited audit reports",
        "✅ API access",
        "✅ Revenue-ready resale license",
        "✅ Full white label + custom domain",
        "✅ Dedicated onboarding & training",
        "✅ Full support"
      ]
    }
  ];

  return (
    <div className="bg-[#0a0f1c] text-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-10">Choose Your White Label Plan</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => (
          <div key={idx} className="bg-[#141d2b] p-6 rounded-lg shadow-md border border-gray-800">
            <h3 className="text-xl font-bold mb-2">{tier.title}</h3>
            <p className="text-3xl font-bold text-orange-500 mb-4">{tier.price}</p>
            <ul className="space-y-2">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-center">
                  <FaCheckCircle className="text-orange-500 mr-2" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
              {tier.title === "Commercial License" ? "Apply Now" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-b from-[#0a0f1c] to-[#391f12] text-white font-sans">
      <header className="text-center py-20 px-4">
        <img src="/eagle-logo.png" alt="8 Mile Sniper Logo" className="mx-auto mb-4 w-16" />
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="text-orange-500">Precision</span> SEO Targeting
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Get a world-class SEO audit that outperforms the competition
        </p>
        <p className="text-orange-400 mt-2 font-medium">Free • Instant • Comprehensive</p>
        <div className="mt-8 max-w-xl mx-auto flex flex-col md:flex-row items-center">
          <input
            type="text"
            placeholder="Enter your website URL (e.g., example.com)"
            className="flex-1 p-3 rounded-l-md w-full md:w-auto text-black"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-md font-bold mt-4 md:mt-0">
            Start FREE Audit →
          </button>
        </div>
        <p className="text-sm mt-3 text-gray-400">No signup required • Instant results • Professional insights</p>
      </header>

      <section className="bg-[#101726] py-16 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-orange-400 font-bold mb-2">Precision Analysis</h3>
            <p className="text-sm text-gray-300">AI-powered SEO audits built for local domination</p>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold mb-2">Instant Results</h3>
            <p className="text-sm text-gray-300">Get your SEO report in under 60 seconds</p>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold mb-2">Industry Leading</h3>
            <p className="text-sm text-gray-300">75+ technical checks + 50+ AI readiness checks</p>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold mb-2">Actionable Reports</h3>
            <p className="text-sm text-gray-300">Clear next steps, visuals, and score breakdowns</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0c131f] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Our SEO Audit Tool?</h2>
          <p className="text-gray-300 mb-8">Superior analysis that goes beyond basic SEO checks.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="text-lg font-semibold text-orange-500 mb-2">Comprehensive Analysis Includes:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>AI Readiness for search</li>
                <li>LLM scoring & future-proofing</li>
                <li>Indexing & crawl status</li>
                <li>On-page & metadata optimisation</li>
                <li>Technical SEO breakdowns</li>
                <li>Competitor snapshot</li>
                <li>Brand kit PDF report included</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-500 mb-2">What You Won’t Get:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Cookie-cutter tools</li>
                <li>Fluffy info</li>
                <li>Tech-speak with no action steps</li>
                <li>Hidden upsells</li>
                <li>Time-wasting email gates</li>
              </ul>
              <div className="mt-6 p-4 bg-[#1a2330] rounded text-center">
                <p className="text-sm text-gray-400">Single Report</p>
                <p className="text-2xl font-bold text-white mt-2">$47</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingTable />

      <footer className="bg-[#0a0f1c] text-center text-gray-400 text-sm py-8">
        <p>© 2025 8 Mile Sniper. All rights reserved. AI-Driven Local Growth Solutions</p>
        <p className="text-orange-500 mt-2 animate-pulse">Audited over 1,500 sites · Results ready in minutes</p>
      </footer>
    </main>
  );
}
