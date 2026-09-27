import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Award, Check } from 'lucide-react';
import { CertificationTask } from '../types';

interface TaskDetailModalProps {
  task: CertificationTask | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteTask: (taskId: string, submission: string, passed?: boolean) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onCompleteTask,
}) => {
  if (!isOpen || !task) return null;

  const [submissionText, setSubmissionText] = useState(task.submission || '');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [assessmentResult, setAssessmentResult] = useState<'idle' | 'passed' | 'failed'>('idle');

  const isCompleted = task.status === 'completed';

  const handleRegularSubmit = () => {
    onCompleteTask(task.id, submissionText, true);
    onClose();
  };

  const handleAssessmentSubmit = () => {
    if (!task.options) return;
    const selected = task.options.find((o) => o.id === selectedOptionId);
    if (selected?.isCorrect) {
      setAssessmentResult('passed');
      setTimeout(() => {
        onCompleteTask(task.id, selected.label, true);
        onClose();
      }, 700);
    } else {
      setAssessmentResult('failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 select-none">
      <div className="bg-white rounded-md shadow-2xl max-w-lg w-full overflow-hidden text-xs border border-gray-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 bg-[#f8fafc] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {task.isAssessment ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e8f4fd] text-[#1f78b4] border border-[#bce0fd]">
                Practical Assessment
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                {task.id}
              </span>
            )}
            <h3 className="font-semibold text-gray-800 text-sm truncate max-w-[300px]">
              {task.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* What the Agent Must Do */}
          <div>
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              What the Agent Must Do
            </h4>
            <p className="text-gray-800 bg-gray-50 border border-gray-200 rounded p-2.5 leading-relaxed">
              {task.whatMustDo}
            </p>
          </div>

          {/* Completion Criteria */}
          <div>
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Completion Criteria
            </h4>
            <div className="flex items-start space-x-2 text-gray-700 bg-blue-50/50 border border-blue-100 rounded p-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#3ca1df] shrink-0 mt-0.5" />
              <span>{task.completionCriteria}</span>
            </div>
          </div>

          {/* Practical Assessment Scenario OR Regular Task Submission */}
          {task.isAssessment && task.options ? (
            <div className="space-y-3 pt-1">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Select Correct Professional Action / Assessment Decision:
              </h4>

              <div className="space-y-2">
                {task.options.map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => {
                      if (!isCompleted) {
                        setSelectedOptionId(opt.id);
                        setAssessmentResult('idle');
                      }
                    }}
                    className={`flex items-start space-x-2.5 p-3 rounded border cursor-pointer transition-colors ${
                      selectedOptionId === opt.id
                        ? 'border-[#3ca1df] bg-blue-50/40 text-gray-900'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="assessment-opt"
                      checked={selectedOptionId === opt.id}
                      onChange={() => {}}
                      className="mt-0.5 text-[#3ca1df] focus:ring-0"
                    />
                    <span className="leading-relaxed">{opt.label}</span>
                  </label>
                ))}
              </div>

              {assessmentResult === 'failed' && (
                <div className="flex items-center space-x-2 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Incorrect decision. Review the StaffingBees certification standards and try again.
                  </span>
                </div>
              )}

              {assessmentResult === 'passed' && (
                <div className="flex items-center space-x-2 p-2.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Practical assessment passed successfully! Completing certification...</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Agent Work Submission / Record
              </h4>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                disabled={isCompleted}
                rows={3}
                placeholder="Enter or review your task notes/submission..."
                className="w-full border border-gray-300 rounded p-2.5 text-xs text-gray-800 outline-none focus:border-[#3ca1df] disabled:bg-gray-50"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
          <div className="text-[11px] text-gray-500">
            Status:{' '}
            <span
              className={`font-semibold ${
                isCompleted ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {isCompleted ? 'Completed' : 'Pending Verification'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs cursor-pointer"
            >
              Cancel
            </button>

            {task.isAssessment ? (
              <button
                onClick={handleAssessmentSubmit}
                disabled={!selectedOptionId || isCompleted}
                className="px-4 py-1.5 bg-[#3ca1df] hover:bg-[#3293cf] disabled:opacity-50 text-white rounded text-xs font-medium cursor-pointer flex items-center space-x-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Submit Assessment</span>
              </button>
            ) : (
              <button
                onClick={handleRegularSubmit}
                disabled={isCompleted}
                className="px-4 py-1.5 bg-[#3ca1df] hover:bg-[#3293cf] disabled:opacity-50 text-white rounded text-xs font-medium cursor-pointer"
              >
                {isCompleted ? 'Task Completed' : 'Complete Task'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
