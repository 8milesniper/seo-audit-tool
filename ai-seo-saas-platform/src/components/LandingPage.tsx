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
        <p className="mt-1 text-xs italic">Audited over 1500 sites - Results in minutes</p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition">
            Start Free SEO & AI Analysis
          </button>
          <button className="bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-2 px-6 rounded transition border border-yellow-400">
            Get the Full Audit – $47
          </button>
        </div>
      </header>

      {/* Why We're The Only Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-center text-yellow-400 font-semibold mb-6">
          Why We're the ONLY Choice for 2025
        </h2>
        <div className="flex flex-col md:flex-row md:justify-center md:gap-12">
          <ul className="space-y-2 text-sm md:w-1/2 list-disc list-inside">
            <li>Full 2025 AI Search Analysis</li>
            <li>SEO + Structured Schema Checks</li>
            <li>ChatGPT & LLM Content Optimization</li>
            <li>Voice Search Readiness</li>
            <li>EEAT + Trust Factor Scoring</li>
            <li>Delivered as Live, Shareable Report Link</li>
            <li>Branded Report Experience</li>
            <li>Results in Minutes</li>
          </ul>
          <div className="bg-yellow-500 w-48 h-48 rounded-lg flex items-center justify-center mt-8 md:mt-0 md:w-60 md:h-60">
            <span className="text-black font-bold">AI-Powered Report Preview</span>
          </div>
        </div>
      </section>

      {/* Smarter SEO Starts Here */}
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <h3 className="mb-8 font-semibold">Smarter SEO Starts Here</h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-6 max-w-xl mx-auto">
          {[
            { icon: "🤖", label: "AI-Powered SEO Engine" },
            { icon: "📊", label: "150+ SEO/AI Ranking Factors" },
            { icon: "💬", label: "LLM & ChatGPT Optimization" },
            { icon: "🎤", label: "Voice Search Scoring" },
            { icon: "⭐", label: "EEAT + Trust Analysis" },
            { icon: "✅", label: "Structured Data Validation" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="bg-[#222f44] rounded-lg p-4 flex flex-col items-center justify-center text-xs"
            >
              <span className="text-3xl mb-2">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Every Audit Includes */}
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <h3 className="mb-8 font-semibold">Every Audit Includes</h3>
        <ul className="inline-block text-left space-y-2 text-sm max-w-md mx-auto border border-yellow-600 rounded p-6">
          {[
            "SEO + AI Score (150+ points)",
            "ChatGPT & LLM Optimization Breakdown",
            "Custom Action Plan",
            "Shareable Downloadable Report Link",
            "Built-in Upgrade Option",
            "Delivered in Minutes",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <FaCheckCircle className="text-yellow-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Scale With White Label Access */}
      <section className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <h3 className="mb-8 font-semibold">Scale With White Label Access</h3>
        <p className="mb-8 text-sm max-w-md mx-auto">
          Launch your own branded AI SEO audit platform instantly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* White Label Basic */}
          <div className="bg-[#222f44] p-6 rounded-lg text-left">
            <h4 className="font-bold mb-4">WHITE LABEL BASIC</h4>
            <p className="text-2xl font-extrabold mb-6">$349</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Use your logo, platform name, and branding
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Unlimited audit reports
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Shareable live report links
              </li>
              <li className="flex items-center gap-2 text-red-500">
                No custom domain (you.8milesniper.com only)
              </li>
              <li className="flex items-center gap-2 text-red-500">
                No UI theme or color control
              </li>
              <li className="flex items-center gap-2 text-red-500">
                Resale not permitted
              </li>
              <li className="flex items-center gap-2 text-red-500">
                Email-only support
              </li>
            </ul>
            <button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-black w-full py-2 rounded font-semibold transition">
              Get White Label Basic
            </button>
          </div>

          {/* White Label Premium */}
          <div className="bg-[#222f44] p-6 rounded-lg text-left">
            <h4 className="font-bold mb-4">WHITE LABEL PREMIUM</h4>
            <p className="text-2xl font-extrabold mb-6">$549</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                All Basic features
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Unlimited audit reports
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Custom domain (yourdomain.com)
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Full UI theme & styling control
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Priority support
              </li>
              <li className="flex items-center gap-2 text-red-500">
                Resale not permitted
              </li>
            </ul>
            <button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-black w-full py-2 rounded font-semibold transition">
              Get White Label Premium
            </button>
          </div>

          {/* Commercial License */}
          <div className="bg-[#222f44] p-6 rounded-lg text-left">
            <h4 className="font-bold mb-4">COMMERCIAL LICENSE</h4>
            <p className="text-2xl font-extrabold mb-6">$950</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Unlimited audit reports
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                API access
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Revenue-ready license (you can resell)
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Dedicated onboarding + training
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                White-label platform + custom domain
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Full support
              </li>
            </ul>
            <button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-black w-full py-2 rounded font-semibold transition">
              Apply for Enterprise Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-8 text-center text-xs text-gray-400 max-w-7xl mx-auto px-6">
        <p>
          support@8milesniper.com | +61 444 513 480
        </p>
        <p>© 2025 8 Mile Sniper. All rights reserved.</p>
        <p>
          <a href="#" className="underline hover:text-yellow-400">Terms</a> |{" "}
          <a href="#" className="underline hover:text-yellow-400">Privacy</a> |{" "}
          <a href="#" className="underline hover:text-yellow-400">Refund Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
