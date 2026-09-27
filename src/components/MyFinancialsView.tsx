import React from 'react';
import {
  Coins,
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { Agent, SubmissionRecord } from '../types';

interface MyFinancialsViewProps {
  currentAgent: Agent;
  submissions: SubmissionRecord[];
}

export const MyFinancialsView: React.FC<MyFinancialsViewProps> = ({
  currentAgent,
  submissions,
}) => {
  // Placement-by-placement table data (PRD Section 8 & 10)
  const placements = [
    {
      id: 'PLC-001',
      candidateName: 'Rahul Sharma',
      clientName: 'Apex Cloud Systems',
      role: 'Senior Frontend Developer',
      type: 'Contract',
      clientRate: '$90.00/hr',
      candidateRate: '$72.00/hr',
      margin: '$18.00/hr',
      weeklyEarnings: '$720.00',
      totalEarned: '$14,400.00',
      status: 'Active Recurring',
      startDate: 'Sep 22, 2026',
    },
    {
      id: 'PLC-002',
      candidateName: 'Aditi Varma',
      clientName: 'Apex Cloud Systems',
      role: 'Lead UI/UX Product Designer',
      type: 'Direct Placement',
      clientRate: 'N/A ($145k Sal)',
      candidateRate: 'N/A',
      margin: '20% Fee',
      weeklyEarnings: 'One-time',
      totalEarned: '$29,000.00',
      status: 'Paid in Full',
      startDate: 'Aug 20, 2026',
    },
    {
      id: 'PLC-003',
      candidateName: 'Kiran Kumar',
      clientName: 'NovaTech Solutions',
      role: 'Lead Backend Developer',
      type: 'Contract',
      clientRate: '$105.00/hr',
      candidateRate: '$85.00/hr',
      margin: '$20.00/hr',
      weeklyEarnings: '$800.00',
      totalEarned: '$6,400.00',
      status: 'Active Recurring',
      startDate: 'Sep 01, 2026',
    },
  ];

  const totalContractRecurringWeekly = 1520;
  const totalDirectPlacementEarnings = 29000;
  const totalCumulativeEarnings = 49800;

  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Agent Financials & Credit Ledger</h1>
        <p className="text-xs text-gray-500">
          Single payment engine accounting: hourly contract margins, direct placement fees, and credit economy ledger
        </p>
      </div>

      {/* Top 4 Financial Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Credits */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Credit Balance</span>
            <Coins className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 flex items-center space-x-1.5">
            <span>{currentAgent.credits}</span>
            <span className="text-xs font-semibold text-amber-600">Points</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Spend on RCATs & Leads</div>
        </div>

        {/* Weekly Recurring Contract Margin */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Weekly Contract Margin</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            ${totalContractRecurringWeekly.toLocaleString()}<span className="text-xs font-normal text-gray-500">/wk</span>
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">2 active hourly contracts</div>
        </div>

        {/* Direct Placement Earnings */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-blue-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Direct Placement Fees</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-blue-900">
            ${totalDirectPlacementEarnings.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-600 mt-1">One-time placement revenue</div>
        </div>

        {/* Cumulative Earnings */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Cumulative Earnings</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-950">
            ${totalCumulativeEarnings.toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-600 mt-1">All time StaffingBees fees</div>
        </div>
      </div>

      {/* Placement-by-Placement Earnings Table (PRD Section 8 & 10) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Placement-by-Placement Earnings</h3>
            <p className="text-[11px] text-gray-500">
              Breakdown of hourly client margins (Contract) vs. one-time annual salary fees (Direct Placement)
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Single Payment Engine
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                <th className="py-2.5 px-3">Candidate & Client</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Billing Terms</th>
                <th className="py-2.5 px-3">Margin / Fee</th>
                <th className="py-2.5 px-3">Total Earned</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {placements.map((plc) => (
                <tr key={plc.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-3">
                    <div className="font-bold text-gray-900">{plc.candidateName}</div>
                    <div className="text-[11px] text-gray-500">{plc.clientName}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-800">{plc.role}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px]">
                      {plc.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-600 font-medium">
                    {plc.type === 'Contract' ? (
                      <div>
                        Client: {plc.clientRate} • Pay: {plc.candidateRate}
                      </div>
                    ) : (
                      plc.clientRate
                    )}
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">
                    {plc.margin} ({plc.weeklyEarnings})
                  </td>
                  <td className="py-3 px-3 font-extrabold text-gray-900">
                    {plc.totalEarned}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        plc.status.includes('Active')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {plc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Ledger Table (PRD Section 8 & 10) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Full Credit Activity Ledger</h3>
            <p className="text-[11px] text-gray-500">
              Credits earned (welcome grants, referral bonuses, placement fees) and spent (lead packs, visibility)
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 flex items-center space-x-1">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>Balance: {currentAgent.credits} pts</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                <th className="py-2.5 px-3">Transaction Date</th>
                <th className="py-2.5 px-3">Activity Description</th>
                <th className="py-2.5 px-3">Credit Flow</th>
                <th className="py-2.5 px-3">Resulting Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentAgent.creditLedger.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-3 text-gray-500">{item.date}</td>
                  <td className="py-3 px-3 font-medium text-gray-900">{item.description}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-bold flex items-center space-x-0.5 ${
                        item.amount > 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {item.amount > 0 ? (
                        <>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>+{item.amount} pts</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                          <span>{item.amount} pts</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{item.balance} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
