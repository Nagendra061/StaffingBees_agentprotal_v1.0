import { Conversation } from '../types';

export const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    candidateName: 'Rahul Sharma',
    jobTitle: 'Frontend Developer',
    lastMessage: 'Hi, I wanted to check the status of my application.',
    timestamp: '10:42 AM',
    unread: true,
    folder: 'inbox',
    messages: [
      {
        id: 'm1',
        sender: 'Rahul Sharma',
        text: 'Hi, I wanted to check the status of my application for the Frontend Developer role.',
        timestamp: '10:42 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    candidateName: 'Ananya Reddy',
    jobTitle: 'UI/UX Designer',
    lastMessage: 'Thank you for scheduling the interview.',
    timestamp: 'Yesterday',
    unread: false,
    folder: 'inbox',
    messages: [
      {
        id: 'm2',
        sender: 'Staffing Bees Recruiter',
        text: 'Hi Ananya, your design portfolio review is confirmed for tomorrow at 3 PM.',
        timestamp: 'Yesterday 2:30 PM',
        isRecruiter: true,
      },
      {
        id: 'm3',
        sender: 'Ananya Reddy',
        text: 'Thank you for scheduling the interview. I look forward to speaking with the team.',
        timestamp: 'Yesterday 3:15 PM',
      },
    ],
  },
  {
    id: 'conv-3',
    candidateName: 'Kiran Kumar',
    jobTitle: 'Backend Developer',
    lastMessage: 'Could you please share the interview details?',
    timestamp: 'Sep 23',
    unread: false,
    folder: 'assigned',
    messages: [
      {
        id: 'm4',
        sender: 'Kiran Kumar',
        text: 'Could you please share the interview details and preparation material?',
        timestamp: 'Sep 23 11:15 AM',
      },
    ],
  },
];
