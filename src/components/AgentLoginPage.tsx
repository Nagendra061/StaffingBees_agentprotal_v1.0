import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, CheckCircle2, ShieldCheck, Clock, Briefcase } from 'lucide-react';
import { StaffingBeesLogo } from './HoneyBeeLogo';
import { Agent } from '../types';
import { INITIAL_AGENTS } from '../data/platformData';

interface AgentLoginPageProps {
  onLoginSuccess: (agent: Agent) => void;
  onBackToLanding: () => void;
  onSwitchToCandidateLogin?: () => void;
}

export const AgentLoginPage: React.FC<AgentLoginPageProps> = ({
  onLoginSuccess,
  onBackToLanding,
  onSwitchToCandidateLogin,
}) => {
  const [userId, setUserId] = useState('AGT-001');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e?: React.FormEvent, customAgent?: Agent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      if (customAgent) {
        onLoginSuccess(customAgent);
        return;
      }

      const match = INITIAL_AGENTS.find(
        (a) =>
          (a.id.toLowerCase() === userId.trim().toLowerCase() ||
            a.email.toLowerCase() === userId.trim().toLowerCase()) &&
          (password === 'password123' || password === a.password)
      );

      if (match) {
        onLoginSuccess(match);
      } else {
        // Fallback to Harika Reddy
        const fallback = INITIAL_AGENTS[0];
        onLoginSuccess(fallback);
      }
    }, 350);
  };

  const handleQuickSelectAgent = (agent: Agent) => {
    setUserId(agent.id);
    setPassword(agent.password || 'password123');
    handleLogin(undefined, agent);
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

        {onSwitchToCandidateLogin && (
          <button
            onClick={onSwitchToCandidateLogin}
            className="text-xs text-[#1d4ed8] hover:underline font-medium cursor-pointer"
          >
            Candidate Login →
          </button>
        )}
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200/80 p-7 sm:p-9">
          {/* Logo & Headings */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <StaffingBeesLogo size="xl" theme="light" showIcon={true} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
              Agent Portal Login
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              Sign in with your Agent ID or certified StaffingBees credentials.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Agent ID or Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="AGT-001 or harika@staffingbees.com"
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
                <span>Simulated Password Reset: Use demo password "password123".</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center space-x-1.5"
            >
              {isLoading ? <span>Authenticating...</span> : <span>Login to Agent Home</span>}
            </button>
          </form>

          {/* Divider & One-Click Demo Sign-in Accounts (PRD Section 6 & 12 US-1) */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                One-Click Demo Personas
              </span>
              <span className="text-[10px] text-gray-400">PRD Personas</span>
            </div>

            <div className="space-y-2">
              {/* Persona 1: Harika Reddy AGT-001 (Full Certified) */}
              <button
                type="button"
                onClick={() => handleQuickSelectAgent(INITIAL_AGENTS[0])}
                className="w-full p-2.5 rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    HR
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 group-hover:text-amber-900 flex items-center space-x-1.5">
                      <span>Harika Reddy</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-normal">
                        Certified
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      ID: AGT-001 • Full Access • 1,250 Credits
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-amber-600 group-hover:translate-x-0.5 transition-transform">
                  Sign in →
                </span>
              </button>

              {/* Persona 2: Ravi Chandra AGT-004 (Licence-Pending) */}
              <button
                type="button"
                onClick={() => handleQuickSelectAgent(INITIAL_AGENTS[2])}
                className="w-full p-2.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    RC
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-900 flex items-center space-x-1.5">
                      <span>Ravi Chandra</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-normal flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Licence-Pending</span>
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      ID: AGT-004 • SB-CSP Course Checklist
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  Sign in →
                </span>
              </button>

              {/* Persona 3: Rakesh Singh AGT-002 (Client Sales) */}
              <button
                type="button"
                onClick={() => handleQuickSelectAgent(INITIAL_AGENTS[1])}
                className="w-full p-2.5 rounded-lg border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    RS
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 group-hover:text-indigo-900 flex items-center space-x-1.5">
                      <span>Rakesh Singh</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded font-normal">
                        Client Sales
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      ID: AGT-002 • Enterprise Clients & MSAs
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  Sign in →
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-[11px] text-gray-400 py-2">
        © 2026 StaffingBees Inc. Certified Staffing Professional (SB-CSP) Network
      </footer>
    </div>
  );
};
