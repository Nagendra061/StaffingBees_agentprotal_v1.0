import React from 'react';
import { X, Play, CheckCircle2, Award, Users, UserCheck } from 'lucide-react';
import { HoneyBeeIcon } from './HoneyBeeLogo';

interface HowTasksWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowTasksWorkModal: React.FC<HowTasksWorkModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 select-none backdrop-blur-2xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden text-xs border border-gray-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-[#f8fafc]">
          <div className="flex items-center space-x-2">
            <HoneyBeeIcon size={20} />
            <span className="font-semibold text-gray-900 text-sm">
              Staffing Bees Agent Certification Journey
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Dark Rectangular Card */}
        <div className="p-6 space-y-4">
          <div className="relative w-full h-[180px] bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] rounded-lg flex flex-col items-center justify-center p-5 text-center text-white shadow-md border border-slate-700/60">
            <div className="mb-2 flex items-center space-x-1">
              <HoneyBeeIcon size={24} />
              <span className="text-xs font-bold text-white tracking-wide">
                Staffing<span className="text-[#FBBF24]">Bees</span>
              </span>
            </div>
            <h3 className="text-base font-bold max-w-sm mb-1">
              How Staffing Bees Agent Certification Works
            </h3>
            <p className="text-[11px] text-gray-300 max-w-xs">
              Complete each certification level by finishing the required tasks and practical assessment. Completing one level unlocks the next.
            </p>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-[#1d4ed8]/90 flex items-center justify-center shadow-lg pl-0.5 border border-white/30">
                <Play className="w-5 h-5 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* Step-by-Step Training & Activation Journey */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Agent Recruitment & Certification Journey
            </h4>

            <div className="grid grid-cols-1 gap-2 text-gray-700">
              <div className="flex items-start space-x-2.5 p-2 bg-gray-50 rounded border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#3ca1df] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800">1. Sequential Progression:</span>{' '}
                  Work through Certifications 1 to 6 in order. Only the current level is unlocked.
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-2 bg-gray-50 rounded border border-gray-100">
                <Award className="w-4 h-4 text-[#e67e22] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800">2. Practical Assessments:</span>{' '}
                  A certification completes only after finishing all mandatory tasks and passing the real-world scenario.
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-2 bg-gray-50 rounded border border-gray-100">
                <Users className="w-4 h-4 text-[#6f42c1] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800">3. Final Assessment:</span>{' '}
                  After all 6 certifications are completed, take the comprehensive end-to-end staffing scenario.
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-2 bg-gray-50 rounded border border-gray-100">
                <UserCheck className="w-4 h-4 text-[#28a745] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800">4. Human Interview & Activation:</span>{' '}
                  1-on-1 interview with StaffingBees leadership to become an Active Agent with live candidate assignments.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-100">
          <span className="text-[11px] text-gray-400">
            StaffingBees Agent Training System
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#3ca1df] hover:bg-[#3293cf] text-white rounded text-xs font-medium cursor-pointer"
          >
            Watch How It Works
          </button>
        </div>
      </div>
    </div>
  );
};
