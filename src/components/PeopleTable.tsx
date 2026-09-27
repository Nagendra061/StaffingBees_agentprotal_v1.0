import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Candidate } from '../types';

interface CandidatesTableProps {
  candidates: Candidate[];
  onToggleSelectAll: () => void;
  onToggleSelectCandidate: (id: string) => void;
  onSelectCandidate?: (candidate: Candidate) => void;
  allSelected: boolean;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  visibleColumns?: { [key: string]: boolean };
}

export const PeopleTable: React.FC<CandidatesTableProps> = ({
  candidates,
  onToggleSelectAll,
  onToggleSelectCandidate,
  onSelectCandidate,
  allSelected,
  sortField,
  sortDirection,
  onSort,
  visibleColumns = {
    name: true,
    phone: true,
    email: true,
    created: true,
    stage: true,
    source: true,
    lastActivity: true,
  },
}) => {
  return (
    <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
      <div className="w-full bg-white border border-gray-200 rounded-sm flex-1 flex flex-col overflow-hidden shadow-2xs">
        {/* Table scroll container */}
        <div className="overflow-x-auto overflow-y-auto flex-1 flex flex-col">
          <table className="w-full text-left border-collapse text-xs">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#f8fafc] border-b border-gray-200 text-gray-500 font-normal select-none h-9">
                {/* Checkbox column */}
                <th className="w-10 px-3 py-2 text-center border-r border-transparent">
                  <input
                    type="checkbox"
                    checked={allSelected && candidates.length > 0}
                    onChange={onToggleSelectAll}
                    disabled={candidates.length === 0}
                    className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#3ca1df] focus:ring-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </th>

                {/* Name */}
                {visibleColumns.name && (
                  <th
                    onClick={() => onSort('name')}
                    className="px-3 py-2 font-normal text-gray-500 cursor-pointer hover:text-gray-700 min-w-[140px]"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {sortField === 'name' && (
                        sortDirection === 'desc' ? (
                          <ArrowDown className="w-3 h-3 text-gray-500" />
                        ) : (
                          <ArrowUp className="w-3 h-3 text-gray-500" />
                        )
                      )}
                    </div>
                  </th>
                )}

                {/* Phone */}
                {visibleColumns.phone && (
                  <th className="px-3 py-2 font-normal text-gray-500 min-w-[120px]">
                    Phone
                  </th>
                )}

                {/* Email */}
                {visibleColumns.email && (
                  <th className="px-3 py-2 font-normal text-gray-500 min-w-[160px]">
                    Email
                  </th>
                )}

                {/* Created ↓ */}
                {visibleColumns.created && (
                  <th
                    onClick={() => onSort('created')}
                    className="px-3 py-2 font-normal text-gray-500 cursor-pointer hover:text-gray-700 min-w-[110px]"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created</span>
                      <ArrowDown className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
                    </div>
                  </th>
                )}

                {/* Stage ▾ */}
                {visibleColumns.stage && (
                  <th className="px-3 py-2 font-normal text-gray-500 min-w-[100px]">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                      <span>Stage</span>
                      <svg className="w-2.5 h-2.5 text-gray-500 fill-current" viewBox="0 0 10 6">
                        <polygon points="0,0 10,0 5,6" />
                      </svg>
                    </div>
                  </th>
                )}

                {/* Source */}
                {visibleColumns.source && (
                  <th className="px-3 py-2 font-normal text-gray-500 min-w-[110px]">
                    Source
                  </th>
                )}

                {/* Last Activity */}
                {visibleColumns.lastActivity && (
                  <th className="px-3 py-2 font-normal text-gray-500 min-w-[120px]">
                    Last Activity
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body if candidates exist */}
            {candidates.length > 0 && (
              <tbody className="divide-y divide-gray-100">
                {candidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className={`hover:bg-[#f0f7fc] transition-colors cursor-pointer ${
                      candidate.selected ? 'bg-[#eef6fc]' : ''
                    }`}
                  >
                    <td className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={candidate.selected || false}
                        onChange={() => onToggleSelectCandidate(candidate.id)}
                        className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#3ca1df] focus:ring-0 cursor-pointer"
                      />
                    </td>
                    {visibleColumns.name && (
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectCandidate) onSelectCandidate(candidate);
                          }}
                          className="font-semibold text-blue-600 hover:text-[#1d4ed8] hover:underline cursor-pointer text-left transition-colors flex items-center group"
                          title={`View ${candidate.name}'s Profile`}
                        >
                          <span>{candidate.name}</span>
                        </button>
                      </td>
                    )}
                    {visibleColumns.phone && (
                      <td className="px-3 py-2 text-gray-600">{candidate.phone}</td>
                    )}
                    {visibleColumns.email && (
                      <td className="px-3 py-2 text-gray-600">{candidate.email}</td>
                    )}
                    {visibleColumns.created && (
                      <td className="px-3 py-2 text-gray-600">{candidate.created}</td>
                    )}
                    {visibleColumns.stage && (
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
                          {candidate.stage}
                        </span>
                      </td>
                    )}
                    {visibleColumns.source && (
                      <td className="px-3 py-2 text-gray-600">{candidate.source}</td>
                    )}
                    {visibleColumns.lastActivity && (
                      <td className="px-3 py-2 text-gray-500">{candidate.lastActivity}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Empty State exactly matching the screenshot */}
          {candidates.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-28 select-none">
              {/* Grey 3-Users Silhouette Icon */}
              <div className="text-[#8e9aa8] mb-3 flex items-center justify-center">
                <svg
                  className="w-14 h-11 text-[#8e9aa8]"
                  viewBox="0 0 48 38"
                  fill="currentColor"
                >
                  {/* Left Person */}
                  <circle cx="14" cy="12" r="6" />
                  <path d="M4 32c0-5 5-9 10-9 2 0 4 0.6 5.5 1.7C16.8 26.6 15 30 15 34H4v-2z" />

                  {/* Right Person */}
                  <circle cx="34" cy="12" r="6" />
                  <path d="M44 32c0-5-5-9-10-9-2 0-4 0.6-5.5 1.7C31.2 26.6 33 30 33 34h11v-2z" />

                  {/* Center Foreground Person */}
                  <circle cx="24" cy="10" r="7" />
                  <path d="M12 34c0-6 5.5-10.5 12-10.5s12 4.5 12 10.5H12z" />
                </svg>
              </div>

              {/* Exact text: "No candidates match filters, try another search" */}
              <p className="text-[#64748b] text-[13px] font-normal tracking-normal">
                No candidates match filters, try another search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
