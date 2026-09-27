import { Candidate } from '../types';

export const DEMO_CANDIDATES: Record<string, Candidate[]> = {
  frontend: [
    {
      id: 'SB-CAN-10245',
      name: 'Rahul Sharma',
      preferredName: 'Rahul',
      phone: '+91 98765 43210',
      altPhone: '+91 98765 43299',
      email: 'rahul.sharma@example.com',
      preferredContactMethod: 'WhatsApp',
      preferredCommunicationTime: 'Weekdays after 5:00 PM IST',
      emailVerified: true,
      phoneVerified: true,
      created: 'Sep 24, 2026',
      lastUpdated: 'Sep 25, 2026',
      stage: 'Screening',
      source: 'LinkedIn Sourcing',
      lastActivity: 'Today at 2:15 PM',
      jobId: 'frontend',

      // Header & Core Information
      currentRole: 'Frontend Developer',
      targetRole: 'Senior Frontend Developer',
      level: 'Mid Level',
      status: 'Active',
      readiness: 'Interview Ready',
      location: 'Hyderabad, India',
      preferredLocation: 'Hyderabad / Bangalore (Remote friendly)',
      workPreference: 'Hybrid',
      relocationPreference: 'Within Country',
      preferredShift: 'Day',
      preferredWorkingHours: '9:30 AM - 6:30 PM IST',

      // Critical Agent Ownership (Section 8)
      originalSourceAgent: 'Priya Sharma',
      currentAssignedAgent: 'Rahul Verma',

      // Professional
      professionalSummary:
        'Frontend engineer with 4+ years of experience crafting high-performance React and TypeScript applications. Passionate about accessible UI, state management with Redux/Zustand, and micro-frontend architecture.',
      industry: 'Information Technology & SaaS',
      domain: 'FinTech & B2B SaaS',
      totalExperience: '4 Years 6 Months',
      relevantExperience: '4 Years',
      links: {
        resume: 'https://storage.staffingbees.com/resumes/rahul-sharma-2026.pdf',
        linkedin: 'https://linkedin.com/in/rahulsharma-fe',
        portfolio: 'https://rahulsharma.dev',
        github: 'https://github.com/rahulsharma-codes',
      },

      // Employment
      employment: {
        currentEmployer: 'FinWave Technologies',
        currentTitle: 'Frontend Software Engineer',
        employmentStatus: 'Serving Notice',
        employmentType: 'Full-time',
        joiningDate: 'Mar 2022',
        noticePeriod: '30 Days',
        lastWorkingDay: 'Oct 24, 2026',
        previousEmployer: 'CogniTech Solutions (2020 - 2022)',
        employmentGaps: 'None',
        reasonForLeaving: 'Looking for technical leadership and modern stack growth in global product teams.',
      },

      // Compensation
      compensation: {
        currentSalary: '₹8,50,000 PA',
        expectedSalary: '₹12,00,000 PA',
        minAcceptableSalary: '₹10,50,000 PA',
        currentRate: '₹650/hr',
        expectedRate: '₹950/hr',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
        benefits: 'Health Insurance for family, Performance bonus, Remote setup allowance',
        notes: 'Strict expectation on base pay not falling below ₹10.5 LPA.',
      },

      // Skills
      skills: [
        { name: 'React.js', category: 'Primary', years: '4 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'TypeScript', category: 'Primary', years: '3.5 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'Tailwind CSS', category: 'Primary', years: '3 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Next.js', category: 'Secondary', years: '2 Years', proficiency: 'Intermediate', lastUsed: 'Current' },
        { name: 'GraphQL & REST APIs', category: 'Secondary', years: '3 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'Jest & React Testing Library', category: 'Secondary', years: '2.5 Years', proficiency: 'Intermediate', lastUsed: '2 months ago' },
        { name: 'Cross-functional Communication', category: 'Soft', years: '4.5 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'Payment Gateway Integration', category: 'Domain', years: '2 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      // Education & Certifications
      education: [
        {
          highestQualification: 'Bachelor of Technology (B.Tech)',
          degree: 'B.Tech in Computer Science & Engineering',
          specialization: 'Software Engineering',
          institution: 'Jawaharlal Nehru Technological University (JNTU), Hyderabad',
          graduationYear: '2020',
          additionalQualifications: 'Graduated with First Class with Distinction (8.4 CGPA)',
        },
      ],
      certifications: [
        { name: 'Meta Certified Front-End Developer', issuer: 'Meta (Coursera)', issueDate: 'Aug 2023', expiryDate: 'No Expiry', verified: true },
        { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: 'Jan 2024', expiryDate: 'Jan 2027', verified: true },
      ],

      // Training & Development (Candidate-specific)
      training: {
        trainingRequired: true,
        trainingStatus: 'Recommended',
        trainingAreas: ['Advanced System Design for Frontends', 'Web Performance Optimization (Core Web Vitals)'],
        trainingPriority: 'Medium',
        trainingReason: 'Targeting Senior and Staff Frontend roles with high concurrency client expectations.',
        recommendedTraining: 'Frontend System Design & Core Web Vitals Mastery Module',
        completionPercentage: 45,
      },

      // Verification
      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      // Work Authorization
      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Aadhaar & PAN Verified',
        notes: 'Eligible to work across India without sponsorship; possesses valid passport for global business travel.',
      },

      // Candidate Readiness
      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Completed 2 Mock Technical Screens',
        marketReadyStatus: 'Market Ready',
        coachingTasks: ['Frontend Architecture Mock', 'STAR Behavioral Preparation', 'Salary Negotiation Prep'],
        completedCoaching: ['Frontend Architecture Mock', 'STAR Behavioral Preparation'],
        pendingCoaching: ['Salary Negotiation Prep'],
        mockInterviewStatus: 'Cleared (Score: 88/100)',
        lastFeedback: 'Articulates component lifecycles and bundle size trade-offs clearly. Confident demeanor.',
        improvementAreas: ['Elaborate deeper on SSR caching strategies in Next.js 14.'],
      },

      // Job Matches
      jobMatches: [
        {
          id: 'JM-881',
          jobTitle: 'Senior Frontend Engineer',
          client: 'Apex Global Labs',
          opportunityId: 'OPP-FE-409',
          matchStatus: 'High Match (94%)',
          skillMatch: true,
          experienceMatch: true,
          locationMatch: true,
          workModelMatch: true,
          compensationMatch: true,
          availabilityMatch: true,
          workAuthReview: 'Authorized',
          candidateInterest: 'High',
          submissionStatus: 'Ready for Submission',
        },
        {
          id: 'JM-882',
          jobTitle: 'Frontend Tech Lead',
          client: 'HyperScale Cloud',
          opportunityId: 'OPP-FE-512',
          matchStatus: 'Good Match (86%)',
          skillMatch: true,
          experienceMatch: true,
          locationMatch: true,
          workModelMatch: true,
          compensationMatch: false,
          availabilityMatch: true,
          workAuthReview: 'Authorized',
          candidateInterest: 'Interested',
          submissionStatus: 'Under Review',
        },
      ],

      // Submissions
      submissions: [
        {
          id: 'SUB-201',
          job: 'Senior Frontend Engineer',
          client: 'Apex Global Labs',
          submittedDate: 'Sep 24, 2026',
          submittedBy: 'Rahul Verma',
          status: 'Screening',
          interviewDate: 'Sep 28, 2026',
          feedback: 'Resume shortlisted by Engineering Director.',
          offerStatus: 'Pending Interview',
        },
      ],

      // Interviews
      interviews: [
        {
          id: 'INT-501',
          job: 'Senior Frontend Engineer',
          client: 'Apex Global Labs',
          interviewType: 'Technical Screen',
          date: 'Sep 28, 2026',
          time: '11:00 AM IST',
          interviewer: 'Deepak Mehrotra (VP Engineering)',
          status: 'Scheduled',
          feedback: 'Pre-briefing completed by assigned agent.',
          result: 'Pending',
        },
      ],

      // Offers & Placement
      offers: [],
      placement: null,

      // Documents
      documents: [
        { id: 'DOC-1', type: 'Resume', fileName: 'Rahul_Sharma_Frontend_4YOE.pdf', uploadedDate: 'Sep 24, 2026', uploadedBy: 'Priya Sharma', verificationStatus: 'Verified', notes: 'ATS formatted and spell-checked' },
        { id: 'DOC-2', type: 'Certifications', fileName: 'Meta_FrontEnd_Cert.pdf', uploadedDate: 'Sep 24, 2026', uploadedBy: 'Rahul Sharma', verificationStatus: 'Verified' },
        { id: 'DOC-3', type: 'Employment Documents', fileName: 'Current_Offer_Letter_FinWave.pdf', uploadedDate: 'Sep 24, 2026', uploadedBy: 'Rahul Sharma', verificationStatus: 'Verified' },
      ],

      // Consent & Privacy
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 24, 2026',
        consentSource: 'StaffingBees Candidate Intake Portal Form',
        consentStatus: 'Active',
      },

      // Activity Timeline
      timeline: [
        { id: 'TL-1', date: '25 Sep 2026', time: '10:30 AM', user: 'Rahul Verma', action: 'Technical Screen Scheduled', notes: 'Scheduled round with Apex Global Labs for 28 Sep.' },
        { id: 'TL-2', date: '24 Sep 2026', time: '04:15 PM', user: 'Rahul Verma', action: 'Candidate Sourced & Submitted', notes: 'Submitted to Senior Frontend Engineer opportunity.' },
        { id: 'TL-3', date: '24 Sep 2026', time: '02:00 PM', user: 'Priya Sharma', action: 'Candidate Intake & Verification', notes: 'Completed intake call, verified notice period (30 days) and compensation expectations.' },
        { id: 'TL-4', date: '24 Sep 2026', time: '11:30 AM', user: 'Priya Sharma', action: 'Candidate Created', notes: 'Candidate registered through LinkedIn sourcing campaign.' },
      ],

      // Notes
      notes: [
        { id: 'N-1', category: 'Strengths', author: 'Rahul Verma', date: 'Sep 25, 2026', content: 'Very strong React hooks and custom state management expertise. Impressive knowledge of web performance metrics.' },
        { id: 'N-2', category: 'Candidate Summary', author: 'Priya Sharma', date: 'Sep 24, 2026', content: 'Clear communicator, active on notice period. Firm on minimum ₹10.5 LPA, prefers hybrid in Hyderabad or remote.' },
      ],
    },
    {
      id: 'SB-CAN-10246',
      name: 'Arjun Kumar',
      preferredName: 'Arjun',
      phone: '+91 98765 43211',
      email: 'arjun.kumar@example.com',
      created: 'Sep 22, 2026',
      lastUpdated: 'Sep 24, 2026',
      stage: 'Interview',
      source: 'Employee Referral',
      lastActivity: 'Yesterday at 11:30 AM',
      jobId: 'frontend',

      currentRole: 'Senior React Developer',
      targetRole: 'Lead Frontend Engineer',
      level: 'Senior',
      status: 'Active',
      readiness: 'Market Ready',
      location: 'Bangalore, India',
      preferredLocation: 'Bangalore (On-site / Hybrid)',
      workPreference: 'Hybrid',
      relocationPreference: 'Not Relocating',
      preferredShift: 'Day',

      originalSourceAgent: 'Priya Sharma',
      currentAssignedAgent: 'Rahul Verma',

      professionalSummary:
        'Senior frontend architect with 6+ years specializing in enterprise design systems, Vue.js, React, and WebGL visualizations.',
      totalExperience: '6 Years',
      relevantExperience: '6 Years',
      links: {
        resume: 'https://storage.staffingbees.com/resumes/arjun-kumar.pdf',
        linkedin: 'https://linkedin.com/in/arjunkumar-dev',
        github: 'https://github.com/arjunkumar',
      },

      employment: {
        currentEmployer: 'CloudScale Systems',
        currentTitle: 'Senior Software Engineer - UI',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Jan 2021',
        noticePeriod: '60 Days (Negotiable to 30)',
        previousEmployer: 'MindTree Ltd',
        reasonForLeaving: 'Seeking engineering leadership role with high equity upside.',
      },

      compensation: {
        currentSalary: '₹16,00,000 PA',
        expectedSalary: '₹22,00,000 PA',
        minAcceptableSalary: '₹20,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'React.js', category: 'Primary', years: '6 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'TypeScript', category: 'Primary', years: '5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Design Systems', category: 'Primary', years: '4 Years', proficiency: 'Expert', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'Master of Science (M.S.)',
          degree: 'M.S. in Software Systems',
          specialization: 'Distributed Systems',
          institution: 'BITS Pilani',
          graduationYear: '2019',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Completed',
        trainingAreas: ['Leadership & Architecture'],
        trainingPriority: 'Low',
        trainingReason: 'Candidate already possesses senior technical credentials.',
        recommendedTraining: 'None required',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Complete',
        marketReadyStatus: 'Market Ready',
        coachingTasks: ['Executive Presence Review'],
        completedCoaching: ['Executive Presence Review'],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Flawless code walk-through and system design discussion.',
        improvementAreas: [],
      },

      jobMatches: [
        {
          id: 'JM-901',
          jobTitle: 'Lead UI Engineer',
          client: 'Zeta Payments',
          opportunityId: 'OPP-FE-701',
          matchStatus: 'High Match (96%)',
          skillMatch: true,
          experienceMatch: true,
          locationMatch: true,
          workModelMatch: true,
          compensationMatch: true,
          availabilityMatch: true,
          workAuthReview: 'Authorized',
          candidateInterest: 'High',
          submissionStatus: 'Interview Round 2',
        },
      ],

      submissions: [
        {
          id: 'SUB-205',
          job: 'Lead UI Engineer',
          client: 'Zeta Payments',
          submittedDate: 'Sep 22, 2026',
          submittedBy: 'Rahul Verma',
          status: 'Interview',
          interviewDate: 'Sep 26, 2026',
          feedback: 'Passed Round 1 coding with top score.',
          offerStatus: 'Pending Round 2',
        },
      ],

      interviews: [
        {
          id: 'INT-505',
          job: 'Lead UI Engineer',
          client: 'Zeta Payments',
          interviewType: 'System Design',
          date: 'Sep 26, 2026',
          time: '3:00 PM IST',
          interviewer: 'Anand Kulkarni (Principal Architect)',
          status: 'Scheduled',
        },
      ],

      offers: [],
      placement: null,

      documents: [
        { id: 'DOC-4', type: 'Resume', fileName: 'Arjun_Kumar_Lead_UI_6YOE.pdf', uploadedDate: 'Sep 22, 2026', uploadedBy: 'Priya Sharma', verificationStatus: 'Verified' },
      ],

      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 22, 2026',
        consentSource: 'Referral Portal Submission',
        consentStatus: 'Active',
      },

      timeline: [
        { id: 'TL-5', date: '24 Sep 2026', time: '11:30 AM', user: 'Rahul Verma', action: 'Round 1 Passed', notes: 'Candidate cleared technical screen at Zeta Payments.' },
      ],

      notes: [
        { id: 'N-3', category: 'Strengths', author: 'Rahul Verma', date: 'Sep 22, 2026', content: 'Top tier candidate with design system architecture experience.' },
      ],
    },
    {
      id: 'SB-CAN-10247',
      name: 'Priya Reddy',
      preferredName: 'Priya',
      phone: '+91 98765 43212',
      email: 'priya.reddy@example.com',
      created: 'Sep 20, 2026',
      lastUpdated: 'Sep 23, 2026',
      stage: 'Shortlisted',
      source: 'LinkedIn Sourcing',
      lastActivity: '3 days ago',
      jobId: 'frontend',

      currentRole: 'Junior Frontend Developer',
      targetRole: 'Frontend Developer',
      level: 'Junior',
      status: 'Active',
      readiness: 'Coaching Required',
      location: 'Hyderabad, India',
      preferredLocation: 'Hyderabad',
      workPreference: 'Remote',
      relocationPreference: 'Not Relocating',

      originalSourceAgent: 'Vikram Nath',
      currentAssignedAgent: 'Priya Sharma',

      professionalSummary:
        'Frontend developer with 2 years of hands-on experience developing responsive web components using HTML5, CSS3, modern JavaScript, and React.',
      totalExperience: '2 Years',
      relevantExperience: '2 Years',

      employment: {
        currentEmployer: 'InnovateX Media',
        currentTitle: 'Junior Frontend Developer',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Aug 2022',
        noticePeriod: '15 Days',
      },

      compensation: {
        currentSalary: '₹4,50,000 PA',
        expectedSalary: '₹7,00,000 PA',
        minAcceptableSalary: '₹6,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'JavaScript (ES6+)', category: 'Primary', years: '2 Years', proficiency: 'Intermediate', lastUsed: 'Current' },
        { name: 'React', category: 'Primary', years: '2 Years', proficiency: 'Intermediate', lastUsed: 'Current' },
        { name: 'CSS/Sass', category: 'Primary', years: '2 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'Bachelor of Technology (B.Tech)',
          degree: 'B.Tech in Information Technology',
          specialization: 'Information Technology',
          institution: 'Osmania University',
          graduationYear: '2022',
        },
      ],

      training: {
        trainingRequired: true,
        trainingStatus: 'In Progress',
        trainingAreas: ['TypeScript Generics', 'State Management with Redux Toolkit'],
        trainingPriority: 'High',
        trainingReason: 'Needed to qualify for Mid-level Frontend developer client bars.',
        recommendedTraining: 'TypeScript & Modern React State Patterns',
        completionPercentage: 60,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'Moderate',
        technicalReadiness: 'Needs Assessment',
        behavioralReadiness: 'Satisfactory',
        coachingStatus: 'Coaching in progress',
        marketReadyStatus: 'In Preparation',
        coachingTasks: ['TypeScript Assessment', 'Mock Screen with Senior Agent'],
        completedCoaching: ['Mock Screen with Senior Agent'],
        pendingCoaching: ['TypeScript Assessment'],
        mockInterviewStatus: 'Under Review',
        lastFeedback: 'Solid UI foundations; strengthen async handling knowledge.',
        improvementAreas: ['Async/Await & Error handling patterns'],
      },

      jobMatches: [],
      submissions: [],
      interviews: [],
      offers: [],
      placement: null,
      documents: [
        { id: 'DOC-5', type: 'Resume', fileName: 'Priya_Reddy_Frontend_2YOE.pdf', uploadedDate: 'Sep 20, 2026', uploadedBy: 'Vikram Nath', verificationStatus: 'Verified' },
      ],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 20, 2026',
        consentSource: 'StaffingBees Candidate Intake',
        consentStatus: 'Active',
      },
      timeline: [
        { id: 'TL-6', date: '20 Sep 2026', time: '02:15 PM', user: 'Vikram Nath', action: 'Candidate Sourced', notes: 'Added to Frontend pool from campus outreach.' },
      ],
      notes: [
        { id: 'N-4', category: 'Training', author: 'Priya Sharma', date: 'Sep 23, 2026', content: 'Fast learner. Will be ready for client submission once TypeScript module is complete.' },
      ],
    },
  ],

  backend: [
    {
      id: 'SB-CAN-10248',
      name: 'Kiran Kumar',
      preferredName: 'Kiran',
      phone: '+91 98765 43213',
      email: 'kiran.kumar@example.com',
      created: 'Sep 23, 2026',
      lastUpdated: 'Sep 25, 2026',
      stage: 'Technical Assessment',
      source: 'Direct Portal Registration',
      lastActivity: 'Today at 10:00 AM',
      jobId: 'backend',

      currentRole: 'Backend Developer',
      targetRole: 'Senior Java Backend Engineer',
      level: 'Mid Level',
      status: 'Active',
      readiness: 'Interview Ready',
      location: 'Pune, India',
      preferredLocation: 'Pune / Mumbai / Remote',
      workPreference: 'Remote',
      relocationPreference: 'Within Country',

      originalSourceAgent: 'Amit Patel',
      currentAssignedAgent: 'Rahul Verma',

      professionalSummary:
        'Backend software engineer with 5 years of hands-on Java, Spring Boot, Microservices, and Kafka streaming architecture experience. Strong database design with PostgreSQL and MongoDB.',
      totalExperience: '5 Years',
      relevantExperience: '5 Years',
      links: {
        resume: 'https://storage.staffingbees.com/resumes/kiran-kumar-java.pdf',
        linkedin: 'https://linkedin.com/in/kirankumar-be',
        github: 'https://github.com/kirankumar-backend',
      },

      employment: {
        currentEmployer: 'FinTech Nexus',
        currentTitle: 'Senior Software Engineer (Backend)',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'May 2021',
        noticePeriod: '30 Days',
        reasonForLeaving: 'Looking for distributed cloud platform challenges.',
      },

      compensation: {
        currentSalary: '₹14,00,000 PA',
        expectedSalary: '₹18,50,000 PA',
        minAcceptableSalary: '₹17,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'Java 17/21', category: 'Primary', years: '5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Spring Boot', category: 'Primary', years: '5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Apache Kafka', category: 'Primary', years: '3 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'PostgreSQL', category: 'Secondary', years: '5 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'Microservices Design', category: 'Domain', years: '4 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'Bachelor of Engineering (B.E.)',
          degree: 'B.E. in Computer Science',
          specialization: 'Information Systems',
          institution: 'Pune Institute of Computer Technology (PICT)',
          graduationYear: '2019',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Not Required',
        trainingAreas: [],
        trainingPriority: 'Low',
        trainingReason: 'Strong technical baseline.',
        recommendedTraining: 'None',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Ready',
        marketReadyStatus: 'Market Ready',
        coachingTasks: ['Kafka Architecture Review'],
        completedCoaching: ['Kafka Architecture Review'],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Exceptional answers on distributed locking and Redis caching.',
        improvementAreas: [],
      },

      jobMatches: [
        {
          id: 'JM-701',
          jobTitle: 'Senior Java Backend Engineer',
          client: 'Barclays Global',
          opportunityId: 'OPP-BE-310',
          matchStatus: 'High Match (95%)',
          skillMatch: true,
          experienceMatch: true,
          locationMatch: true,
          workModelMatch: true,
          compensationMatch: true,
          availabilityMatch: true,
          workAuthReview: 'Authorized',
          candidateInterest: 'High',
          submissionStatus: 'Submitted',
        },
      ],

      submissions: [
        {
          id: 'SUB-301',
          job: 'Senior Java Backend Engineer',
          client: 'Barclays Global',
          submittedDate: 'Sep 23, 2026',
          submittedBy: 'Rahul Verma',
          status: 'Screening',
          offerStatus: 'Under Technical Evaluation',
        },
      ],

      interviews: [],
      offers: [],
      placement: null,
      documents: [
        { id: 'DOC-6', type: 'Resume', fileName: 'Kiran_Kumar_Java_Backend_5YOE.pdf', uploadedDate: 'Sep 23, 2026', uploadedBy: 'Amit Patel', verificationStatus: 'Verified' },
      ],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 23, 2026',
        consentSource: 'Direct Portal',
        consentStatus: 'Active',
      },
      timeline: [
        { id: 'TL-7', date: '25 Sep 2026', time: '10:00 AM', user: 'Rahul Verma', action: 'Technical Assessment Sent', notes: 'Sent HackerRank coding challenge for Barclays.' },
      ],
      notes: [
        { id: 'N-5', category: 'Strengths', author: 'Rahul Verma', date: 'Sep 23, 2026', content: 'Superb Spring Cloud and Kafka fundamentals. Highly reliable candidate.' },
      ],
    },
    {
      id: 'SB-CAN-10249',
      name: 'Anjali Rao',
      preferredName: 'Anjali',
      phone: '+91 98765 43214',
      email: 'anjali.rao@example.com',
      created: 'Sep 21, 2026',
      lastUpdated: 'Sep 24, 2026',
      stage: 'Interview',
      source: 'Campus Outreach',
      lastActivity: 'Yesterday at 4:20 PM',
      jobId: 'backend',

      currentRole: 'Python / Django Developer',
      targetRole: 'Backend Engineer',
      level: 'Mid Level',
      status: 'Active',
      readiness: 'Market Ready',
      location: 'Bangalore, India',
      preferredLocation: 'Bangalore',
      workPreference: 'Hybrid',

      originalSourceAgent: 'Priya Sharma',
      currentAssignedAgent: 'Priya Sharma',

      professionalSummary:
        'Backend software engineer with 3.5 years specializing in Python, Django, FastAPI, Redis, and high-volume REST APIs.',
      totalExperience: '3.5 Years',
      relevantExperience: '3.5 Years',

      employment: {
        currentEmployer: 'DataStack Technologies',
        currentTitle: 'Backend Software Developer',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Jan 2023',
        noticePeriod: '30 Days',
      },

      compensation: {
        currentSalary: '₹9,00,000 PA',
        expectedSalary: '₹13,50,000 PA',
        minAcceptableSalary: '₹12,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'Python', category: 'Primary', years: '3.5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'FastAPI / Django', category: 'Primary', years: '3.5 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'PostgreSQL', category: 'Secondary', years: '3 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'B.Tech',
          degree: 'B.Tech in Computer Science',
          specialization: 'Computer Science',
          institution: 'RV College of Engineering, Bangalore',
          graduationYear: '2021',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Completed',
        trainingAreas: [],
        trainingPriority: 'Low',
        trainingReason: 'Verified technical competence.',
        recommendedTraining: 'None',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Ready',
        marketReadyStatus: 'Market Ready',
        coachingTasks: [],
        completedCoaching: [],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Confident in async Python and database query optimization.',
        improvementAreas: [],
      },

      jobMatches: [],
      submissions: [],
      interviews: [],
      offers: [],
      placement: null,
      documents: [],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 21, 2026',
        consentSource: 'Intake form',
        consentStatus: 'Active',
      },
      timeline: [],
      notes: [],
    },
  ],

  devops: [
    {
      id: 'SB-CAN-10251',
      name: 'Sai Krishna',
      preferredName: 'Sai',
      phone: '+91 98765 43215',
      email: 'sai.krishna@example.com',
      created: 'Sep 24, 2026',
      lastUpdated: 'Sep 25, 2026',
      stage: 'Screening',
      source: 'Employee Referral',
      lastActivity: 'Today at 1:45 PM',
      jobId: 'devops',

      currentRole: 'DevOps Engineer',
      targetRole: 'Senior Cloud & DevOps Engineer',
      level: 'Senior',
      status: 'Active',
      readiness: 'Interview Ready',
      location: 'Chennai, India',
      preferredLocation: 'Chennai / Bangalore / Remote',
      workPreference: 'Remote',

      originalSourceAgent: 'Siddharth Rao',
      currentAssignedAgent: 'Rahul Verma',

      professionalSummary:
        'DevOps and Site Reliability Engineer with 6 years experience running Kubernetes clusters, Terraform infrastructure as code, CI/CD with GitLab and GitHub Actions, and AWS/Azure cloud environments.',
      totalExperience: '6 Years',
      relevantExperience: '6 Years',

      employment: {
        currentEmployer: 'CloudInfra Labs',
        currentTitle: 'DevOps Engineer',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Feb 2021',
        noticePeriod: '30 Days',
      },

      compensation: {
        currentSalary: '₹15,00,000 PA',
        expectedSalary: '₹21,00,000 PA',
        minAcceptableSalary: '₹19,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'Kubernetes (EKS/GKE)', category: 'Primary', years: '4.5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Terraform', category: 'Primary', years: '4 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'AWS Cloud Architecture', category: 'Primary', years: '6 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'CI/CD Pipelines', category: 'Secondary', years: '5 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'B.Tech',
          degree: 'B.Tech in Electrical & Electronics',
          specialization: 'Electronics',
          institution: 'Anna University, Chennai',
          graduationYear: '2018',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Not Required',
        trainingAreas: [],
        trainingPriority: 'Low',
        trainingReason: 'Holds CKA & AWS Solutions Architect Pro certifications.',
        recommendedTraining: 'None',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Ready',
        marketReadyStatus: 'Market Ready',
        coachingTasks: [],
        completedCoaching: [],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Deep mastery over Kubernetes networking, ingress controllers, and Helm charts.',
        improvementAreas: [],
      },

      jobMatches: [],
      submissions: [],
      interviews: [],
      offers: [],
      placement: null,
      documents: [],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 24, 2026',
        consentSource: 'Referral Portal',
        consentStatus: 'Active',
      },
      timeline: [],
      notes: [],
    },
    {
      id: 'SB-CAN-10252',
      name: 'Rohit Varma',
      preferredName: 'Rohit',
      phone: '+91 98765 43216',
      email: 'rohit.varma@example.com',
      created: 'Sep 23, 2026',
      lastUpdated: 'Sep 24, 2026',
      stage: 'Technical Assessment',
      source: 'LinkedIn Sourcing',
      lastActivity: '2 days ago',
      jobId: 'devops',

      currentRole: 'Cloud Infrastructure Engineer',
      targetRole: 'DevOps / SRE Specialist',
      level: 'Mid Level',
      status: 'Active',
      readiness: 'Market Ready',
      location: 'Hyderabad, India',
      preferredLocation: 'Hyderabad',
      workPreference: 'Hybrid',

      originalSourceAgent: 'Priya Sharma',
      currentAssignedAgent: 'Rahul Verma',

      professionalSummary: 'Infrastructure engineer with 4 years in Docker containerization, Ansible, Linux systems administration, and Azure pipelines.',
      totalExperience: '4 Years',
      relevantExperience: '4 Years',

      employment: {
        currentEmployer: 'TechSpan Services',
        currentTitle: 'Cloud Engineer',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Aug 2022',
        noticePeriod: '30 Days',
      },

      compensation: {
        currentSalary: '₹11,00,000 PA',
        expectedSalary: '₹15,00,000 PA',
        minAcceptableSalary: '₹14,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'Azure Cloud', category: 'Primary', years: '3.5 Years', proficiency: 'Advanced', lastUsed: 'Current' },
        { name: 'Docker & Kubernetes', category: 'Primary', years: '3 Years', proficiency: 'Intermediate', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'B.E.',
          degree: 'B.E. in Computer Science',
          specialization: 'Computer Systems',
          institution: 'Osmania University',
          graduationYear: '2020',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Completed',
        trainingAreas: [],
        trainingPriority: 'Low',
        trainingReason: 'N/A',
        recommendedTraining: 'None',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Ready',
        marketReadyStatus: 'Market Ready',
        coachingTasks: [],
        completedCoaching: [],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Solid understanding of CI/CD rollout stages.',
        improvementAreas: [],
      },

      jobMatches: [],
      submissions: [],
      interviews: [],
      offers: [],
      placement: null,
      documents: [],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 23, 2026',
        consentSource: 'Inbound Portal',
        consentStatus: 'Active',
      },
      timeline: [],
      notes: [],
    },
  ],

  uiux: [
    {
      id: 'SB-CAN-10254',
      name: 'Ananya Reddy',
      preferredName: 'Ananya',
      phone: '+91 98765 43218',
      email: 'ananya.reddy@example.com',
      created: 'Sep 22, 2026',
      lastUpdated: 'Sep 24, 2026',
      stage: 'Portfolio Review',
      source: 'Dribbble Outreach',
      lastActivity: 'Yesterday at 3:10 PM',
      jobId: 'uiux',

      currentRole: 'Senior Product Designer',
      targetRole: 'Lead UI/UX Designer',
      level: 'Senior',
      status: 'Active',
      readiness: 'Market Ready',
      location: 'Hyderabad, India',
      preferredLocation: 'Hyderabad / Bangalore / Remote',
      workPreference: 'Remote',

      originalSourceAgent: 'Priya Sharma',
      currentAssignedAgent: 'Rahul Verma',

      professionalSummary:
        'Product & UX designer with 5+ years crafting SaaS interfaces, high-conversion design systems in Figma, user research journeys, and interactive prototypes.',
      totalExperience: '5.5 Years',
      relevantExperience: '5.5 Years',
      links: {
        resume: 'https://storage.staffingbees.com/resumes/ananya-reddy-ux.pdf',
        linkedin: 'https://linkedin.com/in/ananyareddy-design',
        portfolio: 'https://ananyadesigns.io',
      },

      employment: {
        currentEmployer: 'Kite Design Studio',
        currentTitle: 'Senior UI/UX Designer',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Mar 2022',
        noticePeriod: '30 Days',
      },

      compensation: {
        currentSalary: '₹14,50,000 PA',
        expectedSalary: '₹20,00,000 PA',
        minAcceptableSalary: '₹18,00,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'Figma & Design Systems', category: 'Primary', years: '5.5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'User Research & Wireframing', category: 'Primary', years: '5 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Prototyping & Micro-interactions', category: 'Secondary', years: '4 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'Bachelor of Design (B.Des)',
          degree: 'B.Des in Interaction Design',
          specialization: 'HCI & UX Design',
          institution: 'National Institute of Design (NID)',
          graduationYear: '2019',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Completed',
        trainingAreas: [],
        trainingPriority: 'Low',
        trainingReason: 'Exceptional portfolio and enterprise experience.',
        recommendedTraining: 'None',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Ready',
        marketReadyStatus: 'Market Ready',
        coachingTasks: [],
        completedCoaching: [],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Outstanding presentation of product rationale and user journey metrics.',
        improvementAreas: [],
      },

      jobMatches: [
        {
          id: 'JM-601',
          jobTitle: 'Lead Product Designer',
          client: 'FinPulse SaaS',
          opportunityId: 'OPP-UX-201',
          matchStatus: 'High Match (97%)',
          skillMatch: true,
          experienceMatch: true,
          locationMatch: true,
          workModelMatch: true,
          compensationMatch: true,
          availabilityMatch: true,
          workAuthReview: 'Authorized',
          candidateInterest: 'High',
          submissionStatus: 'Ready for Submission',
        },
      ],

      submissions: [],
      interviews: [],
      offers: [],
      placement: null,
      documents: [
        { id: 'DOC-7', type: 'Portfolio Case Study', fileName: 'Ananya_Reddy_FinPulse_Case_Study.pdf', uploadedDate: 'Sep 22, 2026', uploadedBy: 'Priya Sharma', verificationStatus: 'Verified' },
      ],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 22, 2026',
        consentSource: 'Dribbble Outreach',
        consentStatus: 'Active',
      },
      timeline: [
        { id: 'TL-8', date: '22 Sep 2026', time: '03:10 PM', user: 'Priya Sharma', action: 'Portfolio Verified', notes: 'Verified design system and user research artifacts.' },
      ],
      notes: [
        { id: 'N-6', category: 'Strengths', author: 'Rahul Verma', date: 'Sep 24, 2026', content: 'Superb portfolio presentation. Ready for top tier client submissions.' },
      ],
    },
    {
      id: 'SB-CAN-10255',
      name: 'Vikram Rao',
      preferredName: 'Vikram',
      phone: '+91 98765 43219',
      email: 'vikram.rao@example.com',
      created: 'Sep 20, 2026',
      lastUpdated: 'Sep 23, 2026',
      stage: 'Interview',
      source: 'Behance',
      lastActivity: '3 days ago',
      jobId: 'uiux',

      currentRole: 'UI Designer',
      targetRole: 'Product & UI Designer',
      level: 'Mid Level',
      status: 'Active',
      readiness: 'Market Ready',
      location: 'Mumbai, India',
      preferredLocation: 'Mumbai / Remote',
      workPreference: 'Hybrid',

      originalSourceAgent: 'Priya Sharma',
      currentAssignedAgent: 'Priya Sharma',

      professionalSummary: 'UI and motion designer with 4 years creating visually captivating web and mobile interfaces, 3D assets, and interactive design prototypes.',
      totalExperience: '4 Years',
      relevantExperience: '4 Years',

      employment: {
        currentEmployer: 'Studio PixelCraft',
        currentTitle: 'UI Designer',
        employmentStatus: 'Employed',
        employmentType: 'Full-time',
        joiningDate: 'Jun 2022',
        noticePeriod: '30 Days',
      },

      compensation: {
        currentSalary: '₹10,50,000 PA',
        expectedSalary: '₹15,00,000 PA',
        minAcceptableSalary: '₹13,50,000 PA',
        payFrequency: 'Monthly',
        currency: 'INR (₹)',
        negotiable: true,
      },

      skills: [
        { name: 'Figma', category: 'Primary', years: '4 Years', proficiency: 'Expert', lastUsed: 'Current' },
        { name: 'Motion UI & After Effects', category: 'Secondary', years: '3 Years', proficiency: 'Advanced', lastUsed: 'Current' },
      ],

      education: [
        {
          highestQualification: 'B.Des',
          degree: 'Bachelor of Design',
          specialization: 'Visual Communication',
          institution: 'IDC School of Design, IIT Bombay',
          graduationYear: '2020',
        },
      ],

      training: {
        trainingRequired: false,
        trainingStatus: 'Completed',
        trainingAreas: [],
        trainingPriority: 'Low',
        trainingReason: 'N/A',
        recommendedTraining: 'None',
        completionPercentage: 100,
      },

      verification: {
        contactVerified: true,
        professionalVerified: true,
        employmentVerified: true,
        experienceVerified: true,
        skillsVerified: true,
        educationVerified: true,
        duplicateCheck: 'Clear',
        suspiciousProfileCheck: 'Passed',
        resumeConsistency: 'Consistent',
        overallStatus: 'Verified',
      },

      workAuthorization: {
        status: 'Authorized',
        type: 'Citizen of India',
        country: 'India',
        sponsorshipRequired: false,
        verificationStatus: 'Verified',
      },

      readinessDetails: {
        resumeReadiness: 'Ready',
        communicationReadiness: 'High',
        technicalReadiness: 'Interview Ready',
        behavioralReadiness: 'Strong',
        coachingStatus: 'Ready',
        marketReadyStatus: 'Market Ready',
        coachingTasks: [],
        completedCoaching: [],
        pendingCoaching: [],
        mockInterviewStatus: 'Cleared',
        lastFeedback: 'Great visual craft.',
        improvementAreas: [],
      },

      jobMatches: [],
      submissions: [],
      interviews: [],
      offers: [],
      placement: null,
      documents: [],
      consent: {
        contactConsent: true,
        profileSharingConsent: true,
        representationConsent: true,
        consentDate: 'Sep 20, 2026',
        consentSource: 'Behance Outreach',
        consentStatus: 'Active',
      },
      timeline: [],
      notes: [],
    },
  ],
};
