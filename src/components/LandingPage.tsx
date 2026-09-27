import React, { useState } from 'react';
import {
  ArrowRight,
  Mic,
  ChevronDown,
  UserCheck,
  Briefcase,
  UploadCloud,
  Phone,
  Calendar,
  Sparkles,
  X,
  Send,
} from 'lucide-react';
import { StaffingBeesLogo } from './HoneyBeeLogo';

interface LandingPageProps {
  onOpenAgentLogin: () => void;
  onOpenCandidateLogin: () => void;
  onExploreJobs?: () => void;
  onOpenAdmin?: () => void;
}

interface ChatStep {
  step: 'role' | 'resume' | 'contact' | 'availability' | 'handoff';
  role?: string;
  resumeFileName?: string;
  phoneOrEmail?: string;
  availability?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAgentLogin,
  onOpenCandidateLogin,
  onExploreJobs,
  onOpenAdmin,
}) => {
  const [query, setQuery] = useState('');
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isChatIntakeOpen, setIsChatIntakeOpen] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep['step']>('role');
  const [chatData, setChatData] = useState<ChatStep>({ step: 'role' });
  const [chatInput, setChatInput] = useState('');

  const handleStartIntake = (initialText: string) => {
    setQuery(initialText);
    setChatData({ step: 'role', role: initialText });
    setChatStep('resume');
    setIsChatIntakeOpen(true);
  };

  const handleChatNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() && chatStep !== 'resume') return;

    if (chatStep === 'role') {
      setChatData((prev) => ({ ...prev, role: chatInput }));
      setChatStep('resume');
      setChatInput('');
    } else if (chatStep === 'resume') {
      setChatData((prev) => ({ ...prev, resumeFileName: chatInput || 'Candidate_Resume.pdf' }));
      setChatStep('contact');
      setChatInput('');
    } else if (chatStep === 'contact') {
      setChatData((prev) => ({ ...prev, phoneOrEmail: chatInput }));
      setChatStep('availability');
      setChatInput('');
    } else if (chatStep === 'availability') {
      setChatData((prev) => ({ ...prev, availability: chatInput }));
      setChatStep('handoff');
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white text-gray-900 flex flex-col justify-between font-sans select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="w-full px-6 sm:px-12 py-5 flex items-center justify-between relative z-30">
        {/* Top-Left: StaffingBees Logo */}
        <div className="flex items-center cursor-pointer">
          <StaffingBeesLogo size="xl" theme="light" showIcon={false} />
        </div>

        {/* Top-Right: Agent Login Dropdown (PRD Section 6) */}
        <div className="relative z-40">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="agent-login-btn"
              onClick={() => setShowLoginDropdown(!showLoginDropdown)}
              className="flex items-center space-x-1.5 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-lg text-xs font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs cursor-pointer select-none"
            >
              <span>Login</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {showLoginDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Select Portal Access
              </div>
              <button
                onClick={() => {
                  setShowLoginDropdown(false);
                  onOpenAgentLogin();
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-amber-50/70 text-gray-800 hover:text-amber-900 flex items-center space-x-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                  🐝
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Agent Login</div>
                  <div className="text-[10px] text-gray-500">Certified & Approved Agents</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowLoginDropdown(false);
                  onOpenCandidateLogin();
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50/70 text-gray-800 hover:text-blue-900 flex items-center space-x-2.5 transition-colors cursor-pointer border-t border-gray-50"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Candidate Login</div>
                  <div className="text-[10px] text-gray-500">Self-service, credits & status</div>
                </div>
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setShowLoginDropdown(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-3.5 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 flex items-center space-x-2 transition-colors cursor-pointer border-t border-gray-100 text-[11px]"
                >
                  <span>Admin Review Queue</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Center Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-12">
        <div className="w-full max-w-2xl flex flex-col items-center text-center">
          {/* Main Heading matching screenshot */}
          <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#111827] tracking-tight leading-snug mb-7 max-w-xl">
            Hi, Tell us what you are looking for, we will connect to the right person
          </h1>

          {/* Large Search / Chat Intake Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handleStartIntake(query);
            }}
            className="w-full max-w-[580px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-200/90 flex items-center pl-6 pr-2.5 py-2.5 transition-all focus-within:shadow-[0_4px_30px_rgba(0,0,0,0.1)] focus-within:border-gray-300"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I'm looking for a Java Developer job in Dallas..."
              className="w-full text-gray-800 placeholder-gray-400 text-sm outline-none bg-transparent pr-3"
            />

            <div className="flex items-center space-x-1.5 shrink-0">
              {/* Mic Icon per PRD Section 6 */}
              <button
                type="button"
                onClick={() => setQuery("Senior DevOps Engineer with AWS & Kubernetes")}
                title="Voice / Mic Input"
                className="w-7 h-7 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>

              {/* Dark circular submit button with right arrow / send */}
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#111827] hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Quick-action chips (PRD Section 6) */}
          <div className="mt-4 flex items-center justify-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleStartIntake("I'm looking for a job")}
              className="px-4 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-normal transition-colors cursor-pointer shadow-2xs"
            >
              I'm looking for a job
            </button>

            <button
              type="button"
              onClick={() => handleStartIntake("I need help with my resume")}
              className="px-4 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-normal transition-colors cursor-pointer shadow-2xs"
            >
              Resume help
            </button>

            <button
              type="button"
              onClick={() => handleStartIntake("I need interview preparation help")}
              className="px-4 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 font-normal transition-colors cursor-pointer shadow-2xs"
            >
              Interview help
            </button>
          </div>
        </div>
      </main>

      {/* Subtle bottom buffer with PRD footer */}
      <footer className="w-full py-4 text-center text-[11px] text-gray-400 border-t border-gray-100 flex items-center justify-center space-x-6">
        <span>© 2026 Staffing Bees Inc. Certified-Agent VMS Staffing Platform</span>
        <button
          onClick={onOpenAgentLogin}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          Agent Portal
        </button>
        <button
          onClick={onOpenCandidateLogin}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          Candidate Self-Service
        </button>
      </footer>

      {/* Simulated Human-In-The-Loop Chat Intake Dialog (PRD Section 6) */}
      {isChatIntakeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsChatIntakeOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Chat header */}
            <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                🐝
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  StaffingBees Smart Intake
                </h3>
                <p className="text-[11px] text-gray-500">
                  Human-in-the-loop candidate screening & agent pairing
                </p>
              </div>
            </div>

            {/* Steps & Conversation Flow */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1 text-xs">
              {/* Bot Message 1 */}
              <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                <p className="font-semibold text-gray-900 mb-0.5">StaffingBees Assistant</p>
                <p>Hello! What target role or technology opportunity are you looking for?</p>
              </div>

              {/* User Step 1 */}
              {chatData.role && (
                <div className="ml-auto bg-[#1d4ed8] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                  <p>{chatData.role}</p>
                </div>
              )}

              {/* Bot Step 2: Resume */}
              {chatStep !== 'role' && (
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] space-y-2">
                  <p className="font-semibold text-gray-900">StaffingBees Assistant</p>
                  <p>Great! Do you have a resume or LinkedIn profile URL to share with our certified recruiters?</p>
                  {chatStep === 'resume' && (
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setChatData((prev) => ({ ...prev, resumeFileName: 'Rahul_Sharma_Resume.pdf' }));
                          setChatStep('contact');
                        }}
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-[11px] font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-1 cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                        <span>Upload Resume.pdf</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setChatData((prev) => ({ ...prev, resumeFileName: 'Skip / Direct Entry' }));
                          setChatStep('contact');
                        }}
                        className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-[11px] cursor-pointer"
                      >
                        Skip for now
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* User Step 2 */}
              {chatData.resumeFileName && (
                <div className="ml-auto bg-[#1d4ed8] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                  <p>Resume: {chatData.resumeFileName}</p>
                </div>
              )}

              {/* Bot Step 3: Contact */}
              {chatStep !== 'role' && chatStep !== 'resume' && (
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                  <p className="font-semibold text-gray-900">StaffingBees Assistant</p>
                  <p>What is your best phone number or email so our assigned agent can follow up?</p>
                </div>
              )}

              {/* User Step 3 */}
              {chatData.phoneOrEmail && (
                <div className="ml-auto bg-[#1d4ed8] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                  <p>{chatData.phoneOrEmail}</p>
                </div>
              )}

              {/* Bot Step 4: Availability */}
              {chatStep === 'availability' && (
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] space-y-2">
                  <p className="font-semibold text-gray-900">StaffingBees Assistant</p>
                  <p>When are you available to start or interview?</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Immediately', '2 Weeks Notice', '30 Days', 'Exploring Options'].map((avail) => (
                      <button
                        key={avail}
                        type="button"
                        onClick={() => {
                          setChatData((prev) => ({ ...prev, availability: avail }));
                          setChatStep('handoff');
                        }}
                        className="px-2.5 py-1 bg-white border border-gray-300 rounded-md text-[11px] text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        {avail}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* User Step 4 */}
              {chatData.availability && (
                <div className="ml-auto bg-[#1d4ed8] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                  <p>Availability: {chatData.availability}</p>
                </div>
              )}

              {/* Final Hand-off to Named Certified Agent (PRD Section 6) */}
              {chatStep === 'handoff' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-xl space-y-2.5 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Handoff to Certified Agent</span>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-900">
                    Your profile has been matched and routed to{' '}
                    <strong className="text-emerald-950">Harika Reddy (AGT-001)</strong>, Senior Certified Staffing Professional.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-emerald-100 text-[11px] text-gray-700 space-y-1">
                    <div><strong>Specialty:</strong> Cloud & Frontend Engineering</div>
                    <div><strong>Email:</strong> harika@staffingbees.com</div>
                    <div><strong>Status:</strong> Reviewing profile for active client openings at Apex Cloud Systems.</div>
                  </div>
                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setIsChatIntakeOpen(false);
                        onOpenCandidateLogin();
                      }}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-sm transition-colors"
                    >
                      Candidate Portal Login
                    </button>
                    <button
                      onClick={() => {
                        setIsChatIntakeOpen(false);
                        onOpenAgentLogin();
                      }}
                      className="px-3 py-2 bg-white border border-emerald-300 text-emerald-800 font-medium rounded-lg text-xs cursor-pointer hover:bg-emerald-100/50"
                    >
                      Agent Portal View
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input area if not handoff */}
            {chatStep !== 'handoff' && (
              <form onSubmit={handleChatNext} className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    chatStep === 'role'
                      ? 'e.g. Senior Java Developer...'
                      : chatStep === 'contact'
                      ? 'e.g. rahul@example.com or +1 415-555-0199...'
                      : 'Type your answer...'
                  }
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] bg-gray-50 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg cursor-pointer text-xs font-semibold flex items-center space-x-1"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
