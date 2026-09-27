import React, { useState } from 'react';
import {
  Clock,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Award,
  ChevronRight,
  Check,
  Play,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { HoneyBeeIcon } from './HoneyBeeLogo';
import {
  CertificationModule,
  CertificationTask,
  TaskTiming,
} from '../types';

interface TasksViewProps {
  modules: CertificationModule[];
  tasks: CertificationTask[];
  activeCertNumber: number;
  onSelectCert: (certNumber: number) => void;
  onOpenTaskDetail: (task: CertificationTask) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onOpenHowTasksWork: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  modules,
  tasks,
  activeCertNumber,
  onSelectCert,
  onOpenTaskDetail,
  onToggleTaskComplete,
  onOpenHowTasksWork,
}) => {
  const [activeTab, setActiveTab] = useState<TaskTiming>('today');
  const [filterType, setFilterType] = useState<'all' | 'mandatory' | 'assessment'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Expanded certifications for Future tab (initially open 1 & 2)
  const [expandedCerts, setExpandedCerts] = useState<Set<number>>(new Set([1, 2]));

  const toggleCertExpand = (certNum: number) => {
    setExpandedCerts((prev) => {
      const next = new Set(prev);
      if (next.has(certNum)) {
        next.delete(certNum);
      } else {
        next.add(certNum);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedCerts(new Set([1, 2, 3, 4, 5, 6]));
  };

  const handleCollapseAll = () => {
    setExpandedCerts(new Set());
  };

  // Active module for Today's Tasks
  const currentModule = modules.find((m) => m.number === activeCertNumber) || modules[0];

  // Filter tasks for the active certification & tab
  const certTasks = tasks.filter((t) => t.certNumber === activeCertNumber);

  const tabFilteredTasks = certTasks.filter((t) => {
    if (activeTab === 'today') {
      if (t.timing !== 'today') return false;
    } else if (activeTab === 'overdue') {
      if (t.timing !== 'overdue') return false;
    }

    if (filterType === 'mandatory' && t.isAssessment) return false;
    if (filterType === 'assessment' && !t.isAssessment) return false;

    return true;
  });

  const completedCount = certTasks.filter((t) => t.status === 'completed').length;
  const totalCount = certTasks.length;
  const isAllMandatoryDone = certTasks
    .filter((t) => !t.isAssessment)
    .every((t) => t.status === 'completed');
  const isCertCompleted = currentModule.status === 'completed';

  const isFinalAssessmentDone = modules.find((m) => m.number === 7)?.status === 'completed';

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[#ebedf0] select-none">
      {/* Subheader Row: Tabs on Left, How Tasks Work & Filters on Right */}
      <div className="bg-white border-b border-gray-200 px-6 flex items-center justify-between h-10 shrink-0">
        {/* Left Tabs: Today's Tasks, Overdue, Future */}
        <div className="flex items-center space-x-6 h-full text-xs">
          <button
            onClick={() => setActiveTab('today')}
            className={`h-full flex items-center px-1 font-medium transition-colors cursor-pointer border-b-2 ${
              activeTab === 'today'
                ? 'border-[#3ca1df] text-gray-800'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Today's Tasks
          </button>

          <button
            onClick={() => setActiveTab('overdue')}
            className={`h-full flex items-center px-1 font-normal transition-colors cursor-pointer border-b-2 ${
              activeTab === 'overdue'
                ? 'border-[#3ca1df] text-gray-800 font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Overdue
          </button>

          <button
            onClick={() => setActiveTab('future')}
            className={`h-full flex items-center px-1 font-normal transition-colors cursor-pointer border-b-2 ${
              activeTab === 'future'
                ? 'border-[#3ca1df] text-gray-800 font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Future
          </button>
        </div>

        {/* Right Side Controls: ? How Tasks work + Filters ▾ */}
        <div className="flex items-center space-x-3">
          {/* Cyan link: ? How Tasks work */}
          <button
            onClick={onOpenHowTasksWork}
            className="flex items-center space-x-1 text-[#17a2b8] hover:text-[#138496] hover:underline text-xs cursor-pointer font-normal"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#17a2b8]" />
            <span>How Tasks work</span>
          </button>

          {/* Filters ▾ button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs transition-colors cursor-pointer shadow-2xs font-normal"
            >
              <span>Filters</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md py-1 z-20 text-xs">
                <button
                  onClick={() => {
                    setFilterType('all');
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                >
                  <span>All Tasks</span>
                  {filterType === 'all' && <Check className="w-3 h-3 text-[#3ca1df]" />}
                </button>
                <button
                  onClick={() => {
                    setFilterType('mandatory');
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                >
                  <span>Mandatory Tasks only</span>
                  {filterType === 'mandatory' && <Check className="w-3 h-3 text-[#3ca1df]" />}
                </button>
                <button
                  onClick={() => {
                    setFilterType('assessment');
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                >
                  <span>Practical Assessments only</span>
                  {filterType === 'assessment' && <Check className="w-3 h-3 text-[#3ca1df]" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN (Col 1-7): Tasks / Future Six Certifications ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {/* Active Status Alert (only for Today's Tasks) */}
            {activeTab === 'today' && (
              <>
                {isFinalAssessmentDone ? (
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3.5 rounded shadow-sm flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <strong className="block font-bold">Active StaffingBees Agent</strong>
                        <span>All certifications, final assessment, and human interview completed.</span>
                      </div>
                    </div>
                  </div>
                ) : isCertCompleted && activeCertNumber < 6 ? (
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>
                        <strong>Certification {activeCertNumber} Completed!</strong>{' '}
                        Certification {activeCertNumber + 1} is now unlocked.
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectCert(activeCertNumber + 1)}
                      className="px-3 py-1 bg-[#3ca1df] hover:bg-[#3293cf] text-white rounded text-xs font-medium cursor-pointer shadow-2xs flex items-center space-x-1 shrink-0"
                    >
                      <span>Next Level</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : isAllMandatoryDone && !isCertCompleted ? (
                  <div className="bg-purple-50 border border-purple-200 text-purple-900 p-3 rounded flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#6f42c1] shrink-0" />
                      <span>
                        <strong>Mandatory tasks complete!</strong> Pass the Practical Assessment below to finish this level.
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded shrink-0">
                      Assessment Pending
                    </span>
                  </div>
                ) : null}
              </>
            )}

            {/* Task Container / Card */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-2xs overflow-hidden flex flex-col">
              {/* Card Header */}
              <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-700 text-xs font-medium min-w-0 pr-2">
                  <Clock className="w-4 h-4 text-gray-400 stroke-[1.75] shrink-0" />
                  <span className="truncate">
                    {activeTab === 'today' ? (
                      <>
                        Today's Tasks —{' '}
                        <span className="text-gray-900 font-semibold">
                          {currentModule.name}
                        </span>
                      </>
                    ) : activeTab === 'overdue' ? (
                      <span className="text-gray-900 font-semibold">Overdue Tasks</span>
                    ) : (
                      <>
                        Future Tasks —{' '}
                        <span className="text-gray-900 font-semibold">
                          6 Certifications Curriculum
                        </span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {activeTab === 'today' ? (
                    <>
                      <span className="text-[11px] text-gray-500">
                        {completedCount} of {totalCount} completed
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          isCertCompleted
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : currentModule.status === 'assessment_pending'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {isCertCompleted
                          ? 'Completed'
                          : currentModule.status === 'assessment_pending'
                          ? 'Assessment'
                          : 'In Progress'}
                      </span>
                    </>
                  ) : activeTab === 'future' ? (
                    <div className="flex items-center space-x-2 text-[11px]">
                      <button
                        onClick={handleExpandAll}
                        className="text-[#3ca1df] hover:underline cursor-pointer"
                      >
                        Expand All
                      </button>
                      <span className="text-gray-300">•</span>
                      <button
                        onClick={handleCollapseAll}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        Collapse All
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400">0 overdue</span>
                  )}
                </div>
              </div>

              {/* CARD BODY CONTENT */}
              {activeTab === 'future' ? (
                /* ================= FUTURE TAB: SIX CERTIFICATIONS DROPDOWNS WITH CLOCKED TASKS ================= */
                <div className="divide-y divide-gray-100 max-h-[640px] overflow-y-auto">
                  {modules.slice(0, 6).map((mod) => {
                    const isExpanded = expandedCerts.has(mod.number);
                    const modTasks = tasks.filter((t) => t.certNumber === mod.number);
                    const modCompleted = modTasks.filter((t) => t.status === 'completed').length;
                    const isModCompleted = mod.status === 'completed';
                    const isModActive = mod.number === activeCertNumber;

                    return (
                      <div key={mod.number} className="bg-white">
                        {/* Dropdown Header */}
                        <button
                          onClick={() => toggleCertExpand(mod.number)}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left select-none"
                        >
                          <div className="flex items-center space-x-2.5 min-w-0 pr-3">
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 transition-transform shrink-0 ${
                                isExpanded ? 'rotate-0' : '-rotate-90'
                              }`}
                            />
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-tight bg-gray-100 text-gray-700 border border-gray-200 shrink-0">
                              Cert {mod.number}
                            </span>
                            <span className="text-xs font-semibold text-gray-800 truncate">
                              {mod.name}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2.5 shrink-0 text-xs">
                            <span className="text-[11px] text-gray-400">
                              {modCompleted}/{modTasks.length} tasks
                            </span>
                            <span
                              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                                isModCompleted
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : isModActive
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {!isModCompleted && <Clock className="w-3 h-3 text-amber-600 shrink-0" />}
                              {isModCompleted && <Check className="w-3 h-3 text-green-600 stroke-[3] shrink-0" />}
                              <span>
                                {isModCompleted
                                  ? 'Completed'
                                  : isModActive
                                  ? 'In Progress'
                                  : 'Clocked'}
                              </span>
                            </span>
                          </div>
                        </button>

                        {/* Dropdown Task Items with Clocked status */}
                        {isExpanded && (
                          <div className="bg-[#fafbfc] border-t border-gray-100 divide-y divide-gray-100 pl-3">
                            {modTasks.map((t) => {
                              const isTaskCompleted = t.status === 'completed';
                              return (
                                <div
                                  key={t.id}
                                  onClick={() => onOpenTaskDetail(t)}
                                  className="px-4 py-2.5 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer transition-colors"
                                >
                                  <div className="flex items-center space-x-3 flex-1 min-w-0 pr-3">
                                    {/* Clocked or Checkbox indicator */}
                                    {isTaskCompleted ? (
                                      <div className="w-4 h-4 rounded-xs bg-[#3ca1df] text-white flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                      </div>
                                    ) : (
                                      <div
                                        title="Clocked / Scheduled task"
                                        className="w-4 h-4 rounded-xs border border-amber-300 bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"
                                      >
                                        <Clock className="w-2.5 h-2.5" />
                                      </div>
                                    )}

                                    <div className="flex items-center space-x-2 min-w-0">
                                      <span className="font-semibold text-xs text-gray-700 shrink-0">
                                        {t.id}
                                      </span>
                                      <span
                                        className={`text-xs truncate ${
                                          isTaskCompleted
                                            ? 'text-gray-400 line-through'
                                            : 'text-gray-700 font-normal'
                                        }`}
                                      >
                                        {t.name}
                                      </span>
                                      {t.isAssessment && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                                          Assessment
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 shrink-0">
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center space-x-1 ${
                                        isTaskCompleted
                                          ? 'bg-green-50 text-green-700 border border-green-200'
                                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                                      }`}
                                    >
                                      {!isTaskCompleted && (
                                        <Clock className="w-2.5 h-2.5 text-amber-600" />
                                      )}
                                      <span>{isTaskCompleted ? 'Completed' : 'Clocked'}</span>
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : activeTab === 'overdue' ? (
                /* Empty state for Overdue tab */
                <div className="py-20 flex flex-col items-center justify-center text-center select-none">
                  <div className="text-gray-400 mb-2">
                    <Clock className="w-12 h-12 stroke-[1.2] text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-xs font-normal">
                    No overdue tasks found, nice work!
                  </p>
                </div>
              ) : (
                /* Today's Tasks List */
                tabFilteredTasks.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                    {tabFilteredTasks.map((t) => {
                      const isTaskCompleted = t.status === 'completed';

                      return (
                        <div
                          key={t.id}
                          onClick={() => onOpenTaskDetail(t)}
                          className={`px-4 py-2.5 flex items-center justify-between hover:bg-[#f9fafb] cursor-pointer transition-colors ${
                            isTaskCompleted ? 'bg-gray-50/50' : 'bg-white'
                          }`}
                        >
                          {/* Left: Checkbox + Task ID + Task Name */}
                          <div className="flex items-center space-x-3 flex-1 min-w-0 pr-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleTaskComplete(t.id);
                              }}
                              title={isTaskCompleted ? 'Mark as pending' : 'Mark as complete'}
                              className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                                isTaskCompleted
                                  ? 'bg-[#3ca1df] border-[#3ca1df] text-white'
                                  : 'border-gray-300 hover:border-gray-400 bg-white'
                              }`}
                            >
                              {isTaskCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>

                            <div className="flex items-center space-x-2 min-w-0">
                              <span className="font-semibold text-xs text-gray-700 shrink-0">
                                {t.id}
                              </span>

                              <span
                                className={`text-xs truncate ${
                                  isTaskCompleted
                                    ? 'text-gray-400 line-through'
                                    : 'text-gray-800 font-medium'
                                }`}
                              >
                                {t.name}
                              </span>

                              {t.isAssessment && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-tight bg-purple-100 text-purple-800 shrink-0 border border-purple-200">
                                  Practical Assessment
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right: Status Pill & Arrow */}
                          <div className="flex items-center space-x-2.5 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                                isTaskCompleted
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : t.isAssessment
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : 'bg-gray-100 text-gray-600 border border-gray-200'
                              }`}
                            >
                              {isTaskCompleted
                                ? 'Completed'
                                : t.isAssessment
                                ? 'Assessment'
                                : 'Pending'}
                            </span>

                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center select-none">
                    <div className="text-gray-400 mb-2">
                      <Clock className="w-12 h-12 stroke-[1.2] text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xs font-normal">
                      No tasks found, nice work!
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Col 8-12): Video Demo Section matching Staffing Bees Image ================= */}
          <div className="lg:col-span-5 flex flex-col items-center select-none pt-1">
            {/* Dark video preview box with Honey Bee mascot & duration badge */}
            <div
              onClick={onOpenHowTasksWork}
              className="relative w-full h-[230px] bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] hover:brightness-105 transition-all rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-md group border border-slate-700/60 overflow-hidden"
            >
              {/* Mascot in bottom left corner with 05:20 badge like reference image */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 z-10">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center p-0.5 shadow-sm border border-white/20">
                  <HoneyBeeIcon size={24} />
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-black/80 text-white border border-white/10 shadow-xs">
                  05:20
                </span>
              </div>

              {/* Honey Bee watermark / top branding */}
              <div className="mb-2 flex items-center space-x-1 text-[#FBBF24]">
                <HoneyBeeIcon size={20} />
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  Staffing<span className="text-[#FBBF24]">Bees</span> Academy
                </span>
              </div>

              {/* Heading inside dark card */}
              <h2 className="text-white text-base md:text-lg font-bold tracking-tight max-w-sm leading-snug px-2 drop-shadow-xs">
                Welcome to Staffing Bees Agent Training!
              </h2>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#1d4ed8]/90 group-hover:bg-[#1d4ed8] group-hover:scale-110 transition-all flex items-center justify-center text-white shadow-xl pl-0.5 border border-white/30">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>
              </div>
            </div>

            {/* Section below the dark box matching Staffing Bees Theme */}
            <div className="flex flex-col items-center mt-5 text-center px-2">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-1.5">
                Welcome to Staffing Bees Agent Training!
              </h3>
              <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                Watch this video to understand the platform, certification process and your journey to become a Staffing Bees Agent.
              </p>

              {/* "Watch Now" royal blue button */}
              <button
                onClick={onOpenHowTasksWork}
                className="mt-4 px-6 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-sm flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Watch Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
