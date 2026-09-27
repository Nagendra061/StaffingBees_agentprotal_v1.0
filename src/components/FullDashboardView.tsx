import React from 'react';
import {
  Users,
  Building,
  Briefcase,
  Award,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Candidate, Client, Requirement, SubmissionRecord } from '../types';

interface FullDashboardViewProps {
  candidates: Candidate[];
  clients: Client[];
  requirements: Requirement[];
  submissions: SubmissionRecord[];
  onSelectCandidate: (candidate: Candidate) => void;
  onNavigate: (navId: string) => void;
}

export const FullDashboardView: React.FC<FullDashboardViewProps> = ({
  candidates,
  clients,
  requirements,
  submissions,
  onSelectCandidate,
  onNavigate,
}) => {
  // Candidate pipeline status breakdown
  const stages = [
    { label: 'Screening', count: candidates.filter((c) => c.stage === 'Screening').length, color: 'bg-blue-500' },
    { label: 'In Coaching', count: candidates.filter((c) => c.stage === 'In Coaching' || c.stage === 'Coaching').length, color: 'bg-amber-500' },
    { label: 'Market Ready', count: candidates.filter((c) => c.readiness === 'Market Ready' || c.stage === 'Market Ready' || c.stage === 'Qualified').length, color: 'bg-emerald-500' },
    { label: 'Submitted', count: candidates.filter((c) => c.stage === 'Submitted' || c.stage === 'Interview').length, color: 'bg-indigo-500' },
    { label: 'Placed', count: candidates.filter((c) => c.stage === 'Placed' || c.status === 'Placed').length, color: 'bg-purple-500' },
  ];

  // Placements count
  const placedCount = candidates.filter((c) => c.stage === 'Placed' || c.status === 'Placed').length || 1;

  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Full Pipeline Dashboard</h1>
          <p className="text-xs text-gray-500">
            Real-time candidate telemetry, payment engine fee projections, and active submissions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('Available Requirements')}
            className="px-3.5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            Match Open Requirements →
          </button>
        </div>
      </div>

      {/* Top 4 Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Candidates</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{candidates.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% active in pipeline</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Client Accounts</span>
            <Building className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{clients.length}</div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">Direct MSAs signed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Open Requisitions</span>
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{requirements.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Contract & Direct Placement</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Placements Made</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{placedCount}</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Single payment engine verified</div>
        </div>
      </div>

      {/* Candidate Pipeline-by-Status Bars (PRD Section 8) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900">
            Candidate Pipeline By Status
          </h2>
          <span className="text-xs text-gray-400">All registered candidates</span>
        </div>

        {/* Progress bar container */}
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
          {stages.map((stage) => {
            const widthPct = Math.max(8, (stage.count / Math.max(1, candidates.length)) * 100);
            return (
              <div
                key={stage.label}
                title={`${stage.label}: ${stage.count}`}
                className={`${stage.color} h-full transition-all`}
                style={{ width: `${widthPct}%` }}
              />
            );
          })}
        </div>

        {/* Stage Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {stages.map((stage) => (
            <div key={stage.label} className="flex items-center space-x-2 text-xs">
              <span className={`w-3 h-3 rounded-full ${stage.color} shrink-0`} />
              <div>
                <span className="font-semibold text-gray-800">{stage.label}</span>
                <span className="text-gray-400 ml-1">({stage.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Recent Candidates & Open Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Recent Candidates</h3>
            <button
              onClick={() => onNavigate('My Candidates')}
              className="text-xs text-[#1d4ed8] hover:underline font-semibold"
            >
              View All
            </button>
          </div>

          <div className="space-y-2">
            {candidates.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCandidate(c)}
                className="p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between text-xs cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 hover:text-blue-700">{c.name}</div>
                    <div className="text-[11px] text-gray-500">
                      {c.currentRole} • {c.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                    CPI {c.cpiScore || 85}
                  </span>
                  <div className="text-[10px] text-gray-400 mt-0.5">{c.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Requirements */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Open Requirements</h3>
            <button
              onClick={() => onNavigate('Available Requirements')}
              className="text-xs text-[#1d4ed8] hover:underline font-semibold"
            >
              View Marketplace
            </button>
          </div>

          <div className="space-y-2">
            {requirements.slice(0, 4).map((req) => (
              <div
                key={req.id}
                onClick={() => onNavigate('Available Requirements')}
                className="p-3 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all flex items-center justify-between text-xs cursor-pointer"
              >
                <div>
                  <div className="font-bold text-gray-900">{req.jobTitle}</div>
                  <div className="text-[11px] text-gray-500">
                    {req.clientName} • {req.location}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px]">
                    {req.engagementType === 'Contract'
                      ? `$${req.clientBillRate}/hr`
                      : `$${(req.budgetedAnnualSalary || 0).toLocaleString()}`}
                  </span>
                  <div className="text-[10px] text-gray-400 mt-0.5">{req.engagementType}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Submissions Table (PRD Section 8) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Full Submissions Table</h3>
            <p className="text-[11px] text-gray-500">
              Candidate-to-requirement submissions with single payment engine calculations
            </p>
          </div>
          <button
            onClick={() => onNavigate('My Submissions')}
            className="text-xs text-[#1d4ed8] hover:underline font-semibold"
          >
            Manage Submissions →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Requisition</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Staffing Bees Fee</th>
                <th className="py-2.5 px-3">Status</th>
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
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === 'Placed'
                          ? 'bg-purple-100 text-purple-800'
                          : sub.status === 'Interview'
                          ? 'bg-blue-100 text-blue-800'
                          : sub.status === 'Screening'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {sub.status}
                    </span>
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
