import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#152236] to-[#6f3600] text-yellow-400 font-sans">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-6 pt-16 text-center">
        <img
          src="/logo.png"
          alt="8 Mile Sniper"
          className="mx-auto mb-6 w-36"
        />
        <h1 className="text-5xl font-extrabold mb-2">
          Master SEO & AI Search Domination in <br />
          <span className="text-yellow-400">2025</span>
        </h1>
        <p className="mt-2 text-sm max-w-xl mx-auto">
          The ONLY comprehensive audit that checks your SEO + AI readiness for
          ChatGPT, voice search, and the future of search engines.
        </p>
        <p className="mt-1 text-xs italic">
          Audited over 1500 sites - Results in minutes
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
            Start Free SEO & AI Analysis
          </button>
          <button className="bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-2 px-6 rounded transition">
            Get the Full Audit - $47
          </button>
        </div>
      </header>

      {/* Why We're the ONLY Choice */}
      <section className="mt-20 max-w-7xl mx-auto px-6 text-yellow-400">
        <div className="flex flex-wrap justify-between">
          <ul className="space-y-1 max-w-md">
            <li><FaCheckCircle className="inline mr-2 text-green-400" />Full 2025 AI Search Analysis</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />SEO + Structured Schema Checks</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />ChatGPT & LLM Content Optimization</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />Voice Search Readiness</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />EEAT + Trust Factor Scoring</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />Delivered as Live, Shareable Report Link</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />Branded Report Experience</li>
            <li><FaCheckCircle className="inline mr-2 text-green-400" />Results in Minutes</li>
          </ul>
          <div className="bg-yellow-600 w-60 h-60 rounded-lg flex items-center justify-center text-black font-bold text-lg">
            AI-Powered Report Preview
          </div>
        </div>
      </section>

      {/* Smarter SEO Starts Here */}
      <section className="mt-20 max-w-7xl mx-auto px-6 text-yellow-400 text-center">
        <h2 className="font-semibold mb-6">Smarter SEO Starts Here</h2>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-gray-900 p-4 rounded">AI-Powered SEO Engine</div>
          <div className="bg-gray-900 p-4 rounded">150+ SEO/AI Ranking Factors</div>
          <div className="bg-gray-900 p-4 rounded">LLM & ChatGPT Optimization</div>
          <div className="bg-gray-900 p-4 rounded">Voice Search Scoring</div>
          <div className="bg-gray-900 p-4 rounded">EEAT + Trust Analysis</div>
          <div className="bg-gray-900 p-4 rounded">Structured Data Validation</div>
        </div>
      </section>

      {/* Every Audit Includes */}
      <section className="mt-20 max-w-7xl mx-auto px-6 text-yellow-400 text-center">
        <h3 className="font-semibold mb-4">Every Audit Includes</h3>
        <ul className="list-disc list-inside max-w-md mx-auto space-y-1">
          <li>SEO + AI Score (150+ points)</li>
          <li>ChatGPT & LLM Optimization Breakdown</li>
          <li>Custom Action Plan</li>
          <li>Shareable Downloadable Report Link</li>
          <li>Built-in Upgrade Option</li>
          <li>Delivered in Minutes</li>
        </ul>
      </section>

      {/* Pricing */}
      <section className="mt-20 max-w-7xl mx-auto px-6 text-yellow-400">
        <h3 className="font-semibold mb-8 text-center">Scale With White Label Access</h3>
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* White Label Basic */}
          <div className="bg-gray-900 p-6 rounded">
            <h4 className="text-lg font-semibold mb-4">WHITE LABEL BASIC</h4>
            <p className="text-3xl font-bold mb-6">$349</p>
            <ul className="space-y-2 mb-6">
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Use your logo, platform name, and branding</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Unlimited audit reports</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Shareable live report links</li>
              <li className="text-red-500">No custom domain (you.8milesniper.com only)</li>
              <li className="text-red-500">No UI theme or color control</li>
              <li className="text-red-500">Resale not permitted</li>
              <li className="text-red-500">Email-only support</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded font-semibold w-full">
              Get White Label Basic
            </button>
          </div>

          {/* White Label Premium */}
          <div className="bg-gray-900 p-6 rounded">
            <h4 className="text-lg font-semibold mb-4">WHITE LABEL PREMIUM</h4>
            <p className="text-3xl font-bold mb-6">$549</p>
            <ul className="space-y-2 mb-6">
              <li><FaCheckCircle className="inline mr-2 text-green-400" />All Basic Features</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Unlimited audit reports</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Custom domain (yourdomain.com)</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Full UI theme & styling control</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Priority support</li>
              <li className="text-red-500">Resale not permitted</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded font-semibold w-full">
              Get White Label Premium
            </button>
          </div>

          {/* Commercial License */}
          <div className="bg-gray-900 p-6 rounded">
            <h4 className="text-lg font-semibold mb-4">COMMERCIAL LICENSE</h4>
            <p className="text-3xl font-bold mb-6">$950</p>
            <ul className="space-y-2 mb-6">
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Unlimited audit reports</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />API access</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Revenue-ready license (resell)</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Dedicated onboarding + training</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />White-label platform + custom domain</li>
              <li><FaCheckCircle className="inline mr-2 text-green-400" />Full support</li>
            </ul>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded font-semibold w-full">
              Apply for Enterprise Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 text-center text-yellow-400">
        <p>support@8milesniper.com</p>
        <p>+61 444 513 480</p>
        <p>© 2025 8 Mile Sniper</p>
        <p>Terms | Privacy | Refund Policy</p>
      </footer>
    </div>
  );
};

export default LandingPage;
