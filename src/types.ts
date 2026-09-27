export interface CandidateSkill {
  name: string;
  category: 'Primary' | 'Secondary' | 'Soft' | 'Domain';
  years: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  lastUsed: string;
}

export interface CandidateEducation {
  highestQualification: string;
  degree: string;
  specialization: string;
  institution: string;
  graduationYear: string;
  additionalQualifications?: string;
}

export interface CandidateCertification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  verified: boolean;
}

export interface CandidateJobMatch {
  id: string;
  jobTitle: string;
  client: string;
  opportunityId: string;
  matchStatus: string;
  skillMatch: boolean;
  experienceMatch: boolean;
  locationMatch: boolean;
  workModelMatch: boolean;
  compensationMatch: boolean;
  availabilityMatch: boolean;
  workAuthReview: string;
  candidateInterest: 'High' | 'Medium' | 'Interested' | 'Pending';
  submissionStatus: string;
}

export interface CandidateSubmission {
  id: string;
  job: string;
  client: string;
  submittedDate: string;
  submittedBy: string;
  status: 'Submitted' | 'Screening' | 'Interview' | 'Rejected' | 'Offer' | 'Placed' | 'Withdrawn';
  interviewDate?: string;
  feedback?: string;
  offerStatus?: string;
}

export interface CandidateInterview {
  id: string;
  job: string;
  client: string;
  interviewType: 'Technical Screen' | 'Hiring Manager' | 'System Design' | 'Cultural Fit' | 'Final Round';
  date: string;
  time: string;
  interviewer: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled' | 'No Show';
  feedback?: string;
  result?: 'Recommended' | 'Strong Hire' | 'Pending' | 'Rejected';
}

export interface CandidateOffer {
  id: string;
  job: string;
  client: string;
  offerDate: string;
  offeredSalary: string;
  startDate: string;
  status: 'Extended' | 'Accepted' | 'Under Review' | 'Declined';
  decision: string;
}

export interface CandidatePlacement {
  placementDate: string;
  client: string;
  job: string;
  agent: string;
  placementType: string;
  salary: string;
  startDate: string;
  fee: string;
  commission: string;
  paymentStatus: string;
  placementStatus: string;
}

export interface CandidateDocument {
  id: string;
  type: string;
  fileName: string;
  uploadedDate: string;
  uploadedBy: string;
  verificationStatus: 'Verified' | 'Pending' | 'Uploaded';
  expiryDate?: string;
  notes?: string;
}

export interface CandidateTimelineItem {
  id: string;
  date: string;
  time: string;
  user: string;
  action: string;
  notes: string;
}

export interface CandidateNote {
  id: string;
  category: string;
  author: string;
  date: string;
  content: string;
}

export interface CandidateEmploymentRow {
  company: string;
  title: string;
  duration: string;
}

export interface CandidateOfferedService {
  id: string;
  name: string;
  description: string;
  creditsPerSession: number;
  active: boolean;
  sessionsCompleted: number;
}

export interface CandidateAssignedCourse {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  assignedDate: string;
  completionDate?: string;
}

export interface CandidateCurrentJob {
  isEmployed: boolean;
  role: string;
  client: string;
  startDate: string;
  status: 'Active' | 'Ended';
  endReason?: string;
  endDate?: string;
}

export interface Candidate {
  id: string; // e.g. SB-CAN-10245
  name: string;
  preferredName?: string;
  phone: string;
  altPhone?: string;
  email: string;
  preferredContactMethod?: 'Email' | 'Phone' | 'WhatsApp';
  preferredCommunicationTime?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  avatar?: string;

  created: string;
  lastUpdated?: string;
  stage: string; // Screening, In Coaching, Market Ready, Submitted, Placed
  source: string;
  lastActivity: string;
  jobId: string;
  selected?: boolean;

  // Header & Core Information
  currentRole: string;
  targetRole: string;
  level: 'Entry Level' | 'Junior' | 'Mid Level' | 'Senior' | 'Lead';
  status: 'Active' | 'In Review' | 'On Hold' | 'Placed';
  readiness: 'Not Ready' | 'Coaching Required' | 'Interview Ready' | 'Market Ready';
  location: string;
  preferredLocation?: string;
  workPreference?: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  relocationPreference?: 'Open to Relocate' | 'Not Relocating' | 'Within Country';
  preferredShift?: 'Day' | 'Night' | 'Flexible';
  preferredWorkingHours?: string;

  // CPI (Candidate Performance Index)
  cpiScore?: number;
  cpiHistory?: Array<{ score: number; scoredBy: string; date: string; note: string }>;
  showCpiOnProfile?: boolean;

  // Candidate self-service fields
  loginPassword?: string;
  credits?: number;
  creditLedger?: Array<{ id: string; date: string; description: string; amount: number; balance: number }>;
  assignedCourses?: CandidateAssignedCourse[];
  offeredServices?: CandidateOfferedService[];
  currentJob?: CandidateCurrentJob;

  // Critical Agent Ownership (Section 8)
  originalSourceAgent: string; // Retained forever, never overwritten!
  currentAssignedAgent: string; // May be reassigned to other agents

  // Professional
  professionalSummary?: string;
  industry?: string;
  domain?: string;
  totalExperience?: string;
  relevantExperience?: string;
  previousClientsSummary?: string;
  employmentHistory?: CandidateEmploymentRow[];
  links?: {
    resume?: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };

  // Employment
  employment?: {
    currentEmployer: string;
    currentTitle: string;
    employmentStatus: 'Employed' | 'Serving Notice' | 'Immediately Available' | 'Unemployed';
    employmentType: 'Full-time' | 'Contract' | 'Part-time';
    joiningDate: string;
    noticePeriod: string;
    lastWorkingDay?: string;
    previousEmployer?: string;
    employmentGaps?: string;
    reasonForLeaving?: string;
  };

  // Compensation
  compensation?: {
    currentSalary: string;
    expectedSalary: string;
    minAcceptableSalary: string;
    currentRate?: string;
    expectedRate?: string;
    payFrequency: string;
    currency: string;
    negotiable: boolean;
    benefits?: string;
    notes?: string;
  };

  // Skills & Education
  skills?: CandidateSkill[];
  education?: CandidateEducation[];
  certifications?: CandidateCertification[];

  // Training & Development (Candidate-specific, distinct from Agent certification)
  training?: {
    trainingRequired: boolean;
    trainingStatus: 'Recommended' | 'In Progress' | 'Completed' | 'Not Required';
    trainingAreas: string[];
    trainingPriority: 'Low' | 'Medium' | 'High';
    trainingReason: string;
    recommendedTraining: string;
    completionPercentage: number;
  };

  // Verification
  verification?: {
    contactVerified: boolean;
    professionalVerified: boolean;
    employmentVerified: boolean;
    experienceVerified: boolean;
    skillsVerified: boolean;
    educationVerified: boolean;
    duplicateCheck: 'Clear' | 'Possible Duplicate';
    suspiciousProfileCheck: 'Passed' | 'Flagged';
    resumeConsistency: 'Consistent' | 'Needs Review';
    overallStatus: 'Not Verified' | 'Partially Verified' | 'Verified' | 'Needs Review';
  };

  // Work Authorization
  workAuthorization?: {
    status: 'Authorized' | 'Visa Required' | 'Needs Specialist Review';
    type: string;
    country: string;
    expiryDate?: string;
    sponsorshipRequired: boolean;
    verificationStatus: string;
    notes?: string;
  };

  // Candidate Readiness & Coaching
  readinessDetails?: {
    resumeReadiness: 'Ready' | 'Needs Improvement';
    communicationReadiness: 'High' | 'Moderate' | 'Needs Coaching';
    technicalReadiness: 'Interview Ready' | 'Needs Assessment';
    behavioralReadiness: 'Strong' | 'Satisfactory';
    coachingStatus: string;
    marketReadyStatus: 'Market Ready' | 'In Preparation';
    coachingTasks: string[];
    completedCoaching: string[];
    pendingCoaching: string[];
    mockInterviewStatus: string;
    lastFeedback: string;
    improvementAreas: string[];
  };

  // Pipeline Opportunities & Records
  jobMatches?: CandidateJobMatch[];
  submissions?: CandidateSubmission[];
  interviews?: CandidateInterview[];
  offers?: CandidateOffer[];
  placement?: CandidatePlacement | null;

  // Documents
  documents?: CandidateDocument[];

  // Consent & Privacy
  consent?: {
    contactConsent: boolean;
    profileSharingConsent: boolean;
    representationConsent: boolean;
    consentDate: string;
    consentSource: string;
    consentStatus: 'Active' | 'Pending';
  };

  // History & Notes
  timeline?: CandidateTimelineItem[];
  notes?: CandidateNote[];
}

export type JobId = 'frontend' | 'backend' | 'devops' | 'uiux' | 'all-jobs';

export interface JobRole {
  id: JobId;
  label: string;
}

export type InboxFolder = 'inbox' | 'assigned' | 'drafts' | 'sent' | 'closed';

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isRecruiter?: boolean;
}

export interface Conversation {
  id: string;
  candidateName: string;
  jobTitle: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  folder: InboxFolder;
  messages: Message[];
}

export type CertificationStatus =
  | 'locked'
  | 'available'
  | 'in_progress'
  | 'assessment_pending'
  | 'completed';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type TaskTiming = 'today' | 'overdue' | 'future';

export interface AssessmentOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface CertificationTask {
  id: string;
  name: string;
  certNumber: number;
  whatMustDo: string;
  completionCriteria: string;
  isAssessment?: boolean;
  status: TaskStatus;
  timing: TaskTiming;
  submission?: string;
  options?: AssessmentOption[];
  feedback?: string;
}

export interface CertificationModule {
  number: number;
  name: string;
  goal: string;
  flow: string;
  status: CertificationStatus;
  practicalScenario: string;
}

// ================= PRD SPECIFIC ENTITIES =================

export interface AgentCourseProgress {
  id: string;
  code: string;
  name: string;
  isOrientation?: boolean;
  status: 'Not Started' | 'In Progress' | 'Completed';
  completedDate?: string;
}

export interface Agent {
  id: string; // e.g. AGT-001
  name: string;
  phone: string;
  email: string;
  password?: string;
  location: string;
  yearsOfExperience: number;
  previousExperienceSummary: string;
  capabilities: string[];
  professionalSummary: string;
  additionalInfo?: string;
  focus: 'Candidate-side' | 'Client-side' | 'Both';
  applicationStatus: 'pending' | 'approved' | 'rejected';
  licencePaid: boolean;
  licenceStatus: 'active' | 'pending';
  appliedDate: string;
  reviewedDate?: string;
  referringAgentId?: string;
  referringAgentName?: string;
  credits: number;
  creditLedger: Array<{ id: string; date: string; description: string; amount: number; balance: number }>;
  recentlyUsedServices: string[];
  courses: AgentCourseProgress[];
  avatarBg?: string;
}

export interface Client {
  id: string;
  name: string;
  location: string;
  website: string;
  domain: string;
  technologyFocus: string;
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  relationshipStatus: 'Customer in discussion' | 'Client – MSA signed';
  contractType: 'Contract' | 'Direct Placement' | 'Both';
  paymentTerms: string;
  documentsReference: string;
  billingNotes: string;
  owningAgentId: string;
  owningAgentName: string;
  createdAt: string;
}

export interface Requirement {
  id: string;
  clientId: string;
  clientName: string;
  jobTitle: string;
  domain: string;
  engagementType: 'Contract' | 'Direct Placement';
  positionsOpen: number;
  // Rates per PRD Section 14.4
  clientBillRate?: number; // Contract $/hr
  budgetedAnnualSalary?: number; // Direct Placement $
  skillsNeeded: string[];
  status: 'Open' | 'Filled' | 'On Hold';
  owningAgentId: string;
  owningAgentName: string;
  postedDate: string;
  location: string;
  workModel: 'Remote' | 'Hybrid' | 'On-site';
  description?: string;
}

export interface SubmissionRecord {
  id: string;
  candidateId: string;
  candidateName: string;
  requirementId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  engagementType: 'Contract' | 'Direct Placement';
  status: 'Submitted' | 'Screening' | 'Interview' | 'Offer' | 'Placed' | 'Rejected' | 'Withdrawn';
  submittedDate: string;
  owningAgentId: string;
  owningAgentName: string;

  // Single payment engine fields (PRD Section 14.5)
  candidateRate?: number; // Contract $/hr
  clientRate?: number; // Contract $/hr
  marginPercent?: number;
  annualSalary?: number; // Direct Placement $
  placementFeePercent?: number; // %
  calculatedFee: string; // e.g. "$16.00/hr ($640/wk)" or "$24,000"
}

export interface AgentReferral {
  id: string;
  candidateAgentName: string;
  email: string;
  phone: string;
  location: string;
  experienceYears: number;
  capabilities: string[];
  summary: string;
  referringAgentId: string;
  referringAgentName: string;
  submittedDate: string;
  status: 'pending' | 'certified' | 'approved' | 'rejected';
  issuedAgentId?: string;
  adminNotes?: string;
  reviewedDate?: string;
}

export interface PlatformService {
  id: string;
  name: string;
  shortCode: string;
  iconName: string;
  summary: string;
  description: string;
  freeTier: {
    title: string;
    features: string[];
  };
  paidTier: {
    title: string;
    price: string;
    features: string[];
  };
  firstCallRule: string;
  isSimulatedSSO?: boolean;
}
