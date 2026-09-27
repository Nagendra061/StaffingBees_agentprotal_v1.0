import React from 'react';
import { Filter } from 'lucide-react';
import { JobId } from '../types';

interface SidebarProps {
  selectedJobId: JobId;
  onSelectJob: (id: JobId) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedJobId,
  onSelectJob,
  collapsed = false,
  onToggleCollapse,
}) => {
  const jobRoles: { id: JobId; label: string }[] = [
    { id: 'frontend', label: 'Frontend Developer' },
    { id: 'backend', label: 'Backend Developer' },
    { id: 'devops', label: 'DevOps Engineer' },
    { id: 'uiux', label: 'UI/UX Designer' },
  ];

  if (collapsed) {
    return (
      <aside className="w-12 bg-white border-r border-gray-200 shrink-0 flex flex-col items-center py-3 select-none">
        <button
          onClick={onToggleCollapse}
          title="Expand sidebar"
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 2H2v12h12V2zm-1 11H5V3h8v10z" />
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-60 bg-white border-r border-gray-200 shrink-0 flex flex-col select-none h-full overflow-y-auto">
      {/* Jobs/Candidates Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          {/* 4-color list icon */}
          <div className="flex flex-col space-y-0.5 justify-center">
            <span className="w-3.5 h-0.5 bg-[#e74c3c] rounded-xs" />
            <span className="w-3.5 h-0.5 bg-[#f39c12] rounded-xs" />
            <span className="w-3.5 h-0.5 bg-[#2ecc71] rounded-xs" />
            <span className="w-3.5 h-0.5 bg-[#3498db] rounded-xs" />
          </div>
          <span className="font-semibold text-gray-800 text-sm">Jobs/Candidates</span>
        </div>

        {/* Small collapse icon */}
        <button
          onClick={onToggleCollapse}
          title="Collapse sidebar"
          className="text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 2H2v12h12V2zm-1 11H5V3h8v10z" />
          </svg>
        </button>
      </div>

      {/* "All Jobs" item */}
      <div className="pt-2 px-2">
        <button
          onClick={() => onSelectJob('all-jobs')}
          className={`w-full flex items-center px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
            selectedJobId === 'all-jobs'
              ? 'bg-[#1d4ed8] text-white font-medium shadow-xs'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="truncate">All Jobs</span>
        </button>
      </div>

      {/* JOBS section header */}
      <div className="px-3.5 pt-4 pb-1">
        <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
          JOBS
        </span>
      </div>

      {/* Job Roles items */}
      <nav className="flex-1 px-2 space-y-0.5 pb-4">
        {jobRoles.map((item) => {
          const isSelected = selectedJobId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectJob(item.id)}
              title={item.label}
              className={`w-full flex items-center px-2 py-1.5 rounded text-xs transition-colors group cursor-pointer text-left ${
                isSelected
                  ? 'bg-[#1d4ed8] text-white font-medium shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Filter
                className={`w-3 h-3 mr-2 shrink-0 ${
                  isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
