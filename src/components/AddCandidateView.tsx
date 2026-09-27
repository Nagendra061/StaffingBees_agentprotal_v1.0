import React, { useState } from 'react';
import {
  ArrowLeft,
  UserPlus,
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  DollarSign,
  FileText,
} from 'lucide-react';
import { Candidate, CandidateEmploymentRow, Agent } from '../types';

interface AddCandidateViewProps {
  currentAgent: Agent;
  onSaveCandidate: (candidate: Candidate) => void;
  onCancel: () => void;
}

export const AddCandidateView: React.FC<AddCandidateViewProps> = ({
  currentAgent,
  onSaveCandidate,
  onCancel,
}) => {
  // Personal & Contact
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [workAuth, setWorkAuth] = useState('US Citizen');
  const [availability, setAvailability] = useState('Immediately Available');

  // Education & Experience
  const [highestEducation, setHighestEducation] = useState('B.Tech in Computer Science');
  const [university, setUniversity] = useState('University of Texas');
  const [totalExperience, setTotalExperience] = useState('5 Years');
  const [previousClientsSummary, setPreviousClientsSummary] = useState('');

  // Repeatable Employment History Rows (PRD Section 14.2)
  const [employmentHistory, setEmploymentHistory] = useState<CandidateEmploymentRow[]>([
    { company: 'TechCorp Solutions', title: 'Senior Software Engineer', duration: '2023 - Present' },
    { company: 'CloudScale Inc', title: 'Software Developer', duration: '2021 - 2023' },
  ]);

  // Target Role & Rate
  const [targetRole, setTargetRole] = useState('');
  const [expectedRate, setExpectedRate] = useState('$75/hr or $140,000/yr');

  // Skills & Readiness
  const [skills, setSkills] = useState('React, TypeScript, Redux, Node.js, Tailwind CSS');
  const [trainingsCompleted, setTrainingsCompleted] = useState('');
  const [certifications, setCertifications] = useState('AWS Certified Developer Associate');

  // Documents
  const [resumeFileName, setResumeFileName] = useState('Candidate_Resume.pdf');
  const [coverLetterFileName, setCoverLetterFileName] = useState('');

  // Agent Notes & Visibility
  const [internalNotes, setInternalNotes] = useState('');
  const [showCpiOnProfile, setShowCpiOnProfile] = useState(true);
  const [initialCpi, setInitialCpi] = useState(85);
  const [stage, setStage] = useState('Screening');
  const [jobCategory, setJobCategory] = useState<'frontend' | 'backend' | 'devops' | 'uiux'>('frontend');

  const handleAddEmploymentRow = () => {
    setEmploymentHistory([
      ...employmentHistory,
      { company: '', title: '', duration: '' },
    ]);
  };

  const handleUpdateEmploymentRow = (
    index: number,
    field: keyof CandidateEmploymentRow,
    value: string
  ) => {
    const updated = [...employmentHistory];
    updated[index][field] = value;
    setEmploymentHistory(updated);
  };

  const handleRemoveEmploymentRow = (index: number) => {
    setEmploymentHistory(employmentHistory.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const newId = `SB-CAN-${Math.floor(10000 + Math.random() * 90000)}`;

    const newCandidate: Candidate = {
      id: newId,
      name: fullName,
      phone: phone || '+1 (555) 019-2834',
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      created: 'Today',
      stage,
      source: 'Direct Agent Referral',
      lastActivity: 'Just now',
      jobId: jobCategory,
      currentRole: targetRole || 'Software Engineer',
      targetRole: targetRole || 'Senior Software Engineer',
      level: 'Mid Level',
      status: 'Active',
      readiness: initialCpi >= 80 ? 'Market Ready' : 'Coaching Required',
      location: location || 'Dallas, TX',
      originalSourceAgent: currentAgent.name,
      currentAssignedAgent: currentAgent.name,
      cpiScore: initialCpi,
      showCpiOnProfile,
      previousClientsSummary,
      employmentHistory,
      skills: skills.split(',').map((s) => ({
        name: s.trim(),
        category: 'Primary',
        years: '4 Years',
        proficiency: 'Advanced',
        lastUsed: 'Current',
      })),
      education: [
        {
          highestQualification: highestEducation,
          degree: highestEducation,
          specialization: 'Computer Science',
          institution: university,
          graduationYear: '2020',
        },
      ],
      compensation: {
        currentSalary: '$120,000',
        expectedSalary: expectedRate,
        minAcceptableSalary: '$110,000',
        payFrequency: 'Annual',
        currency: 'USD',
        negotiable: true,
      },
      documents: [
        {
          id: `doc-${Date.now()}`,
          type: 'Resume',
          fileName: resumeFileName,
          uploadedDate: 'Today',
          uploadedBy: currentAgent.name,
          verificationStatus: 'Verified',
        },
      ],
      notes: internalNotes
        ? [
            {
              id: `note-${Date.now()}`,
              category: 'Candidate Summary',
              author: currentAgent.name,
              date: 'Today',
              content: internalNotes,
            },
          ]
        : [],
    };

    onSaveCandidate(newCandidate);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Header (PRD Section 16: full pages over modals) */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <button
            onClick={onCancel}
            className="hover:text-gray-900 flex items-center space-x-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Candidates</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-gray-900">Add New Candidate Record</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h1 className="text-xl font-bold text-gray-900">Add Candidate (Full Profile)</h1>
            <p className="text-xs text-gray-500">
              Create complete candidate record with repeatable employment rows, CPI scoring, and skill tags.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* 1. Personal & Contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                1. Personal & Contact Details (Section 14.2)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Mehta"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
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
                    placeholder="priya@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Current Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dallas, TX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Work Authorization</label>
                  <select
                    value={workAuth}
                    onChange={(e) => setWorkAuth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="US Citizen">US Citizen</option>
                    <option value="Green Card">Green Card</option>
                    <option value="H-1B Visa">H-1B Visa</option>
                    <option value="Needs Specialist Review">Needs Specialist Review</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="Immediately Available">Immediately Available</option>
                    <option value="2 Weeks Notice">2 Weeks Notice</option>
                    <option value="30 Days">30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Target Role & Job Category */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                2. Target Role & Pay Expectations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Lead Frontend Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pipeline Role Category</label>
                  <select
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="devops">DevOps Engineer</option>
                    <option value="uiux">UI/UX Designer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Expected Rate / Salary</label>
                  <input
                    type="text"
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(e.target.value)}
                    placeholder="$75/hr or $140k"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Repeatable Employment History Rows (PRD Section 14.2) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                  3. Employment History (Repeatable Rows)
                </h3>
                <button
                  type="button"
                  onClick={handleAddEmploymentRow}
                  className="px-2.5 py-1 text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Company Row</span>
                </button>
              </div>

              <div className="space-y-2">
                {employmentHistory.map((row, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={row.company}
                      onChange={(e) => handleUpdateEmploymentRow(idx, 'company', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={row.title}
                      onChange={(e) => handleUpdateEmploymentRow(idx, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g. 2022 - 2024)"
                      value={row.duration}
                      onChange={(e) => handleUpdateEmploymentRow(idx, 'duration', e.target.value)}
                      className="w-36 px-3 py-2 border border-gray-300 rounded-lg outline-none text-xs"
                    />
                    {employmentHistory.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEmploymentRow(idx)}
                        className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Skills & CPI Scoring */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                4. Skills & Candidate Performance Index (CPI)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Primary Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React, TypeScript, Redux, Node.js"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Initial CPI Score (0 - 100)
                  </label>
                  <input
                    type="number"
                    min={40}
                    max={99}
                    value={initialCpi}
                    onChange={(e) => setInitialCpi(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none font-bold text-amber-700"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCpiOnProfile}
                    onChange={(e) => setShowCpiOnProfile(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-gray-700">
                    "Show CPI on profile" flag (PRD Section 14.2)
                  </span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Internal Agent Notes</label>
                <textarea
                  rows={2}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Private evaluation, communication assessment, or client notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold shadow-xs"
              >
                Save Candidate Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
