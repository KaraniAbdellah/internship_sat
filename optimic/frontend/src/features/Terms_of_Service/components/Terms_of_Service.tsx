import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-slate-700">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#ff1d00] bg-slate-100 hover:bg-slate-200/60 px-4 py-2 rounded-full transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <span className="block w-max text-[#ff1d00] text-xs font-bold tracking-widest uppercase bg-[#ff1d00]/10 px-3 py-1 rounded-full border border-[#ff1d00]/20">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
          Terms of Service
        </h1>
        <p className="text-slate-500 text-sm">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Optimic, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our collaborative multi-agent AI marketing services, platform, or website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">2. Description of Service</h2>
          <p>
            Optimic provides customer behavior tracking and context-aware marketing offer generation using collaborative multi-agent AI models. We integrate with your existing databases and APIs to score profiles and optimize campaign conversions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">3. User Accounts and Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account login details and for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breaches.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">4. Privacy and Data Protection</h2>
          <p>
            Your use of Optimic is also governed by our Privacy Policy. Designed with privacy in mind, our system integrates directly into your existing infrastructure, ensuring customer records and workflows remain secure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">5. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the platform after any modifications indicates your acceptance of the updated terms of service.
          </p>
        </div>
      </div>
    </section>
  );
}
