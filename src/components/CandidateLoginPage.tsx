import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, CheckCircle2, UserCheck, Sparkles, Briefcase } from 'lucide-react';
import { StaffingBeesLogo } from './HoneyBeeLogo';
import { Candidate } from '../types';
import { DEMO_CANDIDATES } from '../data/mockCandidates';

interface CandidateLoginPageProps {
  onLoginSuccess: (candidate: Candidate) => void;
  onBackToLanding: () => void;
  onSwitchToAgentLogin?: () => void;
}

export const CandidateLoginPage: React.FC<CandidateLoginPageProps> = ({
  onLoginSuccess,
  onBackToLanding,
  onSwitchToAgentLogin,
}) => {
  const [email, setEmail] = useState('rahul@email.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  // Flatten candidates
  const allCandidates = Object.values(DEMO_CANDIDATES).flat();

  const handleLogin = (e?: React.FormEvent, customCandidate?: Candidate) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (customCandidate) {
        onLoginSuccess(customCandidate);
        return;
      }

      const match = allCandidates.find(
        (c) => c.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (match) {
        onLoginSuccess(match);
      } else {
        // Fallback to Rahul Sharma
        onLoginSuccess(allCandidates[0]);
      }
    }, 350);
  };

  const handleQuickSelectCandidate = (candidate: Candidate) => {
    setEmail(candidate.email);
    setPassword('password123');
    handleLogin(undefined, candidate);
  };

  return (
    <div className="min-h-screen w-screen bg-[#f8fafc] text-gray-900 flex flex-col justify-between font-sans select-none p-4 sm:p-6">
      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBackToLanding}
          className="flex items-center space-x-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="cursor-pointer" onClick={onBackToLanding}>
          <StaffingBeesLogo size="lg" theme="light" showIcon={true} />
        </div>

        {onSwitchToAgentLogin && (
          <button
            onClick={onSwitchToAgentLogin}
            className="text-xs text-amber-700 hover:underline font-medium cursor-pointer"
          >
            Agent Portal Login →
          </button>
        )}
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200/80 p-7 sm:p-9">
          {/* Logo & Headings */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-100 shadow-xs">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
              Candidate Self-Service
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              Track your interview submissions, training courses, and credit balance.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Candidate Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@email.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-all bg-gray-50/50 focus:bg-white text-gray-800"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setResetMessage(true)}
                  className="text-[11px] text-[#1d4ed8] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] transition-all bg-gray-50/50 focus:bg-white text-gray-800"
                />
              </div>
            </div>

            {resetMessage && (
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Simulated Password Reset: Use default pre-filled sample password.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center space-x-1.5"
            >
              {isLoading ? (
                <span>Entering Candidate Portal...</span>
              ) : (
                <span>Sign in to Candidate Portal</span>
              )}
            </button>
          </form>

          {/* Divider & One-Click Demo Candidate Accounts (PRD Section 6) */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Sample Candidate Accounts
              </span>
              <span className="text-[10px] text-gray-400">PRD Samples</span>
            </div>

            <div className="space-y-2">
              {allCandidates.slice(0, 3).map((candidate) => (
                <button
                  key={candidate.id}
                  type="button"
                  onClick={() => handleQuickSelectCandidate(candidate)}
                  className="w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-900 flex items-center space-x-1.5">
                        <span>{candidate.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-normal">
                          CPI: {candidate.cpiScore || 85}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {candidate.currentRole} • {candidate.email}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    Sign in →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-[11px] text-gray-400 py-2">
        © 2026 StaffingBees Inc. Candidate Self-Service & Talent Cloud
      </footer>
    </div>
  );
};
