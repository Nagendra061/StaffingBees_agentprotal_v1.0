import React, { useState } from 'react';
import {
  Award,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
  Briefcase,
  Users,
} from 'lucide-react';
import { SubmissionRecord, Candidate, Requirement, Agent } from '../types';
import { calculateStaffingBeesFee } from '../utils/paymentEngine';

interface MySubmissionsViewProps {
  submissions: SubmissionRecord[];
  candidates: Candidate[];
  requirements: Requirement[];
  currentAgent: Agent;
  onAddSubmission: (submission: SubmissionRecord) => void;
  onUpdateSubmissionStatus?: (id: string, newStatus: SubmissionRecord['status']) => void;
}

export const MySubmissionsView: React.FC<MySubmissionsViewProps> = ({
  submissions,
  candidates,
  requirements,
  currentAgent,
  onAddSubmission,
  onUpdateSubmissionStatus,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'add'>('list');

  // Add submission form state
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id || '');
  const [selectedReqId, setSelectedReqId] = useState(requirements[0]?.id || '');
  const [candidateRate, setCandidateRate] = useState(72);
  const [clientRate, setClientRate] = useState(90);
  const [annualSalary, setAnnualSalary] = useState(150000);
  const [placementFeePct, setPlacementFeePct] = useState(20);

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];
  const selectedReq = requirements.find((r) => r.id === selectedReqId) || requirements[0];
  const engagementType = selectedReq?.engagementType || 'Contract';

  const feeResult = calculateStaffingBeesFee(
    engagementType === 'Contract'
      ? {
          type: 'Contract',
          candidateRate,
          clientRate,
        }
      : {
          type: 'Direct Placement',
          annualSalary,
          placementFeePercent: placementFeePct,
        }
  );

  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !selectedReq) return;

    const newSub: SubmissionRecord = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name,
      requirementId: selectedReq.id,
      jobTitle: selectedReq.jobTitle,
      clientId: selectedReq.clientId,
      clientName: selectedReq.clientName,
      engagementType,
      status: 'Submitted',
      submittedDate: 'Today',
      owningAgentId: currentAgent.id,
      owningAgentName: currentAgent.name,
      candidateRate: engagementType === 'Contract' ? candidateRate : undefined,
      clientRate: engagementType === 'Contract' ? clientRate : undefined,
      annualSalary: engagementType === 'Direct Placement' ? annualSalary : undefined,
      placementFeePercent: engagementType === 'Direct Placement' ? placementFeePct : undefined,
      calculatedFee: feeResult.formattedSummary,
    };

    onAddSubmission(newSub);
    setViewMode('list');
  };

  // ================= VIEW: ADD SUBMISSION (FULL PAGE) =================
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
              <span>Back to Submissions</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-gray-900">New Submission</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-xl font-bold text-gray-900">Submit Candidate to Requisition</h1>
              <p className="text-xs text-gray-500">
                Package candidate profile with live StaffingBees payment engine calculation.
              </p>
            </div>

            <form onSubmit={handleCreateSubmission} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Select Candidate *</label>
                  <select
                    value={selectedCandidateId}
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {candidates.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.currentRole} (CPI: {c.cpiScore || 85})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Select Requisition *</label>
                  <select
                    value={selectedReqId}
                    onChange={(e) => setSelectedReqId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {requirements.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.jobTitle} at {r.clientName} ({r.engagementType})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Engagement Type aware rate inputs (PRD Section 8 & 10) */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <span className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                    Engagement Type: {engagementType}
                  </span>
                  <span className="text-[10px] text-gray-500">Calculated via Single Payment Engine</span>
                </div>

                {engagementType === 'Contract' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Client Bill Rate ($/hr)</label>
                      <input
                        type="number"
                        value={clientRate}
                        onChange={(e) => setClientRate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Candidate Pay Rate ($/hr)</label>
                      <input
                        type="number"
                        value={candidateRate}
                        onChange={(e) => setCandidateRate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Annual Salary ($)</label>
                      <input
                        type="number"
                        value={annualSalary}
                        onChange={(e) => setAnnualSalary(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Placement Fee %</label>
                      <input
                        type="number"
                        value={placementFeePct}
                        onChange={(e) => setPlacementFeePct(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Live fee preview container */}
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Live StaffingBees Fee Projection:
                  </div>
                  <div className="font-extrabold text-sm mt-0.5">{feeResult.formattedSummary}</div>
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
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW: SUBMISSIONS LIST =================
  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Submissions</h1>
          <p className="text-xs text-gray-500">
            Candidate-to-requirement submissions with engagement type, payment terms, and status
          </p>
        </div>
        <button
          onClick={() => setViewMode('add')}
          className="px-3.5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center space-x-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Submission</span>
        </button>
      </div>

      {/* Submissions Table (PRD Section 8) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Requisition</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Payment Terms & Fee</th>
                <th className="py-2.5 px-3">Submitted Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-3 font-bold text-gray-900">{sub.candidateName}</td>
                  <td className="py-3 px-3 text-gray-800">{sub.jobTitle}</td>
                  <td className="py-3 px-3 text-gray-600">{sub.clientName}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                      {sub.engagementType}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">
                    {sub.calculatedFee}
                  </td>
                  <td className="py-3 px-3 text-gray-500">{sub.submittedDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === 'Placed'
                          ? 'bg-purple-100 text-purple-800'
                          : sub.status === 'Interview'
                          ? 'bg-blue-100 text-blue-800'
                          : sub.status === 'Screening'
                          ? 'bg-amber-100 text-amber-800'
                          : sub.status === 'Offer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {onUpdateSubmissionStatus && sub.status !== 'Placed' && (
                      <select
                        value={sub.status}
                        onChange={(e) =>
                          onUpdateSubmissionStatus(sub.id, e.target.value as SubmissionRecord['status'])
                        }
                        className="text-[11px] px-2 py-1 bg-white border border-gray-200 rounded font-medium text-gray-700"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Placed">Placed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Withdrawn">Withdrawn</option>
                      </select>
                    )}
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
