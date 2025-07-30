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
      </header>

      {/* CTA Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
          Start Free SEO & AI Analysis
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
          Get the Full Audit – $47
        </button>
      </div>

      {/* Choose Your AI SEO Advantage */}
      <section className="mt-16 max-w-6xl mx-auto px-6">
        <h2 className="text-center font-semibold mb-6 text-lg">
          Choose Your AI SEO Advantage
        </h2>
        <div className="grid grid-cols-3 gap-6 text-black">
          {/* Free Audit */}
          <div className="bg-gray-900 rounded p-6 text-yellow-400 text-sm">
            <h3 className="font-bold mb-3">FREE AUDIT</h3>
            <p>- Top-level SEO score</p>
            <p>- 5 improvement tips</p>
            <p>- AI content detection</p>
            <p>- Browser-based report (no download needed)</p>
            <button className="mt-4 bg-yellow-500 text-black font-semibold py-1 px-4 rounded hover:bg-yellow-600 transition">
              Start Free Audit
            </button>
          </div>
          {/* $47 Single Report */}
          <div className="bg-yellow-900 rounded p-6 text-black text-sm border-4 border-yellow-500">
            <h3 className="font-bold mb-3"> $47 SINGLE REPORT </h3>
            <p>✔ 150+ AI + SEO checks</p>
            <p>✔ ChatGPT + LLM optimization scan</p>
            <p>✔ Voice search + EEAT scoring</p>
            <p>✔ Conversational & shareable live audit link</p>
            <button className="mt-4 bg-yellow-600 text-black font-semibold py-1 px-4 rounded hover:bg-yellow-700 transition">
              Get My Full Report
            </button>
          </div>
          {/* $147 Bulk Plan */}
          <div className="bg-gray-900 rounded p-6 text-yellow-400 text-sm">
            <h3 className="font-bold mb-3">$147 BULK PLAN</h3>
            <p>- 10 complete audits</p>
            <p>- Priority processing</p>
            <p>- AI + LLM scoring on each report</p>
            <p>- Delivered via branded live report link</p>
            <button className="mt-4 bg-yellow-500 text-black font-semibold py-1 px-4 rounded hover:bg-yellow-600 transition">
              Get Bulk Access
            </button>
          </div>
        </div>
      </section>

      {/* Why We're the ONLY Choice */}
      <section className="mt-20 max-w-6xl mx-auto px-6 text-yellow-400 text-sm grid grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-semibold mb-4 text-lg">Why We're the ONLY Choice for 2025</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full 2025 AI Search Analysis</li>
            <li>SEO + Structured Schema Checks</li>
            <li>ChatGPT & LLM Content Optimization</li>
            <li>Voice Search Readiness</li>
            <li>EEAT + Trust Factor Scoring</li>
            <li>Delivered as Live, Shareable Report Link</li>
            <li>Branded Report Experience</li>
            <li>Results in Minutes</li>
          </ul>
        </div>
        <div className="bg-yellow-500 rounded h-48 flex items-center justify-center text-black font-bold">
          AI-Powered Report Preview
        </div>
      </section>

      {/* Smarter SEO Starts Here */}
      <section className="mt-20 max-w-6xl mx-auto px-6">
        <h2 className="text-yellow-400 font-semibold text-center mb-8 text-lg">
          Smarter SEO Starts Here
        </h2>
        <div className="grid grid-cols-3 gap-6 text-yellow-400 text-center">
          <div className="bg-gray-900 rounded p-4">
            <div>🤖</div>
            <p>AI-Powered SEO Engine</p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <div>📊</div>
            <p>150+ SEO/AI Ranking Factors</p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <div>💬</div>
            <p>LLM & ChatGPT Optimization</p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <div>🎙️</div>
            <p>Voice Search Scoring</p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <div>🛡️</div>
            <p>EEAT + Trust Analysis</p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <div>✔️</div>
            <p>Structured Data Validation</p>
          </div>
        </div>
      </section>

      {/* Every Audit Includes */}
      <section className="mt-20 max-w-6xl mx-auto px-6">
        <h2 className="font-semibold text-yellow-400 mb-4 text-lg">Every Audit Includes</h2>
        <ul className="list-disc pl-6 text-yellow-400 text-sm space-y-1">
          <li>SEO + AI Score (150+ points)</li>
          <li>ChatGPT & LLM Optimization Breakdown</li>
          <li>Custom Action Plan</li>
          <li>Shareable Downloadable Report Link</li>
          <li>Built-in Upgrade Option</li>
          <li>Delivered in Minutes</li>
        </ul>
      </section>

      {/* Scale With White Label Access */}
      <section className="mt-20 max-w-6xl mx-auto px-6 text-yellow-400">
        <h2 className="font-semibold text-lg mb-6">Scale With White Label Access</h2>
        <div className="grid grid-cols-3 gap-6 text-black">
          {/* Basic Plan */}
          <div className="bg-yellow-900 rounded p-6">
            <h3 className="font-bold mb-3">$349</h3>
            <ul className="text-yellow-400 text-sm list-disc pl-5 space-y-1">
              <li>Use your logo, platform name, and branding</li>
              <li>Unlimited audit reports</li>
              <li>Shareable live report links</li>
              <li>No custom domain (you.8milesniper.com only)</li>
              <li>No UI theme or color control</li>
              <li>Resale not permitted</li>
              <li>Email-only support</li>
            </ul>
            <button className="mt-4 bg-yellow-500 text-black font-semibold py-1 px-4 rounded hover:bg-yellow-600 transition">
              Get White Label Basic
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-yellow-500 rounded p-6 text-black">
            <h3 className="font-bold mb-3">$549</h3>
            <ul className="text-yellow-900 text-sm list-disc pl-5 space-y-1">
              <li>All Basic features</li>
              <li>Unlimited audit reports</li>
              <li>Custom domain (yourcustom.com)</li>
              <li>Full UI theme & styling control</li>
              <li>Priority support</li>
              <li>Resale not permitted</li>
            </ul>
            <button className="mt-4 bg-yellow-600 text-black font-semibold py-1 px-4 rounded hover:bg-yellow-700 transition">
              Get White Label Premium
            </button>
          </div>

          {/* Commercial License */}
          <div className="bg-yellow-900 rounded p-6">
            <h3 className="font-bold mb-3">$950</h3>
            <ul className="text-yellow-400 text-sm list-disc pl-5 space-y-1">
              <li>Unlimited audit reports</li>
              <li>API access</li>
              <li>Revenue-ready license (you can resell)</li>
              <li>Dedicated onboarding + training</li>
              <li>White-label platform + custom domain</li>
              <li>Full support</li>
            </ul>
            <button className="mt-4 bg-yellow-500 text-black font-semibold py-1 px-4 rounded hover:bg-yellow-600 transition">
              Apply for Enterprise Access
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Call To Action */}
      <section className="mt-16 mb-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-yellow-400 font-semibold mb-4">Not Sure Which Plan Fits You Best?</h2>
        <div className="flex justify-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
            Take the 30-Second Quiz
          </button>
          <button className="bg-yellow-900 hover:bg-yellow-700 text-yellow-400 font-semibold py-2 px-6 rounded border border-yellow-400 transition">
            Book a Cluck Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-yellow-400 text-center text-xs mb-8">
        <p>support@8milesniper.com</p>
        <p>+61 444 513 480</p>
        <p>© 2025 8 Mile Sniper. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
