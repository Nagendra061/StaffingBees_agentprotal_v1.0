import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Award,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { AgentReferral, Agent } from '../types';

interface MyAgentReferralsViewProps {
  referrals: AgentReferral[];
  currentAgent: Agent;
  onAddReferral: (referral: AgentReferral) => void;
}

export const MyAgentReferralsView: React.FC<MyAgentReferralsViewProps> = ({
  referrals,
  currentAgent,
  onAddReferral,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'add'>('list');

  // Form state for Refer an Agent
  const [candidateAgentName, setCandidateAgentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState(4);
  const [capabilities, setCapabilities] = useState('Technical Sourcing, Candidate Screening');
  const [summary, setSummary] = useState('');

  // Agent referrals scoped to current agent
  const myReferrals = referrals.filter(
    (r) => r.referringAgentId === currentAgent.id || r.referringAgentName === currentAgent.name
  );

  // Total counts (PRD Section 11 & US-10: with NO revenue figure shown!)
  const totalReferred = myReferrals.length;
  const totalCertified = myReferrals.filter((r) => r.status === 'certified').length;
  const totalPending = myReferrals.filter((r) => r.status === 'pending' || r.status === 'approved').length;
  const totalRejected = myReferrals.filter((r) => r.status === 'rejected').length;

  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateAgentName.trim()) return;

    const newRef: AgentReferral = {
      id: `REF-${Math.floor(100 + Math.random() * 900)}`,
      candidateAgentName,
      email,
      phone,
      location,
      experienceYears,
      capabilities: capabilities.split(',').map((s) => s.trim()),
      summary,
      referringAgentId: currentAgent.id,
      referringAgentName: currentAgent.name,
      submittedDate: 'Today',
      status: 'pending',
      adminNotes: 'Application submitted to StaffingBees Admin Review queue.',
    };

    onAddReferral(newRef);
    setViewMode('list');
    setCandidateAgentName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setSummary('');
  };

  // ================= VIEW: REFER AN AGENT FORM (FULL PAGE) =================
  if (viewMode === 'add') {
    return (
      <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <button
              onClick={() => setViewMode('list')}
              className="hover:text-gray-900 flex items-center space-x-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Agent Referrals</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-gray-900">Refer New Candidate Agent</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-xl font-bold text-gray-900">Refer a Candidate Agent</h1>
              <p className="text-xs text-gray-500">
                StaffingBees is an invite-only certified network. All applicants require nomination by an active Certified Agent.
              </p>
            </div>

            <form onSubmit={handleCreateReferral} className="space-y-6 text-xs">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                  1. Candidate Agent Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={candidateAgentName}
                      onChange={(e) => setCandidateAgentName(e.target.value)}
                      placeholder="e.g. Meera Iyer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="meera.iyer@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Direct Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (415) 555-0188"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Current Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Austin, TX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                  2. Experience & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Years of Staffing / Recruiting Experience
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Key Capabilities (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={capabilities}
                      onChange={(e) => setCapabilities(e.target.value)}
                      placeholder="Technical Sourcing, Client Acquisition, Executive Search"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Nomination Statement & Summary *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Provide context on why this agent is qualified to join the certified network..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold shadow-xs"
                >
                  Submit Referral Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW: REFERRAL TRACKING DASHBOARD =================
  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Agent Referrals</h1>
          <p className="text-xs text-gray-500">
            Referral-only agent network tracking: monitor referred, certified, pending, and rejected candidates
          </p>
        </div>
        <button
          onClick={() => setViewMode('add')}
          className="px-3.5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center space-x-1.5 cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Refer an Agent</span>
        </button>
      </div>

      {/* 4 Stat Cards: Total Referred, Certified, Pending, Rejected (NO REVENUE FIGURE SHOWN per PRD Section 11 & US-10) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            Total Referred
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{totalReferred}</div>
          <div className="text-[11px] text-gray-500 mt-1">Submitted applications</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
            Certified (Licensed)
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{totalCertified}</div>
          <div className="text-[11px] text-emerald-600 mt-1">SB-CSP Completed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">
            Pending / Coursework
          </div>
          <div className="text-2xl font-extrabold text-amber-700">{totalPending}</div>
          <div className="text-[11px] text-amber-600 mt-1">Review or Orientation</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-red-500 mb-1">
            Rejected
          </div>
          <div className="text-2xl font-extrabold text-gray-600">{totalRejected}</div>
          <div className="text-[11px] text-gray-400 mt-1">Declined by Admin</div>
        </div>
      </div>

      {/* Referrals List Table */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Nominated Agent Roster</h3>
          <span className="text-xs text-gray-400">Referred by {currentAgent.name}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                <th className="py-2.5 px-3">Candidate Agent</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Experience</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Admin Notes / Issued ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myReferrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-3">
                    <div className="font-bold text-gray-900">{ref.candidateAgentName}</div>
                    <div className="text-[10px] text-gray-400">{ref.location}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-600">
                    <div>{ref.email}</div>
                    <div className="text-[10px] text-gray-400">{ref.phone}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-700 font-medium">
                    {ref.experienceYears} Years
                  </td>
                  <td className="py-3 px-3 text-gray-500">{ref.submittedDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ref.status === 'certified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ref.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : ref.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-600 text-[11px]">
                    {ref.issuedAgentId && (
                      <span className="font-bold text-blue-700 mr-1">[{ref.issuedAgentId}]</span>
                    )}
                    {ref.adminNotes || 'Under admin review'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
