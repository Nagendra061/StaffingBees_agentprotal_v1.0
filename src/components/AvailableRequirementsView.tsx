import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Building,
  MapPin,
  Clock,
  UserCheck,
  Send,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Requirement, Candidate, SubmissionRecord, Agent } from '../types';
import { calculateAIMatchScore, calculateStaffingBeesFee } from '../utils/paymentEngine';

interface AvailableRequirementsViewProps {
  requirements: Requirement[];
  candidates: Candidate[];
  currentAgent: Agent;
  onSubmitCandidate: (submission: SubmissionRecord) => void;
  initialSelectedRequirement?: Requirement | null;
}

export const AvailableRequirementsView: React.FC<AvailableRequirementsViewProps> = ({
  requirements,
  candidates,
  currentAgent,
  onSubmitCandidate,
  initialSelectedRequirement,
}) => {
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(
    initialSelectedRequirement || null
  );
  const [filterMineOnly, setFilterMineOnly] = useState(false);
  const [agentFilter, setAgentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Screening state map: candidateId -> { matchPercent, matchedSkills, missingSkills }
  const [screeningResults, setScreeningResults] = useState<
    Record<string, { matchPercent: number; matchedSkills: string[]; missingSkills: string[] }>
  >({});

  // Submission preview state
  const [candidateToSubmit, setCandidateToSubmit] = useState<Candidate | null>(null);
  const [candidatePayRate, setCandidatePayRate] = useState(72);
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState('');

  // Filter requirements
  const filteredRequirements = requirements.filter((req) => {
    if (filterMineOnly && req.owningAgentId !== currentAgent.id) return false;
    if (agentFilter !== 'all' && req.owningAgentId !== agentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = req.jobTitle.toLowerCase().includes(q);
      const matchClient = req.clientName.toLowerCase().includes(q);
      const matchSkills = req.skillsNeeded.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchClient && !matchSkills) return false;
    }
    return true;
  });

  const handleScreenCandidate = (candidate: Candidate) => {
    if (!selectedReq) return;
    const candSkills = candidate.skills?.map((s) => s.name) || [candidate.currentRole];
    const result = calculateAIMatchScore(
      candSkills,
      selectedReq.skillsNeeded,
      candidate.cpiScore || 80
    );

    setScreeningResults((prev) => ({
      ...prev,
      [candidate.id]: result,
    }));
  };

  const handleOpenSubmitModal = (candidate: Candidate) => {
    setCandidateToSubmit(candidate);
    if (selectedReq?.engagementType === 'Contract') {
      // Default to 80% of client bill rate
      setCandidatePayRate(Math.round((selectedReq.clientBillRate || 90) * 0.8));
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq || !candidateToSubmit) return;

    let feeSummary = '';
    if (selectedReq.engagementType === 'Contract') {
      const calc = calculateStaffingBeesFee({
        type: 'Contract',
        candidateRate: candidatePayRate,
        clientRate: selectedReq.clientBillRate || 90,
      });
      feeSummary = calc.formattedSummary;
    } else {
      const calc = calculateStaffingBeesFee({
        type: 'Direct Placement',
        annualSalary: selectedReq.budgetedAnnualSalary || 150000,
        placementFeePercent: 20,
      });
      feeSummary = calc.formattedSummary;
    }

    const newSub: SubmissionRecord = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      candidateId: candidateToSubmit.id,
      candidateName: candidateToSubmit.name,
      requirementId: selectedReq.id,
      jobTitle: selectedReq.jobTitle,
      clientId: selectedReq.clientId,
      clientName: selectedReq.clientName,
      engagementType: selectedReq.engagementType,
      status: 'Submitted',
      submittedDate: 'Today',
      owningAgentId: currentAgent.id,
      owningAgentName: currentAgent.name,
      candidateRate: selectedReq.engagementType === 'Contract' ? candidatePayRate : undefined,
      clientRate: selectedReq.clientBillRate,
      annualSalary: selectedReq.budgetedAnnualSalary,
      placementFeePercent: 20,
      calculatedFee: feeSummary,
    };

    onSubmitCandidate(newSub);
    setSubmissionSuccessMsg(`Successfully submitted ${candidateToSubmit.name} for ${selectedReq.jobTitle}!`);
    setCandidateToSubmit(null);
    setTimeout(() => {
      setSubmissionSuccessMsg('');
    }, 4000);
  };

  // ================= VIEW: REQUIREMENT DETAIL & SCREENING =================
  if (selectedReq) {
    // Only market ready or eligible candidates
    const eligibleCandidates = candidates.filter(
      (c) => c.readiness === 'Market Ready' || c.stage === 'Screening' || c.status === 'Active'
    );

    return (
      <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedReq(null)}
              className="hover:text-gray-900 flex items-center space-x-1.5 text-xs text-gray-600 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Available Requirements Marketplace</span>
            </button>
          </div>

          {submissionSuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-semibold">{submissionSuccessMsg}</span>
            </div>
          )}

          {/* Requirement Detail Terms & Client Card (PRD Section 8) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-gray-900">{selectedReq.jobTitle}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    {selectedReq.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px]">
                    {selectedReq.engagementType}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center space-x-3">
                  <span className="font-semibold text-gray-800">{selectedReq.clientName}</span>
                  <span>•</span>
                  <span>{selectedReq.location}</span>
                  <span>•</span>
                  <span>Posted by: {selectedReq.owningAgentName}</span>
                </div>
              </div>

              {/* Rate & Margin Box */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-right">
                <div className="text-[10px] font-bold uppercase text-emerald-700">
                  {selectedReq.engagementType === 'Contract' ? 'Client Bill Rate' : 'Budgeted Salary'}
                </div>
                <div className="text-xl font-extrabold text-emerald-950">
                  {selectedReq.engagementType === 'Contract'
                    ? `$${selectedReq.clientBillRate}/hr`
                    : `$${(selectedReq.budgetedAnnualSalary || 0).toLocaleString()}`}
                </div>
                <div className="text-[10px] text-emerald-800">Single Payment Engine Applied</div>
              </div>
            </div>

            {/* Skills & Terms */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-gray-700 uppercase tracking-wider text-[11px]">
                Required Skills & Tech Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedReq.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-md font-medium text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {selectedReq.description && (
                <p className="text-gray-600 pt-2 leading-relaxed">{selectedReq.description}</p>
              )}
            </div>
          </div>

          {/* Agent's Market-Ready Candidates with 'Screen' & 'Submit' actions (PRD Section 8 & 12 US-5) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                  <span>Match Your Candidates Against This Requisition</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-900 rounded-full text-[10px] font-bold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>Deterministic AI Match %</span>
                  </span>
                </h3>
                <p className="text-[11px] text-gray-500">
                  Screens candidate skill overlap blended with Candidate Performance Index (CPI)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {eligibleCandidates.map((candidate) => {
                const screenResult = screeningResults[candidate.id];
                return (
                  <div
                    key={candidate.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-400 bg-gray-50/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900 text-sm">{candidate.name}</span>
                          <span className="px-2 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                            CPI {candidate.cpiScore || 85}
                          </span>
                          <span className="text-[10px] text-gray-400">{candidate.id}</span>
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {candidate.currentRole} • {candidate.location} • Source Agent:{' '}
                          <strong className="text-gray-700">{candidate.originalSourceAgent}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Screening Results badge or Screen Button */}
                    <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
                      {screenResult ? (
                        <div className="flex items-center space-x-2.5 bg-white px-3 py-1.5 rounded-lg border border-purple-200 shadow-2xs">
                          <div className="text-right">
                            <div className="text-xs font-bold text-purple-900">
                              {screenResult.matchPercent}% Match
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {screenResult.matchedSkills.length} skills verified
                            </div>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                              screenResult.matchPercent >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          >
                            {screenResult.matchPercent}%
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleScreenCandidate(candidate)}
                          className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Screen (AI Match %)</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleOpenSubmitModal(candidate)}
                        className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-xs cursor-pointer transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Submission Modal with Single Payment Engine Preview (PRD Section 10) */}
        {candidateToSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-900">
                Confirm Candidate Submission
              </h3>
              <p className="text-xs text-gray-500">
                Submitting <strong className="text-gray-900">{candidateToSubmit.name}</strong> for{' '}
                <strong className="text-gray-900">{selectedReq.jobTitle}</strong> at{' '}
                <strong className="text-gray-900">{selectedReq.clientName}</strong>.
              </p>

              <form onSubmit={handleConfirmSubmit} className="space-y-4 text-xs">
                {selectedReq.engagementType === 'Contract' ? (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Client Bill Rate:</span>
                      <span className="font-extrabold text-gray-900">
                        ${selectedReq.clientBillRate}/hr
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Candidate Hourly Pay Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        min={30}
                        max={selectedReq.clientBillRate || 100}
                        value={candidatePayRate}
                        onChange={(e) => setCandidatePayRate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                    </div>

                    {/* Live Fee Engine Preview (PRD Section 10) */}
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        StaffingBees Payment Engine Preview
                      </div>
                      <div className="font-bold text-sm mt-0.5">
                        {
                          calculateStaffingBeesFee({
                            type: 'Contract',
                            candidateRate: candidatePayRate,
                            clientRate: selectedReq.clientBillRate || 90,
                          }).formattedSummary
                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Annual Salary:</span>
                      <span className="font-extrabold text-gray-900">
                        ${(selectedReq.budgetedAnnualSalary || 150000).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Placement Fee %:</span>
                      <span className="font-extrabold text-gray-900">20%</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        StaffingBees Payment Engine Fee
                      </div>
                      <div className="font-bold text-sm mt-0.5">
                        {
                          calculateStaffingBeesFee({
                            type: 'Direct Placement',
                            annualSalary: selectedReq.budgetedAnnualSalary || 150000,
                            placementFeePercent: 20,
                          }).formattedSummary
                        }
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setCandidateToSubmit(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold shadow-xs"
                  >
                    Confirm & Submit to VMS
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= VIEW: REQUIREMENTS MARKETPLACE LIST =================
  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Available Requirements Marketplace</h1>
          <p className="text-xs text-gray-500">
            Platform-wide open requisitions across all certified agents ready for candidate submission
          </p>
        </div>
      </div>

      {/* Filter & Search Bar (PRD Section 8 & 12 US-4) */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, client name, or required skill (e.g. React, Kubernetes)..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Mine only toggle */}
          <label className="flex items-center space-x-2 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={filterMineOnly}
              onChange={(e) => setFilterMineOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold text-gray-700">My Requirements Only</span>
          </label>

          {/* Filter by agent */}
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white font-medium text-gray-700"
          >
            <option value="all">All Agents</option>
            <option value="AGT-001">Harika Reddy (AGT-001)</option>
            <option value="AGT-002">Rakesh Singh (AGT-002)</option>
          </select>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-3">
        {filteredRequirements.map((req) => (
          <div
            key={req.id}
            onClick={() => setSelectedReq(req)}
            className="bg-white p-5 rounded-2xl border border-gray-200/90 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2.5">
                <span className="font-bold text-gray-900 text-base hover:text-emerald-700">
                  {req.jobTitle}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-[10px]">
                  {req.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px]">
                  {req.engagementType}
                </span>
              </div>

              <div className="text-xs text-gray-500 flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{req.clientName}</span>
                <span>•</span>
                <span>{req.location}</span>
                <span>•</span>
                <span>Posted by {req.owningAgentName}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {req.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right shrink-0 space-y-1">
              <div className="text-base font-extrabold text-emerald-700">
                {req.engagementType === 'Contract'
                  ? `$${req.clientBillRate}/hr`
                  : `$${(req.budgetedAnnualSalary || 0).toLocaleString()}`}
              </div>
              <span className="inline-block px-3 py-1 bg-[#1d4ed8] text-white rounded-lg font-semibold text-[11px] shadow-xs">
                Screen & Submit Candidates →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
