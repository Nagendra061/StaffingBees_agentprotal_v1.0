import React from 'react';
import { X, HelpCircle, CheckCircle2 } from 'lucide-react';

interface SmartListsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartListsModal: React.FC<SmartListsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="bg-white rounded-md shadow-xl w-[500px] max-w-lg border border-gray-200 overflow-hidden text-xs">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#f8fafc]">
          <div className="flex items-center space-x-1.5 text-gray-800">
            <HelpCircle className="w-4 h-4 text-[#17a2b8]" />
            <span className="font-semibold text-sm">How Job Pipelines Work</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-gray-600 leading-relaxed text-xs">
          <p>
            Job pipelines automatically track and organize prospective candidates
            across active requisitions. Selecting any job in the left sidebar filters
            the view to only display candidates pipelined for that role.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#28a745] shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-800">Automated Pipeline Routing:</strong>{' '}
                New candidate applications immediately link to their respective job roles.
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#28a745] shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-800">Stage Tracking:</strong> Track candidates
                from Initial Screening through Technical Assessment, Interview, and Shortlisted stages.
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#28a745] shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-800">Real-Time Search & Filters:</strong> Instantly
                filter by stage, source, or candidate name across your team.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#3ca1df] hover:bg-[#3293cf] text-white rounded text-xs font-medium cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
