import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#152236] to-[#6f3600] text-yellow-400 font-sans">

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 pt-16 text-center">
        <img src="/logo.png" alt="8 Mile Sniper" className="mx-auto mb-6 w-36" />
        <h1 className="text-5xl font-extrabold mb-2">
          Master SEO & AI Search Domination in <br />
          <span className="text-yellow-400">2025</span>
        </h1>
        <p className="mt-2 text-sm max-w-xl mx-auto">
          The ONLY comprehensive audit that checks your SEO + AI readiness for ChatGPT, voice search, and the future of search engines.
        </p>
        <p className="mt-1 text-xs italic">
          Audited over 1500 sites — Results in minutes
        </p>
      </header>

      {/* Primary CTAs */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
          Start Free SEO & AI Analysis
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
          Get the Full Audit – $47
        </button>
      </div>

      {/* AI SEO Advantage */}
      <section className="mt-16 max-w-6xl mx-auto px-6">
        <h2 className="text-center font-semibold mb-6 text-lg">Choose Your AI SEO Advantage</h2>
        <div className="grid grid-cols-3 gap-6 text-black">
          {/* Free Audit */}
          <div className="bg-gray-900 rounded p-6 text-yellow-400 text-sm">
            <h3 className="font-bold mb-3">FREE AUDIT</h3>
            <ul className="space-y-1">
              <li>Top-level SEO score</li>
              <li>Improvement tips</li>
              <li>AI Content breakdown</li>
              <li>Shareable PDF report</li>
            </ul>
            <button className="mt-4 bg-yellow-500 py-1 px-3 rounded text-black text-sm">
              Start Free Audit
            </button>
          </div>
          {/* Single Report */}
          <div className="bg-gray-900 rounded p-6 text-yellow-400 text-sm border-2 border-yellow-400">
            <h3 className="font-bold mb-3">$47 SINGLE REPORT</h3>
            <span className="block uppercase text-xs mb-2">Most Popular</span>
            <ul className="space-y-1">
              <li>150+ AI + SEO checks</li>
              <li>ChatGPT LLM optimization</li>
              <li>Voice & EEAT scoring</li>
              <li>Shareable live audit link</li>
            </ul>
            <button className="mt-4 bg-yellow-500 py-1 px-3 rounded text-black text-sm">
              Get My Full Report
            </button>
          </div>
          {/* Bulk Plan */}
          <div className="bg-gray-900 rounded p-6 text-yellow-400 text-sm">
            <h3 className="font-bold mb-3">$147 BULK PLAN</h3>
            <ul className="space-y-1">
              <li>10 complete audits</li>
              <li>Priority processing</li>
              <li>LLM scoring on each report</li>
              <li>Branded live report links</li>
            </ul>
            <button className="mt-4 bg-yellow-500 py-1 px-3 rounded text-black text-sm">
              Get Bulk Access
            </button>
          </div>
        </div>
      </section>

      {/* Why We’re the ONLY Choice */}
      <section className="mt-24 bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Features */}
          <div className="flex-1 space-y-2 text-sm text-yellow-400">
            <h2 className="text-xl font-semibold mb-4">Why We’re the ONLY Choice for 2025</h2>
            <ul className="space-y-1">
              <li><FaCheckCircle className="inline mr-2"/>Full 2025 AI Search Analysis</li>
              <li><FaCheckCircle className="inline mr-2"/>SEO + Structured Data Checks</li>
              <li><FaCheckCircle className="inline mr-2"/>ChatGPT & LLM Content Optimization</li>
              <li><FaCheckCircle className="inline mr-2"/>Voice Search Readiness</li>
              <li><FaCheckCircle className="inline mr-2"/>EEAT + Trust Factor Scoring</li>
              <li><FaCheckCircle className="inline mr-2"/>Live, Shareable Report Link</li>
              <li><FaCheckCircle className="inline mr-2"/>Branded Report Experience</li>
              <li><FaCheckCircle className="inline mr-2"/>Results in Minutes</li>
            </ul>
          </div>
          {/* Graphic */}
          <div className="flex-1">
            <div className="w-full h-64 bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-lg flex items-center justify-center">
              <span className="text-black font-semibold">AI-Powered Report Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Smarter SEO Starts Here */}
      <section className="mt-24 max-w-6xl mx-auto px-6">
        <h2 className="text-center font-semibold mb-6 text-lg">Smarter SEO Starts Here</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-black">
          {[
            "AI-Powered SEO Engine",
            "150+ SEQAI Ranking Factors",
            "LLM & ChatGPT Optimization",
            "Voice Search Scoring",
            "EEAT + Trust Analysis",
            "Structured Data Validation",
          ].map((feat) => (
            <div key={feat} className="bg-gray-900 rounded p-4 text-yellow-400 text-center text-sm">
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* Every Audit Includes */}
      <section className="mt-24 max-w-4xl mx-auto px-6">
        <h2 className="text-center font-semibold mb-4 text-lg">Every Audit Includes</h2>
        <ul className="space-y-2 text-yellow-400 text-sm list-disc list-inside">
          {[
            "SEO + AI Score (150+ points)",
            "ChatGPT & LLM Optimization Breakdown",
            "Custom Action Plan",
            "Shareable Downloadable Report Link",
            "Built-in Upgrade Option",
            "Delivered in Minutes",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Scale With White Label Access */}
      <section className="mt-24 max-w-6xl mx-auto px-6">
        <h2 className="text-center font-semibold mb-6 text-lg">Scale With White Label Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
          {[
            {
              title: "White Label Basic",
              price: "$349",
              features: [
                "Use your logo & branding",
                "Unlimited audit reports",
                "Shareable live report links",
                "No custom domain",
                "No UI theme control",
                "Email-only support",
              ],
            },
            {
              title: "White Label Premium",
              price: "$549",
              features: [
                "All Basic features",
                "Unlimited audit reports",
                "Custom domain (yourdomain.com)",
                "Full UI & theme control",
                "Priority support",
                "Resale rights permitted",
              ],
            },
            {
              title: "Commercial License",
              price: "$950",
              features: [
                "Unlimited audit reports",
                "API access",
                "Resale rights license",
                "Dedicated onboarding + training",
                "White-label platform + custom domain",
                "Full support",
              ],
            },
          ].map(({ title, price, features }) => (
            <div key={title} className="bg-gray-900 rounded p-6 text-yellow-400 text-sm">
              <h3 className="font-bold mb-3">{title}</h3>
              <p className="text-2xl font-extrabold mb-3">{price}</p>
              <ul className="space-y-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center">
                    <FaCheckCircle className="mr-2 text-yellow-400"/> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-4 bg-yellow-500 py-2 px-4 rounded text-black font-semibold text-sm">
                {title.includes("Commercial") ? "Apply for Enterprise Access" : `Get ${title}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA + Footer */}
      <section className="mt-24 bg-gray-900 py-12 text-center">
        <p className="mb-4">Not Sure Which Plan Fits You Best?</p>
        <div className="space-x-4">
          <button className="bg-yellow-500 py-2 px-4 rounded text-black font-semibold">Take the 30-Second Quiz</button>
          <button className="bg-yellow-500 py-2 px-4 rounded text-black font-semibold">Book a Quick Call</button>
        </div>
      </section>

      <footer className="mt-12 pb-6 text-center text-xs text-yellow-400">
        <p>© 2025 8 Mile Sniper. All rights reserved. | AI-Driven Local Growth Solutions</p>
        <p>support@8milesniper.com • +1 234 567 890</p>
      </footer>
    </div>
  );
};

export default LandingPage;
