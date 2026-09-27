import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  BookOpen,
  Coins,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  HelpCircle,
  LogOut,
  Calendar,
  MessageSquare,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { StaffingBeesLogo } from './HoneyBeeLogo';
import { Candidate, CandidateOfferedService } from '../types';

interface CandidatePortalProps {
  candidate: Candidate;
  onLogout: () => void;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({
  candidate,
  onLogout,
}) => {
  const [creditBalance, setCreditBalance] = useState(candidate.credits || 350);
  const [ledger, setLedger] = useState(
    candidate.creditLedger || [
      { id: 'c-l1', date: 'Sep 25, 2026', description: 'Peer Mock Interview Coaching session', amount: 50, balance: 350 },
      { id: 'c-l2', date: 'Sep 20, 2026', description: 'Resume Review provided to Junior Dev', amount: 30, balance: 300 },
      { id: 'c-l3', date: 'Sep 01, 2026', description: 'StaffingBees Candidate Welcome Credits', amount: 270, balance: 270 },
    ]
  );

  const [offeredServices, setOfferedServices] = useState<CandidateOfferedService[]>(
    candidate.offeredServices || [
      {
        id: 'os-1',
        name: 'Peer Mock Technical Interview (React/Frontend)',
        description: '45-min live coding interview with behavioral and system critique',
        creditsPerSession: 50,
        active: true,
        sessionsCompleted: 4,
      },
      {
        id: 'os-2',
        name: 'Resume & Portfolio Feedback',
        description: 'Comprehensive line-by-line developer resume audit',
        creditsPerSession: 30,
        active: true,
        sessionsCompleted: 7,
      },
    ]
  );

  const [assignedCourses, setAssignedCourses] = useState(
    candidate.assignedCourses || [
      {
        id: 'ac-1',
        name: 'Advanced React Architecture & Performance Optimization',
        status: 'Completed' as const,
        assignedDate: 'Sep 10, 2026',
        completionDate: 'Sep 20, 2026',
      },
      {
        id: 'ac-2',
        name: 'Client Video Interview Mastery for Enterprise Roles',
        status: 'In Progress' as const,
        assignedDate: 'Sep 21, 2026',
      },
      {
        id: 'ac-3',
        name: 'Micro-Frontend & System Design Patterns',
        status: 'Not Started' as const,
        assignedDate: 'Sep 24, 2026',
      },
    ]
  );

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceCredits, setNewServiceCredits] = useState(40);
  const [showAgentContactModal, setShowAgentContactModal] = useState(false);
  const [agentMessageText, setAgentMessageText] = useState('');
  const [agentMessageSent, setAgentMessageSent] = useState(false);

  const toggleServiceActive = (id: string) => {
    setOfferedServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newService: CandidateOfferedService = {
      id: `os-${Date.now()}`,
      name: newServiceName,
      description: newServiceDesc || 'Peer coaching and mentorship session',
      creditsPerSession: newServiceCredits,
      active: true,
      sessionsCompleted: 0,
    };

    setOfferedServices([newService, ...offeredServices]);
    setNewServiceName('');
    setNewServiceDesc('');
    setShowAddServiceModal(false);
  };

  const handleSendAgentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentMessageText.trim()) return;
    setAgentMessageSent(true);
    setTimeout(() => {
      setAgentMessageSent(false);
      setShowAgentContactModal(false);
      setAgentMessageText('');
    }, 1500);
  };

  // Determine current job status
  const currentJob = candidate.currentJob || {
    isEmployed: true,
    role: 'Senior Frontend Developer',
    client: 'Apex Cloud Systems',
    startDate: 'Sep 26, 2026',
    status: 'Active' as const,
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-gray-800 font-sans select-none flex flex-col">
      {/* Top Header */}
      <header className="bg-[#0f172a] text-white px-6 py-3 flex items-center justify-between border-b border-gray-800 shrink-0">
        <div className="flex items-center space-x-4">
          <StaffingBeesLogo size="md" theme="dark" showIcon={true} />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-300 text-[11px] font-medium border border-blue-700/50">
            Candidate Self-Service Portal
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          {/* Credit balance badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full font-medium">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{creditBalance} Credits</span>
          </div>

          {/* Profile snippet */}
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {candidate.name.charAt(0)}
            </div>
            <span className="font-semibold text-white hidden md:inline">{candidate.name}</span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            title="Log Out"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Single Page Content (PRD Section 9) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Top Hero Banner: Candidate Profile & CPI Score */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900">{candidate.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                  {candidate.status || 'Active'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-medium">
                  {candidate.id}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {candidate.currentRole} • {candidate.location} • {candidate.email} • {candidate.phone}
              </p>
            </div>
          </div>

          {/* CPI Score Card (PRD Section 9 & 20) */}
          <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-tight">CPI</span>
              <span className="text-base font-extrabold leading-none">{candidate.cpiScore || 88}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-amber-950">
                Candidate Performance Index
              </div>
              <div className="text-[11px] text-amber-800">
                Status: <strong className="text-emerald-700">Market Ready</strong>
              </div>
              <div className="text-[10px] text-gray-500">
                Scored by certified agent • High client match fit
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left Column (Agent Card & Current Job), Right Column (Assigned Training & Services) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (1/3 width) */}
          <div className="space-y-6">
            {/* Assigned Agent Contact Card (PRD Section 9) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Assigned Staffing Agent
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-semibold">
                  Certified SB-CSP
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {candidate.currentAssignedAgent.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {candidate.currentAssignedAgent}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Original Source: <span className="font-medium text-gray-700">{candidate.originalSourceAgent}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>harika@staffingbees.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>+1 (415) 890-1234</span>
                </div>
              </div>

              <button
                onClick={() => setShowAgentContactModal(true)}
                className="w-full py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Assigned Agent</span>
              </button>
            </div>

            {/* Current Job Card (PRD Section 9) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Current Engagement
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    currentJob.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {currentJob.status === 'Active' ? 'Active Onboarded' : 'Engagement Ended'}
                </span>
              </div>

              {currentJob.status === 'Active' ? (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                    <div className="font-bold text-emerald-950 text-sm">{currentJob.role}</div>
                    <div className="text-emerald-800 font-medium">Client: {currentJob.client}</div>
                    <div className="text-[11px] text-emerald-700 flex items-center space-x-1 pt-1">
                      <Calendar className="w-3 h-3" />
                      <span>Started on {currentJob.startDate}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Timesheets and milestone billing managed by StaffingBees VMS.
                  </p>
                </div>
              ) : (
                /* PRD Requirement: if ended, show reason and prompt to re-engage agent */
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                    <div className="font-bold text-amber-950">Contract Completed</div>
                    <div className="text-[11px] text-amber-900">
                      End Reason: {currentJob.endReason || 'Scheduled project delivery milestone met.'}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-900 space-y-2">
                    <p className="text-[11px] font-medium leading-relaxed">
                      Your previous contract ended. Re-engage your certified agent to explore new client requisitions or assign refresh training!
                    </p>
                    <button
                      onClick={() => setShowAgentContactModal(true)}
                      className="px-3 py-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[11px] font-semibold rounded-md shadow-xs cursor-pointer"
                    >
                      Re-engage Agent for New Roles →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Credit Balance & Recent Ledger (PRD Section 9 & 10) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Credit Wallet & Ledger
                </span>
                <span className="text-sm font-extrabold text-amber-600 flex items-center space-x-1">
                  <Coins className="w-4 h-4" />
                  <span>{creditBalance}</span>
                </span>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed">
                Earn credits by offering peer mock interviews and spend credits on premium certifications or mock drills.
              </p>

              <div className="space-y-2 pt-1">
                {ledger.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">{item.description}</div>
                      <div className="text-[10px] text-gray-400">{item.date}</div>
                    </div>
                    <span
                      className={`font-bold ${
                        item.amount > 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {item.amount > 0 ? `+${item.amount}` : item.amount} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assigned Courses & Training (PRD Section 9) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    Courses & Training Assigned by Agent
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Curated by {candidate.currentAssignedAgent} to boost CPI and client pass rates
                  </p>
                </div>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Opening full StaffingBees certification catalog.');
                  }}
                  className="text-xs text-[#1d4ed8] hover:underline flex items-center space-x-1 font-medium cursor-pointer"
                >
                  <span>Full Course Catalog</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2.5">
                {assignedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          course.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : course.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{course.name}</div>
                        <div className="text-[11px] text-gray-500">
                          Assigned: {course.assignedDate}{' '}
                          {course.completionDate && `• Completed: ${course.completionDate}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          course.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : course.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer a Service to Earn Credits Panel (PRD Section 9) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h2 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                    <span>Offer a Service to Earn Credits</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold">
                      Credit Economy
                    </span>
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Provide peer mock interviews or resume coaching to other candidates to earn credit rewards
                  </p>
                </div>

                <button
                  onClick={() => setShowAddServiceModal(true)}
                  className="px-3 py-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg flex items-center space-x-1 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Offer New Service</span>
                </button>
              </div>

              <div className="space-y-3">
                {offeredServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center justify-between text-xs gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">{svc.name}</span>
                        <span className="px-2 py-0.2 bg-amber-100 text-amber-800 rounded font-semibold text-[10px]">
                          +{svc.creditsPerSession} Credits / session
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{svc.description}</p>
                      <div className="text-[10px] text-gray-400 font-medium">
                        Completed Sessions: {svc.sessionsCompleted}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <button
                        onClick={() => toggleServiceActive(svc.id)}
                        className="flex items-center space-x-1.5 cursor-pointer text-xs font-medium"
                      >
                        {svc.active ? (
                          <div className="flex items-center space-x-1 text-emerald-600">
                            <ToggleRight className="w-6 h-6 text-emerald-600" />
                            <span>Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-gray-400">
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                            <span>Paused</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submitted Requirements Table (PRD Section 9) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
              <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    My Submitted Requirements
                  </h2>
                  <p className="text-[11px] text-gray-500">
                    Track the live VMS interview stage and client submissions managed by your agent
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/80">
                      <th className="py-2.5 px-3">Requisition</th>
                      <th className="py-2.5 px-3">Client</th>
                      <th className="py-2.5 px-3">Submitted By</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Current Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3 px-3 font-semibold text-gray-900">
                        Senior Frontend Developer
                      </td>
                      <td className="py-3 px-3 text-gray-700">Apex Cloud Systems</td>
                      <td className="py-3 px-3 text-gray-600">{candidate.currentAssignedAgent}</td>
                      <td className="py-3 px-3 text-gray-500">Sep 22, 2026</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                          Client Screening Passed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3 px-3 font-semibold text-gray-900">
                        React Architect
                      </td>
                      <td className="py-3 px-3 text-gray-700">NovaTech Solutions</td>
                      <td className="py-3 px-3 text-gray-600">{candidate.originalSourceAgent}</td>
                      <td className="py-3 px-3 text-gray-500">Sep 15, 2026</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
                          Interview Scheduled
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900">Offer a Peer Service</h3>
            <form onSubmit={handleAddService} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. System Design Mock Interview"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Briefly describe what candidates will learn..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Credits to Earn Per Session
                </label>
                <input
                  type="number"
                  min={10}
                  max={200}
                  value={newServiceCredits}
                  onChange={(e) => setNewServiceCredits(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold"
                >
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Agent Modal */}
      {showAgentContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Message {candidate.currentAssignedAgent}
            </h3>
            {agentMessageSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="font-bold">Message Delivered!</div>
                <div className="text-[11px]">Your agent will reply via your registered email or phone.</div>
              </div>
            ) : (
              <form onSubmit={handleSendAgentMessage} className="space-y-3 text-xs">
                <textarea
                  rows={4}
                  required
                  value={agentMessageText}
                  onChange={(e) => setAgentMessageText(e.target.value)}
                  placeholder="Ask a question about your submissions, request training, or discuss upcoming interviews..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAgentContactModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold flex items-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
