import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  BookOpen,
  DollarSign,
  FileText,
  ShieldCheck,
  Send,
  Building,
  ExternalLink,
  Plus,
  Edit3,
  UserCheck,
  Globe,
  Share2,
  Lock,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { Candidate, CandidateNote } from '../types';

interface CandidateProfileViewProps {
  candidate: Candidate;
  onBack: () => void;
  onUpdateCandidate: (updated: Candidate) => void;
}

export const CandidateProfileView: React.FC<CandidateProfileViewProps> = ({
  candidate,
  onBack,
  onUpdateCandidate,
}) => {
  // Active Tab state
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'personal'
    | 'professional'
    | 'employment'
    | 'compensation'
    | 'location'
    | 'skills'
    | 'education'
    | 'training'
    | 'verification'
    | 'readiness'
    | 'jobs_pipeline'
    | 'documents_consent'
    | 'activity_notes'
  >('overview');

  // Modals & form state
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [selectedNewAgent, setSelectedNewAgent] = useState(candidate.currentAssignedAgent);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteCategory, setNoteCategory] = useState('Candidate Summary');
  const [noteContent, setNoteContent] = useState('');
  const [isChangeStageModalOpen, setIsChangeStageModalOpen] = useState(false);

  const availableAgents = [
    'Rahul Verma',
    'Priya Sharma',
    'Amit Patel',
    'Siddharth Rao',
    'Deepak Mehrotra',
    'Neha Singh',
  ];

  const pipelineStages = [
    'New',
    'Contacted',
    'Intake Completed',
    'Verified',
    'Qualified',
    'Coaching',
    'Market Ready',
    'Matched',
    'Interest Confirmed',
    'Submitted',
    'Screening',
    'Interview',
    'Offer',
    'Placed',
  ];

  // Reassign agent handler
  const handleReassign = () => {
    if (!selectedNewAgent || selectedNewAgent === candidate.currentAssignedAgent) {
      setIsReassignModalOpen(false);
      return;
    }

    const newTimelineItem = {
      id: Date.now().toString(),
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: 'Current Agent',
      action: 'Candidate Reassigned',
      notes: `Reassigned from ${candidate.currentAssignedAgent} to ${selectedNewAgent}. Original source agent ${candidate.originalSourceAgent} retained.`,
    };

    const updated: Candidate = {
      ...candidate,
      currentAssignedAgent: selectedNewAgent,
      lastUpdated: 'Just now',
      timeline: [newTimelineItem, ...(candidate.timeline || [])],
    };

    onUpdateCandidate(updated);
    setIsReassignModalOpen(false);
  };

  // Add note handler
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newNote: CandidateNote = {
      id: Date.now().toString(),
      category: noteCategory,
      author: candidate.currentAssignedAgent || 'Agent',
      date: 'Today',
      content: noteContent.trim(),
    };

    const newTimelineItem = {
      id: Date.now().toString(),
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: candidate.currentAssignedAgent || 'Agent',
      action: `Note Added (${noteCategory})`,
      notes: noteContent.trim(),
    };

    const updated: Candidate = {
      ...candidate,
      notes: [newNote, ...(candidate.notes || [])],
      timeline: [newTimelineItem, ...(candidate.timeline || [])],
    };

    onUpdateCandidate(updated);
    setNoteContent('');
    setIsAddNoteModalOpen(false);
  };

  // Change stage handler
  const handleChangeStage = (newStage: string) => {
    const newTimelineItem = {
      id: Date.now().toString(),
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: candidate.currentAssignedAgent || 'Agent',
      action: `Stage Changed to ${newStage}`,
      notes: `Candidate pipeline stage moved from ${candidate.stage} to ${newStage}.`,
    };

    const updated: Candidate = {
      ...candidate,
      stage: newStage,
      lastUpdated: 'Just now',
      timeline: [newTimelineItem, ...(candidate.timeline || [])],
    };

    onUpdateCandidate(updated);
    setIsChangeStageModalOpen(false);
  };

  const currentStageIndex = pipelineStages.findIndex(
    (s) => s.toLowerCase() === candidate.stage.toLowerCase()
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-y-auto select-none font-sans text-xs">
      {/* 1. TOP BREADCRUMB & BACK ACTION BAR */}
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#1d4ed8] font-semibold text-xs transition-colors cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center text-gray-600 group-hover:text-[#1d4ed8] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span>Back to Pipelined Candidates</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-[11px]">Candidate ID:</span>
          <span className="font-mono text-gray-800 font-semibold px-2 py-0.5 bg-gray-100 rounded text-[11px]">
            {candidate.id}
          </span>
          <button
            onClick={() => setIsChangeStageModalOpen(true)}
            className="px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center space-x-1"
          >
            <Edit3 className="w-3 h-3 text-gray-500" />
            <span>Change Stage ({candidate.stage})</span>
          </button>
          <button
            onClick={() => setIsReassignModalOpen(true)}
            className="px-2.5 py-1 bg-white border border-[#1d4ed8] text-[#1d4ed8] hover:bg-blue-50 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center space-x-1"
          >
            <UserCheck className="w-3 h-3" />
            <span>Reassign Agent</span>
          </button>
          <button
            onClick={() => setIsAddNoteModalOpen(true)}
            className="px-2.5 py-1 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* 2. PROFILE HERO HEADER (Section 4) */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Avatar and Primary Details */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1d4ed8] to-[#0f172a] text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-md border-2 border-white">
              {candidate.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center space-x-2.5 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  {candidate.name}
                </h1>
                {candidate.preferredName && (
                  <span className="text-gray-400 text-xs">
                    ({candidate.preferredName})
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {candidate.status}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {candidate.stage}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {candidate.readiness}
                </span>
              </div>

              <div className="flex items-center space-x-4 mt-1.5 text-gray-600 flex-wrap text-xs">
                <span className="font-semibold text-gray-800">
                  {candidate.currentRole}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">
                  Target: <strong className="text-gray-900">{candidate.targetRole}</strong>
                </span>
                <span className="text-gray-300">•</span>
                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">
                  {candidate.level}
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center text-gray-500">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  {candidate.location}
                </span>
              </div>

              <div className="flex items-center space-x-4 mt-2 text-[11px] text-gray-500">
                <span>Created: <strong>{candidate.created}</strong></span>
                <span>•</span>
                <span>Last Updated: <strong>{candidate.lastUpdated || candidate.created}</strong></span>
                <span>•</span>
                <span>Employment: <strong>{candidate.employment?.employmentStatus || 'Employed'}</strong></span>
              </div>
            </div>
          </div>

          {/* CRITICAL AGENT OWNERSHIP DISPLAY (Section 8) */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-3.5 min-w-[290px] shadow-2xs">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              StaffingBees Agent Assignment
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Original Source Agent:</span>
                </div>
                <span className="font-bold text-gray-900 bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                  {candidate.originalSourceAgent}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/70">
                <div className="flex items-center space-x-1.5 text-gray-600">
                  <UserCheck className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                  <span>Current Assigned Agent:</span>
                </div>
                <span className="font-bold text-[#1d4ed8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {candidate.currentAssignedAgent}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PIPELINE STAGE TRACKER (Section 21) */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Candidate Pipeline Journey
            </span>
            <span className="text-xs text-gray-500">
              Current Stage: <strong className="text-[#1d4ed8]">{candidate.stage}</strong>
            </span>
          </div>

          <div className="flex items-center w-full overflow-x-auto pb-2 scrollbar-thin">
            {pipelineStages.map((stage, idx) => {
              const isPassed = currentStageIndex >= idx;
              const isCurrent =
                candidate.stage.toLowerCase() === stage.toLowerCase();
              return (
                <div
                  key={stage}
                  onClick={() => handleChangeStage(stage)}
                  title={`Click to set stage to ${stage}`}
                  className="flex items-center shrink-0 cursor-pointer group"
                >
                  <div
                    className={`flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                      isCurrent
                        ? 'bg-[#1d4ed8] text-white shadow-xs font-bold ring-2 ring-blue-300'
                        : isPassed
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}
                  >
                    <span>{stage}</span>
                  </div>
                  {idx < pipelineStages.length - 1 && (
                    <div
                      className={`w-3 sm:w-4 h-0.5 mx-0.5 ${
                        isPassed && currentStageIndex > idx
                          ? 'bg-blue-300'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. NAVIGATION TABS (Sections 6-29) */}
      <div className="bg-white border-b border-gray-200 px-6 sticky top-[49px] z-10">
        <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
          {[
            { id: 'overview', label: '1. Overview' },
            { id: 'personal', label: '2. Personal' },
            { id: 'professional', label: '3. Professional' },
            { id: 'employment', label: '4. Employment' },
            { id: 'compensation', label: '5. Compensation' },
            { id: 'location', label: '6. Location & Availability' },
            { id: 'skills', label: '7. Skills' },
            { id: 'education', label: '8. Education & Certs' },
            { id: 'training', label: '9. Training & Development' },
            { id: 'verification', label: '10. Verification & Auth' },
            { id: 'readiness', label: '11. Readiness & Coaching' },
            { id: 'jobs_pipeline', label: '12. Jobs & Submissions' },
            { id: 'documents_consent', label: '13. Documents & Consent' },
            { id: 'activity_notes', label: '14. Activity & Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#1d4ed8] text-[#1d4ed8] bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 5. TAB CONTENT PANELS */}
      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW (Section 7) */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Grid matching specification Section 7 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Candidate Level
                </span>
                <span className="text-sm font-bold text-gray-900">{candidate.level}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Employment Status
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {candidate.employment?.employmentStatus || 'Employed'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Candidate Training
                </span>
                <span className={`text-sm font-bold ${candidate.training?.trainingRequired ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {candidate.training?.trainingRequired ? 'Required' : 'Completed / None'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Current Salary
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {candidate.compensation?.currentSalary || 'N/A'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Expected Salary
                </span>
                <span className="text-sm font-bold text-[#1d4ed8]">
                  {candidate.compensation?.expectedSalary || 'N/A'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Availability / Notice
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {candidate.employment?.noticePeriod || 'Immediate'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Location
                </span>
                <span className="text-sm font-bold text-gray-900">{candidate.location}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Verification Status
                </span>
                <span className="text-sm font-bold text-emerald-600 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" />
                  {candidate.verification?.overallStatus || 'Verified'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Interview Readiness
                </span>
                <span className="text-sm font-bold text-gray-900">{candidate.readiness}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Market Ready Status
                </span>
                <span className="text-sm font-bold text-[#1d4ed8]">
                  {candidate.readinessDetails?.marketReadyStatus || 'Market Ready'}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-amber-200 bg-amber-50/30 shadow-2xs">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  Source Agent (Fixed)
                </span>
                <span className="text-sm font-bold text-amber-900">{candidate.originalSourceAgent}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 shadow-2xs">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                  Assigned Agent
                </span>
                <span className="text-sm font-bold text-[#1d4ed8]">{candidate.currentAssignedAgent}</span>
              </div>
            </div>

            {/* Professional Summary & Top Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-4">
                <h3 className="font-bold text-gray-900 text-sm flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                  <span>Executive Candidate Summary</span>
                </h3>
                <p className="text-gray-700 leading-relaxed text-xs">
                  {candidate.professionalSummary || 'No executive summary provided.'}
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center space-x-6 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Total Experience:</span>
                    <strong className="text-gray-800">{candidate.totalExperience || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Relevant Experience:</span>
                    <strong className="text-gray-800">{candidate.relevantExperience || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Domain:</span>
                    <strong className="text-gray-800">{candidate.domain || 'Technology'}</strong>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-3">
                <h3 className="font-bold text-gray-900 text-sm flex items-center justify-between">
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-amber-500" />
                    <span>Primary Skills</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="text-[11px] text-[#1d4ed8] hover:underline"
                  >
                    View All ({candidate.skills?.length || 0})
                  </button>
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.skills?.slice(0, 6).map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded bg-gray-100 text-gray-800 text-[11px] font-medium border border-gray-200"
                    >
                      {skill.name}{' '}
                      <span className="text-gray-500 text-[10px]">({skill.years})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PERSONAL INFORMATION (Section 9) */}
        {/* ========================================================= */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
              <User className="w-4 h-4 mr-2 text-[#1d4ed8]" />
              <span>Personal & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Full Name</label>
                <div className="text-sm font-bold text-gray-900">{candidate.name}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Preferred Name</label>
                <div className="text-sm text-gray-800">{candidate.preferredName || candidate.name}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Email Address</label>
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm text-gray-900 font-medium">{candidate.email}</span>
                  {candidate.emailVerified ? (
                    <span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-semibold">
                      Verified ✓
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px]">Unverified</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Phone Number</label>
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm text-gray-900 font-medium">{candidate.phone}</span>
                  {candidate.phoneVerified ? (
                    <span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-semibold">
                      Verified ✓
                    </span>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Alternate Phone</label>
                <div className="text-sm text-gray-700">{candidate.altPhone || 'None specified'}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Preferred Contact Method</label>
                <div className="text-sm text-gray-900 font-semibold">{candidate.preferredContactMethod || 'WhatsApp'}</div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Preferred Communication Window</label>
                <div className="text-sm text-gray-800">{candidate.preferredCommunicationTime || 'Standard Business Hours (9 AM - 6 PM IST)'}</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROFESSIONAL INFORMATION (Section 10) */}
        {/* ========================================================= */}
        {activeTab === 'professional' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-[#1d4ed8]" />
              <span>Professional Profile & External Links</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Current Job Title</label>
                <div className="text-sm font-bold text-gray-900">{candidate.currentRole}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Target Job Title</label>
                <div className="text-sm font-bold text-[#1d4ed8]">{candidate.targetRole}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Career Level</label>
                <div className="text-sm text-gray-800">{candidate.level}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Industry</label>
                <div className="text-sm text-gray-800">{candidate.industry || 'Information Technology'}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Domain</label>
                <div className="text-sm text-gray-800">{candidate.domain || 'Software Engineering'}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Total & Relevant Experience</label>
                <div className="text-sm text-gray-900">
                  {candidate.totalExperience} (Relevant: {candidate.relevantExperience})
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3 text-xs">External Portfolios & Profiles (Clickable)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {candidate.links?.resume && (
                  <a
                    href={candidate.links.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100 flex items-center justify-between text-xs text-blue-900 font-semibold transition-colors"
                  >
                    <span>View Resume (PDF)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {candidate.links?.linkedin && (
                  <a
                    href={candidate.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-xs text-gray-800 font-semibold transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {candidate.links?.github && (
                  <a
                    href={candidate.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-xs text-gray-800 font-semibold transition-colors"
                  >
                    <span>GitHub Repositories</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {candidate.links?.portfolio && (
                  <a
                    href={candidate.links.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 flex items-center justify-between text-xs text-purple-900 font-semibold transition-colors"
                  >
                    <span>Design Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EMPLOYMENT INFORMATION (Section 11) */}
        {/* ========================================================= */}
        {activeTab === 'employment' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
              <Building className="w-4 h-4 mr-2 text-[#1d4ed8]" />
              <span>Current & Previous Employment History</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Current Employer</label>
                <div className="text-sm font-bold text-gray-900">
                  {candidate.employment?.currentEmployer || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Current Job Title</label>
                <div className="text-sm text-gray-800">
                  {candidate.employment?.currentTitle || candidate.currentRole}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Employment Status</label>
                <div className="text-sm font-semibold text-gray-900">
                  {candidate.employment?.employmentStatus || 'Employed'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Employment Type</label>
                <div className="text-sm text-gray-800">
                  {candidate.employment?.employmentType || 'Full-time'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Joining Date</label>
                <div className="text-sm text-gray-800">
                  {candidate.employment?.joiningDate || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Notice Period</label>
                <div className="text-sm font-bold text-[#1d4ed8]">
                  {candidate.employment?.noticePeriod || 'Immediate'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Last Working Day (if serving notice)</label>
                <div className="text-sm text-gray-800">
                  {candidate.employment?.lastWorkingDay || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Previous Employer</label>
                <div className="text-sm text-gray-800">
                  {candidate.employment?.previousEmployer || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Employment Gaps</label>
                <div className="text-sm text-gray-800">
                  {candidate.employment?.employmentGaps || 'None reported'}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Reason for Leaving</label>
                <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {candidate.employment?.reasonForLeaving || 'Career advancement opportunity.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: COMPENSATION (Section 12) */}
        {/* ========================================================= */}
        {activeTab === 'compensation' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                <span>Candidate Compensation (Pay Expectation vs. Client Billing Separate)</span>
              </h3>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-medium">
                Currency: {candidate.compensation?.currency || 'INR (₹)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Current Base Salary</label>
                <div className="text-lg font-bold text-gray-900">
                  {candidate.compensation?.currentSalary || 'N/A'}
                </div>
                <span className="text-[11px] text-gray-500">Pay Frequency: {candidate.compensation?.payFrequency || 'Monthly'}</span>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                <label className="block text-blue-600 text-[11px] font-semibold mb-1">Expected Salary</label>
                <div className="text-lg font-bold text-[#1d4ed8]">
                  {candidate.compensation?.expectedSalary || 'N/A'}
                </div>
                <span className="text-[11px] text-blue-700">Negotiable: {candidate.compensation?.negotiable ? 'Yes' : 'Firm'}</span>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <label className="block text-amber-700 text-[11px] font-semibold mb-1">Minimum Acceptable Salary (Floor)</label>
                <div className="text-lg font-bold text-amber-900">
                  {candidate.compensation?.minAcceptableSalary || 'N/A'}
                </div>
                <span className="text-[11px] text-amber-800">Do not submit below this threshold</span>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Hourly / Contractor Rate</label>
                <div className="text-sm font-semibold text-gray-800">
                  Current: {candidate.compensation?.currentRate || 'N/A'} | Expected: {candidate.compensation?.expectedRate || 'N/A'}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Candidate Benefits & Perks Request</label>
                <div className="text-sm text-gray-800">
                  {candidate.compensation?.benefits || 'Standard health insurance, flexible hours'}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Internal Compensation Notes</label>
                <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {candidate.compensation?.notes || 'No special compensation notes recorded.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: LOCATION & AVAILABILITY (Section 13) */}
        {/* ========================================================= */}
        {activeTab === 'location' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[#1d4ed8]" />
              <span>Location, Work Preferences & Shift Availability</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Current Location</label>
                <div className="text-sm font-bold text-gray-900">{candidate.location}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Preferred Location</label>
                <div className="text-sm font-semibold text-[#1d4ed8]">
                  {candidate.preferredLocation || candidate.location}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Work Preference Model</label>
                <div className="text-sm font-bold text-gray-900">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    {candidate.workPreference || 'Hybrid'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Relocation Preference</label>
                <div className="text-sm text-gray-800">
                  {candidate.relocationPreference || 'Within Country'}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Preferred Shift</label>
                <div className="text-sm text-gray-800">{candidate.preferredShift || 'Day Shift'}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Preferred Working Hours</label>
                <div className="text-sm text-gray-800">{candidate.preferredWorkingHours || '9:30 AM - 6:30 PM'}</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: SKILLS (Section 14) */}
        {/* ========================================================= */}
        {activeTab === 'skills' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-[#1d4ed8]" />
              <span>Skills Matrix (Primary, Secondary, Soft, Domain)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-500">
                    <th className="py-2.5 px-3 font-semibold">Skill Name</th>
                    <th className="py-2.5 px-3 font-semibold">Category</th>
                    <th className="py-2.5 px-3 font-semibold">Experience</th>
                    <th className="py-2.5 px-3 font-semibold">Proficiency</th>
                    <th className="py-2.5 px-3 font-semibold">Last Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidate.skills?.map((s) => (
                    <tr key={s.name} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-bold text-gray-900">{s.name}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          s.category === 'Primary' ? 'bg-blue-50 text-blue-700' :
                          s.category === 'Secondary' ? 'bg-gray-100 text-gray-700' :
                          s.category === 'Soft' ? 'bg-purple-50 text-purple-700' :
                          'bg-amber-50 text-amber-800'
                        }`}>
                          {s.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{s.years}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-gray-800">{s.proficiency}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500">{s.lastUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: EDUCATION & CERTIFICATIONS (Section 15) */}
        {/* ========================================================= */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                <span>Formal Education</span>
              </h3>

              <div className="space-y-3">
                {candidate.education?.map((edu, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xs">{edu.degree}</h4>
                      <span className="text-[11px] font-semibold text-gray-500">{edu.graduationYear}</span>
                    </div>
                    <p className="text-gray-700 text-xs mt-0.5">{edu.institution}</p>
                    {edu.specialization && (
                      <p className="text-gray-500 text-[11px] mt-1">Specialization: {edu.specialization}</p>
                    )}
                    {edu.additionalQualifications && (
                      <p className="text-emerald-700 text-[11px] font-medium mt-1">{edu.additionalQualifications}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-amber-500" />
                <span>Professional Certifications</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidate.certifications && candidate.certifications.length > 0 ? (
                  candidate.certifications.map((cert) => (
                    <div key={cert.name} className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-xs">{cert.name}</h4>
                        <p className="text-gray-600 text-[11px]">Issuer: {cert.issuer}</p>
                        <p className="text-gray-400 text-[10px]">Issued: {cert.issueDate} • Expires: {cert.expiryDate || 'None'}</p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-semibold">
                        Verified ✓
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">No external professional certifications uploaded.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: TRAINING & DEVELOPMENT (Section 16) */}
        {/* ========================================================= */}
        {activeTab === 'training' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                  <span>Candidate Training & Skill Development</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  (Note: Candidate training is distinct from StaffingBees Agent Certification)
                </p>
              </div>

              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                candidate.training?.trainingRequired ? 'bg-amber-100 text-amber-900' : 'bg-green-100 text-green-900'
              }`}>
                Training Required: {candidate.training?.trainingRequired ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Status</label>
                <div className="text-sm font-semibold text-gray-900">{candidate.training?.trainingStatus || 'None'}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Priority</label>
                <div className="text-sm font-semibold text-amber-700">{candidate.training?.trainingPriority || 'Low'}</div>
              </div>

              <div>
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Completion Progress</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#1d4ed8] h-2 rounded-full"
                      style={{ width: `${candidate.training?.completionPercentage || 0}%` }}
                    />
                  </div>
                  <span className="font-bold text-gray-800">{candidate.training?.completionPercentage || 0}%</span>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Identified Training Areas</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {candidate.training?.trainingAreas?.map((area) => (
                    <span key={area} className="px-3 py-1 bg-blue-50 text-blue-900 rounded-lg text-xs font-semibold border border-blue-200">
                      {area}
                    </span>
                  )) || <span className="text-gray-400 text-xs">No active training areas assigned.</span>}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-gray-400 text-[11px] font-semibold mb-1">Training Reason & Recommendation</label>
                <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-700">
                  <p><strong>Reason:</strong> {candidate.training?.trainingReason || 'N/A'}</p>
                  <p className="mt-1 text-[#1d4ed8] font-medium"><strong>Recommended Track:</strong> {candidate.training?.recommendedTraining || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 10: VERIFICATION & WORK AUTHORIZATION (Sections 17-18) */}
        {/* ========================================================= */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
                  <span>Verification Audit Checklist</span>
                </span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Overall: {candidate.verification?.overallStatus || 'Verified'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  { label: 'Contact Verification', val: candidate.verification?.contactVerified },
                  { label: 'Professional Verification', val: candidate.verification?.professionalVerified },
                  { label: 'Employment Verification', val: candidate.verification?.employmentVerified },
                  { label: 'Experience Verification', val: candidate.verification?.experienceVerified },
                  { label: 'Skills Verification', val: candidate.verification?.skillsVerified },
                  { label: 'Education Verification', val: candidate.verification?.educationVerified },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
                    <span className="text-gray-700 text-xs font-medium">{item.label}</span>
                    {item.val ? (
                      <span className="text-emerald-600 font-bold flex items-center text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold flex items-center text-xs">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" /> Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Duplicate Candidate Check</span>
                  <span className="font-semibold text-emerald-700">{candidate.verification?.duplicateCheck || 'Clear'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Suspicious Profile Check</span>
                  <span className="font-semibold text-emerald-700">{candidate.verification?.suspiciousProfileCheck || 'Passed'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Resume Consistency</span>
                  <span className="font-semibold text-gray-900">{candidate.verification?.resumeConsistency || 'Consistent'}</span>
                </div>
              </div>
            </div>

            {/* Work Authorization */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                <span>Work Authorization & Visa Status (Section 18)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-400 text-[11px] font-semibold mb-1">Authorization Status</label>
                  <div className="text-sm font-bold text-gray-900">{candidate.workAuthorization?.status || 'Authorized'}</div>
                </div>

                <div>
                  <label className="block text-gray-400 text-[11px] font-semibold mb-1">Authorization Type / Visa</label>
                  <div className="text-sm font-semibold text-gray-800">{candidate.workAuthorization?.type || 'Citizen'}</div>
                </div>

                <div>
                  <label className="block text-gray-400 text-[11px] font-semibold mb-1">Country</label>
                  <div className="text-sm text-gray-800">{candidate.workAuthorization?.country || 'India'}</div>
                </div>

                <div>
                  <label className="block text-gray-400 text-[11px] font-semibold mb-1">Sponsorship Required?</label>
                  <div className="text-sm font-bold text-gray-800">
                    {candidate.workAuthorization?.sponsorshipRequired ? 'Yes (Requires Visa Sponsorship)' : 'No Sponsorship Needed'}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-[11px] font-semibold mb-1">Authorization Notes & Verification</label>
                  <div className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    {candidate.workAuthorization?.notes || 'Authorized to work without restriction.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 11: READINESS & COACHING (Section 19) */}
        {/* ========================================================= */}
        {activeTab === 'readiness' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-6">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
              <span className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                <span>Candidate Interview Readiness & Coaching Status</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#1d4ed8] text-xs font-bold border border-blue-200">
                {candidate.readiness}
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Resume Readiness</span>
                <span className="font-bold text-emerald-700">{candidate.readinessDetails?.resumeReadiness || 'Ready'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Communication</span>
                <span className="font-bold text-gray-900">{candidate.readinessDetails?.communicationReadiness || 'High'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Technical Readiness</span>
                <span className="font-bold text-[#1d4ed8]">{candidate.readinessDetails?.technicalReadiness || 'Interview Ready'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Behavioral Readiness</span>
                <span className="font-bold text-emerald-700">{candidate.readinessDetails?.behavioralReadiness || 'Strong'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-xs">Coaching Action Items & Tasks</h4>
                <div className="space-y-1.5">
                  {candidate.readinessDetails?.coachingTasks.map((task) => {
                    const isDone = candidate.readinessDetails?.completedCoaching.includes(task);
                    return (
                      <div key={task} className="flex items-center space-x-2 text-xs p-2 rounded bg-gray-50 border border-gray-100">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                        <span className={isDone ? 'line-through text-gray-500' : 'font-medium text-gray-800'}>{task}</span>
                      </div>
                    );
                  }) || <p className="text-gray-400 text-xs">No coaching tasks scheduled.</p>}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-xs">Mock Interview Evaluation & Feedback</h4>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Mock Interview Status:</span>
                    <span className="font-bold text-emerald-700">{candidate.readinessDetails?.mockInterviewStatus || 'Cleared'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block mb-0.5">Last Evaluator Feedback:</span>
                    <p className="text-gray-800 italic">"{candidate.readinessDetails?.lastFeedback || 'Strong candidate demeanor and technical articulation.'}"</p>
                  </div>
                  {candidate.readinessDetails?.improvementAreas && candidate.readinessDetails.improvementAreas.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-amber-800 font-semibold block mb-0.5">Improvement Opportunities:</span>
                      <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                        {candidate.readinessDetails.improvementAreas.map((area, i) => (
                          <li key={i}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 12: JOBS, SUBMISSIONS, INTERVIEWS, OFFERS (Sections 20, 22-25) */}
        {/* ========================================================= */}
        {activeTab === 'jobs_pipeline' && (
          <div className="space-y-6">
            {/* Job Matches (Section 20) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                  <span>Matched Client Opportunities (Section 20)</span>
                </span>
                <span className="text-xs text-gray-500">
                  {candidate.jobMatches?.length || 0} Matched Roles
                </span>
              </h3>

              <div className="space-y-3">
                {candidate.jobMatches && candidate.jobMatches.length > 0 ? (
                  candidate.jobMatches.map((jm) => (
                    <div key={jm.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{jm.jobTitle}</h4>
                          <p className="text-xs text-gray-600">{jm.client} • Opportunity ID: {jm.opportunityId}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded text-xs border border-emerald-200">
                          {jm.matchStatus}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                        <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-gray-700">Skill Match ✓</span>
                        <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-gray-700">Experience Match ✓</span>
                        <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-gray-700">Location Match ✓</span>
                        <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-gray-700">Work Model Match ✓</span>
                        <span className="px-2 py-0.5 bg-white rounded border border-gray-200 text-gray-700">Compensation Match ✓</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200/70 text-xs">
                        <span className="text-gray-600">Candidate Interest: <strong>{jm.candidateInterest}</strong></span>
                        <span className="font-bold text-[#1d4ed8]">Status: {jm.submissionStatus}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">No active opportunity matches for this candidate at this stage.</p>
                )}
              </div>
            </div>

            {/* Submissions & Interviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Submissions (Section 22) */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-3">
                <h3 className="font-bold text-gray-900 text-xs border-b border-gray-100 pb-2">
                  Client Submissions (Section 22)
                </h3>
                {candidate.submissions && candidate.submissions.length > 0 ? (
                  candidate.submissions.map((sub) => (
                    <div key={sub.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{sub.job}</span>
                        <span className="text-[#1d4ed8]">{sub.status}</span>
                      </div>
                      <p className="text-gray-600">Client: {sub.client} • Submitted: {sub.submittedDate}</p>
                      <p className="text-gray-500 text-[11px]">Submitted By: {sub.submittedBy}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">No client submissions yet.</p>
                )}
              </div>

              {/* Interviews (Section 23) */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-3">
                <h3 className="font-bold text-gray-900 text-xs border-b border-gray-100 pb-2">
                  Interviews Scheduled & Completed (Section 23)
                </h3>
                {candidate.interviews && candidate.interviews.length > 0 ? (
                  candidate.interviews.map((intv) => (
                    <div key={intv.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{intv.job} ({intv.interviewType})</span>
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">{intv.status}</span>
                      </div>
                      <p className="text-gray-600">Client: {intv.client} • Date: {intv.date} at {intv.time}</p>
                      <p className="text-gray-500 text-[11px]">Interviewer: {intv.interviewer}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">No interviews scheduled yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 13: DOCUMENTS & CONSENT (Sections 26-27) */}
        {/* ========================================================= */}
        {activeTab === 'documents_consent' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                  <span>Candidate Documents & Verified Artifacts (Section 26)</span>
                </span>
                <button className="px-3 py-1 bg-[#1d4ed8] text-white rounded text-xs font-semibold cursor-pointer">
                  + Upload Document
                </button>
              </h3>

              <div className="space-y-2">
                {candidate.documents?.map((doc) => (
                  <div key={doc.id} className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-blue-100 text-[#1d4ed8] flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-xs">{doc.fileName}</h4>
                        <p className="text-gray-500 text-[11px]">Type: {doc.type} • Uploaded {doc.uploadedDate} by {doc.uploadedBy}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                      {doc.verificationStatus}
                    </span>
                  </div>
                )) || <p className="text-gray-400 text-xs">No documents uploaded.</p>}
              </div>
            </div>

            {/* Consent & Privacy */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Candidate Privacy & Representation Consent (Section 27)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-700 font-semibold text-xs">Contact Consent:</span>
                  <span className="text-emerald-700 font-bold">Active ✓</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-700 font-semibold text-xs">Profile Sharing Consent:</span>
                  <span className="text-emerald-700 font-bold">Granted ✓</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-700 font-semibold text-xs">Right to Represent:</span>
                  <span className="text-emerald-700 font-bold">Signed ✓</span>
                </div>
              </div>

              <p className="text-gray-400 text-[11px] pt-1">
                Consent recorded on {candidate.consent?.consentDate || candidate.created} via {candidate.consent?.consentSource || 'Intake Portal'}.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 14: ACTIVITY TIMELINE & NOTES (Sections 28-29) */}
        {/* ========================================================= */}
        {activeTab === 'activity_notes' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline (Section 28) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#1d4ed8]" />
                <span>Activity Timeline & Audit History (Section 28)</span>
              </h3>

              <div className="space-y-4">
                {candidate.timeline?.map((item) => (
                  <div key={item.id} className="relative pl-6 border-l-2 border-blue-200 pb-2">
                    <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#1d4ed8]" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-xs">{item.action}</span>
                      <span className="text-gray-400 text-[10px]">{item.date} {item.time}</span>
                    </div>
                    <p className="text-gray-500 text-[11px] mt-0.5">By: <strong>{item.user}</strong></p>
                    <p className="text-gray-700 text-xs mt-1 bg-gray-50 p-2 rounded border border-gray-100">{item.notes}</p>
                  </div>
                )) || <p className="text-gray-400 text-xs">No activity recorded.</p>}
              </div>
            </div>

            {/* Notes (Section 29) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-900 text-sm flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-amber-500" />
                  <span>Internal Recruiter Notes (Section 29)</span>
                </h3>
                <button
                  onClick={() => setIsAddNoteModalOpen(true)}
                  className="px-2.5 py-1 bg-[#1d4ed8] text-white rounded text-xs font-semibold cursor-pointer shadow-xs flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Note</span>
                </button>
              </div>

              <div className="space-y-3">
                {candidate.notes?.map((n) => (
                  <div key={n.id} className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                        {n.category}
                      </span>
                      <span className="text-gray-400 text-[10px]">{n.date} • {n.author}</span>
                    </div>
                    <p className="text-gray-800 text-xs pt-1 leading-relaxed">{n.content}</p>
                  </div>
                )) || <p className="text-gray-400 text-xs">No notes added yet.</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: REASSIGN AGENT (Section 8 & 30) */}
      {/* ========================================================= */}
      {isReassignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-[#1d4ed8]" />
                <span>Reassign Candidate</span>
              </h3>
              <button
                onClick={() => setIsReassignModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
              <p>
                <strong>Original Source Agent:</strong> {candidate.originalSourceAgent} (retained permanently).
              </p>
              <p className="text-amber-700 text-[11px]">
                Per specification Section 8, the original source agent will never be overwritten.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Select New Assigned Agent
              </label>
              <select
                value={selectedNewAgent}
                onChange={(e) => setSelectedNewAgent(e.target.value)}
                className="w-full p-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#1d4ed8] bg-white text-gray-800"
              >
                {availableAgents.map((agt) => (
                  <option key={agt} value={agt}>
                    {agt} {agt === candidate.currentAssignedAgent ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => setIsReassignModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReassign}
                className="px-4 py-1.5 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NOTE (Section 29) */}
      {/* ========================================================= */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <form
            onSubmit={handleAddNote}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>Add Internal Candidate Note</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddNoteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Note Category
              </label>
              <select
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                className="w-full p-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#1d4ed8] bg-white text-gray-800"
              >
                <option value="Candidate Summary">Candidate Summary</option>
                <option value="Strengths">Strengths</option>
                <option value="Weaknesses">Weaknesses</option>
                <option value="Concerns">Concerns</option>
                <option value="Availability">Availability</option>
                <option value="Compensation">Compensation</option>
                <option value="Communication">Communication</option>
                <option value="Interview Feedback">Interview Feedback</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Note Details
              </label>
              <textarea
                rows={4}
                required
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Enter observations, call notes, or submission instructions..."
                className="w-full p-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#1d4ed8] bg-white text-gray-800"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsAddNoteModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CHANGE PIPELINE STAGE */}
      {/* ========================================================= */}
      {isChangeStageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">Update Pipeline Stage</h3>
              <button
                onClick={() => setIsChangeStageModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {pipelineStages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleChangeStage(stage)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    candidate.stage.toLowerCase() === stage.toLowerCase()
                      ? 'bg-[#1d4ed8] text-white font-bold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{stage}</span>
                  {candidate.stage.toLowerCase() === stage.toLowerCase() && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
