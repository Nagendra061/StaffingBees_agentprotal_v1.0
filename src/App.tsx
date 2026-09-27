/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Staffing Bees - Certified-Agent VMS Staffing Platform (PRD Compliant)
 */

import React, { useState, useMemo, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AgentLoginPage } from './components/AgentLoginPage';
import { CandidateLoginPage } from './components/CandidateLoginPage';
import { CandidatePortal } from './components/CandidatePortal';
import { AgentHomeView } from './components/AgentHomeView';
import { FullDashboardView } from './components/FullDashboardView';
import { MyClientsView } from './components/MyClientsView';
import { AvailableRequirementsView } from './components/AvailableRequirementsView';
import { MySubmissionsView } from './components/MySubmissionsView';
import { MyAgentReferralsView } from './components/MyAgentReferralsView';
import { MyFinancialsView } from './components/MyFinancialsView';
import { AllServicesView } from './components/AllServicesView';
import { AdminReviewView } from './components/AdminReviewView';
import { AddCandidateView } from './components/AddCandidateView';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { ActionToolbar } from './components/ActionToolbar';
import { PeopleTable } from './components/PeopleTable';
import { ColumnsModal } from './components/ColumnsModal';
import { FilterModal } from './components/FilterModal';
import { SmartListsModal } from './components/SmartListsModal';
import { InboxSidebar } from './components/InboxSidebar';
import { InboxView } from './components/InboxView';
import { VideoModal } from './components/VideoModal';
import { TasksView } from './components/TasksView';
import { TaskDetailModal } from './components/TaskDetailModal';
import { HowTasksWorkModal } from './components/HowTasksWorkModal';
import { CandidateProfileView } from './components/CandidateProfileView';
import {
  Candidate,
  JobId,
  InboxFolder,
  Conversation,
  CertificationModule,
  CertificationTask,
  Agent,
  Client,
  Requirement,
  SubmissionRecord,
  AgentReferral,
} from './types';
import { DEMO_CANDIDATES } from './data/mockCandidates';
import { SAMPLE_CONVERSATIONS } from './data/mockConversations';
import { INITIAL_MODULES, INITIAL_TASKS } from './data/certificationData';
import {
  INITIAL_AGENTS,
  INITIAL_CLIENTS,
  INITIAL_REQUIREMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_REFERRALS,
} from './data/platformData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Screen state: 'landing' (entry point) | 'agent_login' | 'candidate_login' | 'candidate_portal' | 'portal'
  const [screenState, setScreenState] = useState<
    'landing' | 'agent_login' | 'candidate_login' | 'candidate_portal' | 'portal'
  >(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#agent-login' || hash === '#login') return 'agent_login';
      if (hash === '#candidate-login') return 'candidate_login';
      if (hash === '#candidate-portal') return 'candidate_portal';
      if (hash === '#portal') return 'portal';
    }
    return 'landing';
  });

  const navigateTo = (
    state: 'landing' | 'agent_login' | 'candidate_login' | 'candidate_portal' | 'portal'
  ) => {
    setScreenState(state);
    try {
      if (typeof window !== 'undefined') {
        if (state === 'landing') {
          if (window.location.hash) window.location.hash = '';
        } else {
          window.location.hash = state.replace('_', '-');
        }
      }
    } catch {
      // Safe fallback if sandboxed iframe restricts history manipulation
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#agent-login' || hash === '#login') setScreenState('agent_login');
      else if (hash === '#candidate-login') setScreenState('candidate_login');
      else if (hash === '#candidate-portal') setScreenState('candidate_portal');
      else if (hash === '#portal') setScreenState('portal');
      else setScreenState('landing');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme support (PRD Section 15: Theming)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Currently authenticated agent (default Harika Reddy AGT-001)
  const [currentAgent, setCurrentAgent] = useState<Agent>(INITIAL_AGENTS[0]);

  // Currently authenticated candidate for candidate self-service
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>(
    Object.values(DEMO_CANDIDATES)[0][0]
  );

  // Platform state
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(INITIAL_SUBMISSIONS);
  const [referrals, setReferrals] = useState<AgentReferral[]>(INITIAL_REFERRALS);

  // Agent Portal active navigation tab: default 'Home' as per PRD Section 8 & US-1
  const [activeNav, setActiveNav] = useState('Home');
  const [selectedJobId, setSelectedJobId] = useState<JobId>('frontend');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [licenceToast, setLicenceToast] = useState('');

  // ================= TASKS & CERTIFICATION STATE =================
  const [modules, setModules] = useState<CertificationModule[]>(INITIAL_MODULES);
  const [tasks, setTasks] = useState<CertificationTask[]>(INITIAL_TASKS);
  const [activeCertNumber, setActiveCertNumber] = useState<number>(1);
  const [activeTaskDetail, setActiveTaskDetail] = useState<CertificationTask | null>(null);
  const [isHowTasksWorkOpen, setIsHowTasksWorkOpen] = useState(false);

  // ================= INBOX STATE =================
  const [selectedInboxFolder, setSelectedInboxFolder] = useState<InboxFolder>('inbox');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [hasDemoConversations, setHasDemoConversations] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // ================= CANDIDATES / JOBS STATE =================
  const [sortField, setSortField] = useState('created');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({
    name: true,
    phone: true,
    email: true,
    created: true,
    stage: true,
    source: true,
    lastActivity: true,
  });
  const [filters, setFilters] = useState<any[]>([]);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<Set<string>>(new Set());

  // Candidates database map & Active Profile Candidate ID
  const [candidatesMap, setCandidatesMap] = useState<Record<string, Candidate[]>>(DEMO_CANDIDATES);
  const [activeProfileCandidateId, setActiveProfileCandidateId] = useState<string | null>(null);

  // Flattened all candidates
  const allCandidatesList = useMemo(() => {
    return Object.values(candidatesMap).flat();
  }, [candidatesMap]);

  // Raw candidates based on selected job role
  const rawCandidates: Candidate[] = useMemo(() => {
    if (selectedJobId === 'all-jobs') {
      return allCandidatesList;
    }
    return candidatesMap[selectedJobId] || [];
  }, [selectedJobId, candidatesMap, allCandidatesList]);

  // Find active profile candidate
  const activeProfileCandidate: Candidate | undefined = useMemo(() => {
    if (!activeProfileCandidateId) return undefined;
    return allCandidatesList.find((c) => c.id === activeProfileCandidateId);
  }, [activeProfileCandidateId, allCandidatesList]);

  // Update candidate record handler (e.g. reassign agent, add note, change stage)
  const handleUpdateCandidate = (updated: Candidate) => {
    setCandidatesMap((prev) => {
      const next: Record<string, Candidate[]> = {};
      for (const [key, list] of Object.entries(prev)) {
        next[key] = list.map((c) => (c.id === updated.id ? updated : c));
      }
      return next;
    });
  };

  // Add new candidate (full page)
  const handleSaveNewCandidate = (newCand: Candidate) => {
    const jobKey = newCand.jobId || 'frontend';
    setCandidatesMap((prev) => ({
      ...prev,
      [jobKey]: [newCand, ...(prev[jobKey] || [])],
    }));
    setIsAddingCandidate(false);
    setSelectedJobId(jobKey as JobId);
    setActiveNav('My Candidates');
  };

  // Filtered & searched candidates
  const candidates: Candidate[] = useMemo(() => {
    let list = rawCandidates;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.stage.toLowerCase().includes(q) ||
          c.source.toLowerCase().includes(q)
      );
    }

    if (filters.length > 0) {
      list = list.filter((c) => {
        return filters.every((rule) => {
          const val = (c as any)[rule.field.toLowerCase()] || '';
          if (rule.condition === 'is') return val.toLowerCase() === rule.value.toLowerCase();
          if (rule.condition === 'is not') return val.toLowerCase() !== rule.value.toLowerCase();
          if (rule.condition === 'contains')
            return val.toLowerCase().includes(rule.value.toLowerCase());
          return true;
        });
      });
    }

    return list.map((c) => ({
      ...c,
      selected: selectedCandidateIds.has(c.id),
    }));
  }, [rawCandidates, searchQuery, filters, selectedCandidateIds]);

  // Mark Course Complete handler for Licence-Pending Agent (PRD Section 7 & US-2)
  const handleMarkCourseComplete = (courseId: string) => {
    const updatedCourses = currentAgent.courses.map((c) =>
      c.id === courseId
        ? { ...c, status: 'Completed' as const, completedDate: 'Today' }
        : c
    );

    const allDone = updatedCourses.every((c) => c.status === 'Completed');
    const updatedAgent: Agent = {
      ...currentAgent,
      courses: updatedCourses,
      licenceStatus: allDone ? 'active' : currentAgent.licenceStatus,
      licencePaid: allDone ? true : currentAgent.licencePaid,
    };

    setCurrentAgent(updatedAgent);

    if (allDone && currentAgent.licenceStatus === 'pending') {
      setLicenceToast(
        `🎉 Congratulations ${currentAgent.name}! All SB-CSP courses completed. Your StaffingBees license is now FULLY ACTIVE and all navigation tabs are unlocked!`
      );
      setTimeout(() => {
        setLicenceToast('');
      }, 7000);
    }
  };

  // Add client
  const handleAddClient = (client: Client) => {
    setClients([client, ...clients]);
  };

  // Add requirement
  const handleAddRequirement = (req: Requirement) => {
    setRequirements([req, ...requirements]);
  };

  // Add submission
  const handleAddSubmission = (submission: SubmissionRecord) => {
    setSubmissions([submission, ...submissions]);
  };

  // Add referral
  const handleAddReferral = (referral: AgentReferral) => {
    setReferrals([referral, ...referrals]);
  };

  // Admin Approve referral
  const handleAdminApproveReferral = (refId: string, issuedAgentId: string, note: string) => {
    setReferrals((prev) =>
      prev.map((r) =>
        r.id === refId
          ? {
              ...r,
              status: 'approved',
              issuedAgentId,
              adminNotes: note,
              reviewedDate: 'Today',
            }
          : r
      )
    );
  };

  // Admin Decline referral
  const handleAdminDeclineReferral = (refId: string, note: string) => {
    setReferrals((prev) =>
      prev.map((r) =>
        r.id === refId
          ? {
              ...r,
              status: 'rejected',
              adminNotes: note,
              reviewedDate: 'Today',
            }
          : r
      )
    );
  };

  // ================= TASK COMPLETION & UNLOCK LOGIC =================
  const handleCompleteTask = (taskId: string, submission: string, passed?: boolean) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status: 'completed' as const,
            submission: submission || t.submission,
          }
        : t
    );
    setTasks(updatedTasks);

    const taskObj = tasks.find((t) => t.id === taskId);
    if (!taskObj) return;

    const certNum = taskObj.certNumber;
    const certTasks = updatedTasks.filter((t) => t.certNumber === certNum);
    const mandatoryTasks = certTasks.filter((t) => !t.isAssessment);
    const allMandatoryDone = mandatoryTasks.every((t) => t.status === 'completed');
    const assessmentTask = certTasks.find((t) => t.isAssessment);
    const assessmentPassed = assessmentTask ? assessmentTask.status === 'completed' : true;

    setModules((prevModules) =>
      prevModules.map((m) => {
        if (m.number === certNum) {
          if (allMandatoryDone && assessmentPassed) {
            return { ...m, status: 'completed' };
          }
          if (allMandatoryDone && !assessmentPassed) {
            return { ...m, status: 'assessment_pending' };
          }
          return { ...m, status: 'in_progress' };
        }

        if (m.number === certNum + 1 && allMandatoryDone && assessmentPassed) {
          if (m.status === 'locked') {
            return { ...m, status: 'in_progress' };
          }
        }

        return m;
      })
    );
  };

  const handleToggleTaskComplete = (taskId: string) => {
    const taskObj = tasks.find((t) => t.id === taskId);
    if (!taskObj) return;

    if (taskObj.status === 'completed') {
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, status: 'pending' as const } : t
      );
      setTasks(updatedTasks);
      setModules((prevModules) =>
        prevModules.map((m) =>
          m.number === taskObj.certNumber ? { ...m, status: 'in_progress' } : m
        )
      );
    } else {
      handleCompleteTask(taskId, taskObj.submission || 'Completed', true);
    }
  };

  // Jobs Actions
  const handleUpdateList = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 600);
  };

  const handleToggleSelectAll = () => {
    if (candidates.length === 0) return;
    const allSelected = candidates.every((c) => c.selected);
    if (allSelected) {
      setSelectedCandidateIds(new Set());
    } else {
      setSelectedCandidateIds(new Set(candidates.map((c) => c.id)));
    }
  };

  const handleToggleSelectCandidate = (id: string) => {
    setSelectedCandidateIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleResetColumns = () => {
    setVisibleColumns({
      name: true,
      phone: true,
      email: true,
      created: true,
      stage: true,
      source: true,
      lastActivity: true,
    });
  };

  // Inbox Actions
  const handleToggleDemoData = () => {
    if (hasDemoConversations) {
      setConversations([]);
      setSelectedConversation(null);
      setHasDemoConversations(false);
    } else {
      setConversations(SAMPLE_CONVERSATIONS);
      setHasDemoConversations(true);
    }
  };

  const handleSendMessage = (convId: string, text: string) => {
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Staffing Bees Recruiter',
      text,
      timestamp: 'Just now',
      isRecruiter: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const updated = {
            ...c,
            lastMessage: text,
            timestamp: 'Just now',
            messages: [...c.messages, newMsg],
          };
          if (selectedConversation?.id === convId) {
            setSelectedConversation(updated);
          }
          return updated;
        }
        return c;
      })
    );
  };

  const selectedCount = candidates.filter((c) => c.selected).length;
  const unreadConversationsCount = conversations.filter((c) => c.unread).length;

  // ========================================================
  // SCREEN 1: PUBLIC LANDING SCREEN
  // ========================================================
  if (screenState === 'landing') {
    return (
      <LandingPage
        onOpenAgentLogin={() => navigateTo('agent_login')}
        onOpenCandidateLogin={() => navigateTo('candidate_login')}
        onExploreJobs={() => {
          setActiveNav('My Candidates');
          navigateTo('portal');
        }}
        onOpenAdmin={() => {
          setActiveNav('Admin');
          navigateTo('portal');
        }}
      />
    );
  }

  // ========================================================
  // SCREEN 2: AGENT LOGIN SCREEN
  // ========================================================
  if (screenState === 'agent_login') {
    return (
      <AgentLoginPage
        onLoginSuccess={(agent) => {
          setCurrentAgent(agent);
          setActiveNav('Home');
          navigateTo('portal');
        }}
        onBackToLanding={() => navigateTo('landing')}
        onSwitchToCandidateLogin={() => navigateTo('candidate_login')}
      />
    );
  }

  // ========================================================
  // SCREEN 3: CANDIDATE LOGIN SCREEN
  // ========================================================
  if (screenState === 'candidate_login') {
    return (
      <CandidateLoginPage
        onLoginSuccess={(candidate) => {
          setCurrentCandidate(candidate);
          navigateTo('candidate_portal');
        }}
        onBackToLanding={() => navigateTo('landing')}
        onSwitchToAgentLogin={() => navigateTo('agent_login')}
      />
    );
  }

  // ========================================================
  // SCREEN 4: CANDIDATE SELF-SERVICE PORTAL
  // ========================================================
  if (screenState === 'candidate_portal') {
    return (
      <CandidatePortal
        candidate={currentCandidate}
        onLogout={() => navigateTo('landing')}
      />
    );
  }

  // ========================================================
  // SCREEN 5: AGENT PORTAL (PRD COMPLIANT)
  // ========================================================
  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden font-sans antialiased ${
        theme === 'dark' ? 'bg-[#0b0f19] text-gray-100' : 'bg-[#ebedf0] text-gray-800'
      }`}
    >
      {/* 1. Top Navigation Bar (PRD Section 8 & 13) */}
      <TopNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavClick={(nav) => {
          setActiveNav(nav);
          setIsAddingCandidate(false);
          setActiveProfileCandidateId(null);
        }}
        onLogout={() => navigateTo('landing')}
        currentAgent={currentAgent}
        onSwitchAgent={(agent) => setCurrentAgent(agent)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      {/* Confirmation Toast (e.g. licence unlocked) */}
      {licenceToast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md z-40">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>{licenceToast}</span>
          </div>
          <button
            onClick={() => setLicenceToast('')}
            className="text-emerald-100 hover:text-white font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* =================== VIEW: HOME (DEFAULT) =================== */}
      {activeNav.toLowerCase() === 'home' && (
        <AgentHomeView
          currentAgent={currentAgent}
          candidatesCount={allCandidatesList.length}
          clientsCount={clients.length}
          requirementsCount={requirements.length}
          submissionsCount={submissions.length}
          placementsCount={
            submissions.filter((s) => s.status === 'Placed').length || 1
          }
          onNavigate={(nav) => setActiveNav(nav)}
          onMarkCourseComplete={handleMarkCourseComplete}
          onOpenService={(srvId) => {
            if (srvId === 'srv-training' || srvId === 'srv-cert') {
              setActiveNav('Training & Certification');
            } else {
              setActiveNav('All Services');
            }
          }}
        />
      )}

      {/* =================== VIEW: FULL DASHBOARD =================== */}
      {activeNav.toLowerCase() === 'full dashboard' && (
        <FullDashboardView
          candidates={allCandidatesList}
          clients={clients}
          requirements={requirements}
          submissions={submissions}
          onSelectCandidate={(cand) => {
            setActiveProfileCandidateId(cand.id);
            setActiveNav('My Candidates');
          }}
          onNavigate={(nav) => setActiveNav(nav)}
        />
      )}

      {/* =================== VIEW: MY CLIENTS =================== */}
      {activeNav.toLowerCase() === 'my clients' && (
        <MyClientsView
          clients={clients}
          requirements={requirements}
          onAddClient={handleAddClient}
          onAddRequirement={handleAddRequirement}
          onNavigateToRequirementDetail={(req) => {
            setActiveNav('Available Requirements');
          }}
        />
      )}

      {/* =================== VIEW: AVAILABLE REQUIREMENTS =================== */}
      {activeNav.toLowerCase() === 'available requirements' && (
        <AvailableRequirementsView
          requirements={requirements}
          candidates={allCandidatesList}
          currentAgent={currentAgent}
          onSubmitCandidate={handleAddSubmission}
        />
      )}

      {/* =================== VIEW: MY SUBMISSIONS =================== */}
      {activeNav.toLowerCase() === 'my submissions' && (
        <MySubmissionsView
          submissions={submissions}
          candidates={allCandidatesList}
          requirements={requirements}
          currentAgent={currentAgent}
          onAddSubmission={handleAddSubmission}
          onUpdateSubmissionStatus={(id, newStatus) => {
            setSubmissions((prev) =>
              prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
            );
          }}
        />
      )}

      {/* =================== VIEW: MY AGENT REFERRALS =================== */}
      {activeNav.toLowerCase() === 'my agent referrals' && (
        <MyAgentReferralsView
          referrals={referrals}
          currentAgent={currentAgent}
          onAddReferral={handleAddReferral}
        />
      )}

      {/* =================== VIEW: MY FINANCIALS =================== */}
      {activeNav.toLowerCase() === 'my financials' && (
        <MyFinancialsView
          currentAgent={currentAgent}
          submissions={submissions}
        />
      )}

      {/* =================== VIEW: TRAINING & CERTIFICATION (SB-CSP) =================== */}
      {activeNav.toLowerCase() === 'training & certification' && (
        <TasksView
          modules={modules}
          tasks={tasks}
          activeCertNumber={activeCertNumber}
          onSelectCert={setActiveCertNumber}
          onOpenTaskDetail={setActiveTaskDetail}
          onToggleTaskComplete={handleToggleTaskComplete}
          onOpenHowTasksWork={() => setIsHowTasksWorkOpen(true)}
        />
      )}

      {/* =================== VIEW: ALL SERVICES =================== */}
      {activeNav.toLowerCase() === 'all services' && (
        <AllServicesView
          onNavigateToCourseCatalog={() => setActiveNav('Training & Certification')}
        />
      )}

      {/* =================== VIEW: ADMIN =================== */}
      {activeNav.toLowerCase() === 'admin' && (
        <AdminReviewView
          referrals={referrals}
          onApproveReferral={handleAdminApproveReferral}
          onDeclineReferral={handleAdminDeclineReferral}
          onBackToPortal={() => setActiveNav('Home')}
        />
      )}

      {/* =================== VIEW: MY CANDIDATES =================== */}
      {(activeNav.toLowerCase() === 'my candidates' ||
        activeNav.toLowerCase() === 'jobs/candidates') && (
        <div className="flex-1 flex overflow-hidden min-w-[900px]">
          {isAddingCandidate ? (
            /* Full-page Add Candidate (PRD Section 8 & 12 US-3) */
            <AddCandidateView
              currentAgent={currentAgent}
              onSaveCandidate={handleSaveNewCandidate}
              onCancel={() => setIsAddingCandidate(false)}
            />
          ) : activeProfileCandidate ? (
            /* Candidate Profile View (14 Tabs, CPI, Preserved Return Flow) */
            <CandidateProfileView
              candidate={activeProfileCandidate}
              onBack={() => setActiveProfileCandidateId(null)}
              onUpdateCandidate={handleUpdateCandidate}
            />
          ) : (
            <>
              {/* Left Sidebar */}
              <Sidebar
                selectedJobId={selectedJobId}
                onSelectJob={(id) => {
                  setSelectedJobId(id);
                  setSelectedCandidateIds(new Set());
                }}
                collapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />

              {/* Main Content Container */}
              <main className="flex-1 flex flex-col overflow-y-auto bg-[#ebedf0]">
                <ActionToolbar
                  selectedCount={selectedCount}
                  totalCount={candidates.length}
                  activeListName="Pipelined Candidates"
                  onUpdateList={handleUpdateList}
                  isUpdating={isUpdating}
                  onOpenColumns={() => setIsColumnsModalOpen(true)}
                  onOpenFilters={() => setIsFiltersModalOpen(true)}
                  onOpenHelp={() => setIsHelpModalOpen(true)}
                  activeFilterCount={filters.length}
                  onAddCandidate={() => setIsAddingCandidate(true)}
                />

                <PeopleTable
                  candidates={candidates}
                  onToggleSelectAll={handleToggleSelectAll}
                  onToggleSelectCandidate={handleToggleSelectCandidate}
                  allSelected={
                    candidates.length > 0 && candidates.every((c) => c.selected)
                  }
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  visibleColumns={visibleColumns}
                  onSelectCandidate={(candidate) =>
                    setActiveProfileCandidateId(candidate.id)
                  }
                />
              </main>
            </>
          )}
        </div>
      )}

      {/* =================== VIEW: INBOX =================== */}
      {activeNav.toLowerCase() === 'inbox' && (
        <div className="flex-1 flex overflow-hidden min-w-[900px]">
          <InboxSidebar
            selectedFolder={selectedInboxFolder}
            onSelectFolder={(folder) => {
              setSelectedInboxFolder(folder);
              setSelectedConversation(null);
            }}
            unreadCount={unreadConversationsCount}
          />
          <InboxView
            selectedFolder={selectedInboxFolder}
            conversations={conversations}
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            onSendMessage={handleSendMessage}
            onToggleDemoData={handleToggleDemoData}
            hasDemoData={hasDemoConversations}
          />
        </div>
      )}

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={activeTaskDetail}
        isOpen={!!activeTaskDetail}
        onClose={() => setActiveTaskDetail(null)}
        onCompleteTask={handleCompleteTask}
      />

      {/* How Tasks Work Modal */}
      <HowTasksWorkModal
        isOpen={isHowTasksWorkOpen}
        onClose={() => setIsHowTasksWorkOpen(false)}
      />

      {/* Video / Walkthrough Modal for Inbox */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Modals & Popovers for Jobs view */}
      <ColumnsModal
        isOpen={isColumnsModalOpen}
        onClose={() => setIsColumnsModalOpen(false)}
        visibleColumns={visibleColumns}
        onToggleColumn={handleToggleColumn}
        onResetColumns={handleResetColumns}
      />

      <FilterModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
        onClearFilters={() => setFilters([])}
      />

      <SmartListsModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
