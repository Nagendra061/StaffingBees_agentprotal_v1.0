import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { AgentReferral } from '../types';

interface AdminReviewViewProps {
  referrals: AgentReferral[];
  onApproveReferral: (referralId: string, issuedAgentId: string, note: string) => void;
  onDeclineReferral: (referralId: string, note: string) => void;
  onBackToPortal: () => void;
}

export const AdminReviewView: React.FC<AdminReviewViewProps> = ({
  referrals,
  onApproveReferral,
  onDeclineReferral,
  onBackToPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'decided'>('pending');
  const [selectedReferral, setSelectedReferral] = useState<AgentReferral | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'decline' | null>(null);
  const [issuedId, setIssuedId] = useState(`AGT-00${Math.floor(5 + Math.random() * 5)}`);
  const [adminNote, setAdminNote] = useState('');

  const pendingList = referrals.filter((r) => r.status === 'pending');
  const decidedList = referrals.filter((r) => r.status !== 'pending');

  const handleConfirmDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReferral || !actionType) return;

    if (actionType === 'approve') {
      onApproveReferral(
        selectedReferral.id,
        issuedId,
        adminNote || 'Approved by StaffingBees Admin. Licence pending SB-CSP completion.'
      );
    } else {
      onDeclineReferral(
        selectedReferral.id,
        adminNote || 'Declined by Admin review.'
      );
    }

    setSelectedReferral(null);
    setActionType(null);
    setAdminNote('');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToPortal}
            className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <span>Admin: Referral Applications Review Queue</span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                Admin Console
              </span>
            </h1>
            <p className="text-xs text-gray-500">
              Oversee the referral-only agent network, approve candidates, and issue SB-CSP licence tracking IDs
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-gray-200/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending Queue ({pendingList.length})
          </button>
          <button
            onClick={() => setActiveTab('decided')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'decided'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Decided History ({decidedList.length})
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
        {activeTab === 'pending' ? (
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Pending Candidate Agent Applications ({pendingList.length})
            </h2>

            {pendingList.length === 0 ? (
              <div className="text-center py-10 text-xs text-gray-400">
                All agent referral applications have been reviewed!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingList.map((ref) => (
                  <div
                    key={ref.id}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900 text-sm">{ref.candidateAgentName}</span>
                        <span className="px-2 py-0.2 bg-amber-100 text-amber-800 rounded text-[10px] font-semibold">
                          Pending Review
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {ref.email} • {ref.phone} • {ref.location} • {ref.experienceYears} Years Experience
                      </div>
                      <div className="text-[11px] text-gray-700 bg-white p-2 rounded-lg border border-gray-200 mt-1 max-w-2xl">
                        <strong>Nominator Statement:</strong> "{ref.summary}"
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Referred by: <strong>{ref.referringAgentName}</strong> ({ref.referringAgentId}) on {ref.submittedDate}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedReferral(ref);
                          setActionType('approve');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs flex items-center space-x-1 cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Application</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedReferral(ref);
                          setActionType('decline');
                        }}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold text-xs flex items-center space-x-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Decided Applications History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                    <th className="py-2.5 px-3">Candidate Agent</th>
                    <th className="py-2.5 px-3">Referred By</th>
                    <th className="py-2.5 px-3">Issued Agent ID</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Admin Notes & Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {decidedList.map((ref) => (
                    <tr key={ref.id} className="hover:bg-gray-50/60">
                      <td className="py-3 px-3">
                        <div className="font-bold text-gray-900">{ref.candidateAgentName}</div>
                        <div className="text-[10px] text-gray-400">{ref.email}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-700">{ref.referringAgentName}</td>
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">
                        {ref.issuedAgentId || 'None'}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            ref.status === 'certified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ref.status === 'approved'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {ref.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-600 text-[11px]">
                        {ref.adminNotes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Decision Modal */}
      {selectedReferral && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-gray-900">
              {actionType === 'approve' ? 'Approve Referral & Issue Agent ID' : 'Decline Referral Application'}
            </h3>
            <p className="text-gray-500">
              Candidate: <strong className="text-gray-900">{selectedReferral.candidateAgentName}</strong>
            </p>

            <form onSubmit={handleConfirmDecision} className="space-y-3.5">
              {actionType === 'approve' && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Assign Agent ID (Licence Status will be Pending)
                  </label>
                  <input
                    type="text"
                    required
                    value={issuedId}
                    onChange={(e) => setIssuedId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Admin Decision Note
                </label>
                <textarea
                  rows={3}
                  required
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Enter decision rationale..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReferral(null);
                    setActionType(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-lg font-semibold shadow-xs ${
                    actionType === 'approve'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirm Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
