import React from 'react';
import { X, Play, CheckCircle2, MessageSquare, Mail, Phone } from 'lucide-react';
import { HoneyBeeIcon } from './HoneyBeeLogo';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden text-xs">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-[#f8fafc]">
          <div className="flex items-center space-x-2">
            <HoneyBeeIcon size={20} />
            <span className="font-semibold text-gray-900 text-sm">
              Staffing Bees Inbox Walkthrough
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-600">
          <div className="bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] text-white p-5 rounded-lg text-center border border-slate-700/60 shadow-inner">
            <div className="flex items-center justify-center space-x-1.5 mb-1.5">
              <HoneyBeeIcon size={22} />
              <span className="text-xs font-bold text-white">Staffing<span className="text-[#FBBF24]">Bees</span></span>
            </div>
            <h4 className="text-base font-bold mb-1">
              Centralized Candidate Communication
            </h4>
            <p className="text-xs text-gray-300">
              Never let a top candidate slip through the cracks.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded bg-blue-50 text-[#1d4ed8] flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-gray-900">Unified Inboxes:</strong> All emails,
                inbound applications, and replies appear right in your candidate stream.
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded bg-green-50 text-[#16a34a] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-gray-900">Integrated SMS & Calling:</strong> Send
                interview reminders and follow-up texts directly with candidate records.
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded bg-purple-50 text-[#7c3aed] flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-gray-900">Team Collaboration:</strong> Assign
                conversations to hiring managers and add internal notes without leaving the app.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-5 py-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded text-xs font-semibold cursor-pointer shadow-xs"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
