import React from 'react';
import {
  Users,
  Building,
  Briefcase,
  Award,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Coins,
  DollarSign,
  Layers,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { Agent, Client, Requirement, SubmissionRecord, Candidate } from '../types';
import { PLATFORM_SERVICES } from '../data/platformData';

interface AgentHomeViewProps {
  currentAgent: Agent;
  candidatesCount: number;
  clientsCount: number;
  requirementsCount: number;
  submissionsCount: number;
  placementsCount: number;
  onNavigate: (navId: string) => void;
  onMarkCourseComplete: (courseId: string) => void;
  onOpenService: (serviceId: string) => void;
}

export const AgentHomeView: React.FC<AgentHomeViewProps> = ({
  currentAgent,
  candidatesCount,
  clientsCount,
  requirementsCount,
  submissionsCount,
  placementsCount,
  onNavigate,
  onMarkCourseComplete,
  onOpenService,
}) => {
  const isLicencePending = currentAgent.licenceStatus === 'pending';

  // Calculate course completion progress
  const completedCourses = currentAgent.courses.filter((c) => c.status === 'Completed').length;
  const totalCourses = currentAgent.courses.length;
  const progressPercent = Math.round((completedCourses / totalCourses) * 100);

  // Financial calculations
  const weeklyContractMargin = 1280; // Sample weekly recurring contract fee
  const oneTimePlacementFees = 29000; // Sample one-time fee

  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 space-y-6">
      {/* Licence-Pending Banner (PRD Section 7 & US-2) */}
      {isLicencePending && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl">
                ⏳
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold">Licence Status: Approval Pending</h2>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-[11px] font-semibold">
                    Agent ID: {currentAgent.id}
                  </span>
                </div>
                <p className="text-xs text-amber-100 max-w-xl mt-0.5">
                  Welcome to StaffingBees! Complete your mandatory Orientation + 6 SB-CSP courses below to activate your full certified license and unlock direct candidate & client submissions.
                </p>
              </div>
            </div>

            {/* Overall Progress Meter */}
            <div className="bg-black/20 backdrop-blur-sm px-4 py-3 rounded-xl text-right shrink-0">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-200">
                Certification Progress
              </div>
              <div className="text-xl font-extrabold">
                {completedCourses} of {totalCourses} Courses ({progressPercent}%)
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden mb-5">
            <div
              className="bg-white h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Course Checklist with 'Mark Complete' action */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {currentAgent.courses.map((course) => {
              const isCompleted = course.status === 'Completed';
              return (
                <div
                  key={course.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    isCompleted
                      ? 'bg-black/15 border-white/20 text-white'
                      : 'bg-white/95 border-amber-300 text-gray-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 overflow-hidden pr-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <div className="truncate">
                      <div className="font-bold truncate text-[11px]">
                        {course.code}: {course.name}
                      </div>
                      <div className="text-[10px] opacity-80">
                        {isCompleted ? `Completed (${course.completedDate || 'Verified'})` : 'Required for Licence'}
                      </div>
                    </div>
                  </div>

                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={() => onMarkCourseComplete(course.id)}
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-bold shrink-0 cursor-pointer shadow-xs transition-colors"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Services Rail of Icon-and-Name Tiles (PRD Section 8 & 16) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Integrated Services Rail
            </span>
          </div>
          <button
            onClick={() => onNavigate('All Services')}
            className="text-xs text-[#1d4ed8] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <span>All Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PLATFORM_SERVICES.map((srv) => (
            <button
              key={srv.id}
              onClick={() => onOpenService(srv.id)}
              title={`${srv.name}: ${srv.summary}`}
              className="p-3.5 rounded-xl border border-gray-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-left flex flex-col items-center text-center cursor-pointer group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-amber-100 text-gray-700 group-hover:text-amber-800 flex items-center justify-center mb-2 transition-colors">
                {srv.id === 'srv-rcats' && <Sparkles className="w-5 h-5 text-amber-600" />}
                {srv.id === 'srv-training' && <GraduationCap className="w-5 h-5 text-blue-600" />}
                {srv.id === 'srv-cert' && <Award className="w-5 h-5 text-purple-600" />}
                {srv.id === 'srv-leads' && <Zap className="w-5 h-5 text-orange-500" />}
                {srv.id === 'srv-portal' && <Building className="w-5 h-5 text-emerald-600" />}
                {srv.id === 'srv-pricing' && <DollarSign className="w-5 h-5 text-indigo-600" />}
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-amber-900 truncate w-full">
                {srv.shortCode}
              </span>
              <span className="text-[10px] text-gray-400 truncate w-full mt-0.5">
                {srv.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Section: Left (Dashboard Synopsis), Right (Agent Financials Snapshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dashboard Synopsis (PRD Section 8) */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Dashboard Synopsis
              </h3>
              <p className="text-[11px] text-gray-500">
                Active candidates, client MSAs, and pipeline throughput
              </p>
            </div>
            <button
              onClick={() => onNavigate('Full Dashboard')}
              className="text-xs text-[#1d4ed8] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>Full View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              onClick={() => onNavigate('My Candidates')}
              className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl cursor-pointer hover:bg-blue-100/60 transition-colors"
            >
              <div className="flex items-center justify-between text-blue-700 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase">Candidates</span>
              </div>
              <div className="text-xl font-bold text-blue-950">{candidatesCount}</div>
            </div>

            <div
              onClick={() => onNavigate('My Clients')}
              className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl cursor-pointer hover:bg-indigo-100/60 transition-colors"
            >
              <div className="flex items-center justify-between text-indigo-700 mb-1">
                <Building className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase">Clients</span>
              </div>
              <div className="text-xl font-bold text-indigo-950">{clientsCount}</div>
            </div>

            <div
              onClick={() => onNavigate('Available Requirements')}
              className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-100/60 transition-colors"
            >
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase">Requirements</span>
              </div>
              <div className="text-xl font-bold text-emerald-950">{requirementsCount}</div>
            </div>

            <div
              onClick={() => onNavigate('My Submissions')}
              className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl cursor-pointer hover:bg-amber-100/60 transition-colors"
            >
              <div className="flex items-center justify-between text-amber-700 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase">Placements</span>
              </div>
              <div className="text-xl font-bold text-amber-950">{placementsCount}</div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onNavigate('My Candidates')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
            >
              View My Candidates →
            </button>
            <button
              onClick={() => onNavigate('Available Requirements')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Match Open Requirements →
            </button>
            <button
              onClick={() => onNavigate('My Agent Referrals')}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Refer an Agent (+250 Credits)
            </button>
          </div>
        </div>

        {/* Agent Financials Snapshot (PRD Section 8 & 10) */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Agent Financials Snapshot
              </h3>
              <p className="text-[11px] text-gray-500">
                Single payment engine contract margins & placement fees
              </p>
            </div>
            <button
              onClick={() => onNavigate('My Financials')}
              className="text-xs text-[#1d4ed8] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Snapshot Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-amber-700">Credit Balance</div>
              <div className="text-lg font-extrabold text-amber-950 flex items-center space-x-1 mt-0.5">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>{currentAgent.credits}</span>
              </div>
              <div className="text-[10px] text-amber-800 mt-1">Available for lead packs</div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-emerald-700">Weekly Contract</div>
              <div className="text-lg font-extrabold text-emerald-950 mt-0.5">
                ${weeklyContractMargin.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-800 mt-1">Hourly margins sum</div>
            </div>

            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-blue-700">Direct Fees</div>
              <div className="text-lg font-extrabold text-blue-950 mt-0.5">
                ${oneTimePlacementFees.toLocaleString()}
              </div>
              <div className="text-[10px] text-blue-800 mt-1">One-time placement fees</div>
            </div>
          </div>

          {/* Recent Ledger Activity */}
          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Recent Ledger Activity
            </span>
            <div className="space-y-1">
              {currentAgent.creditLedger.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 text-[11px]"
                >
                  <div className="truncate pr-2">
                    <span className="font-semibold text-gray-800">{item.description}</span>
                    <span className="text-gray-400 ml-1.5">({item.date})</span>
                  </div>
                  <span
                    className={`font-bold shrink-0 ${
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
      </div>
    </div>
  );
};
