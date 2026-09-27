import React, { useState } from 'react';
import {
  RotateCw,
  Mail,
  Phone,
  User,
  Tag,
  Trash2,
  Download,
  HelpCircle,
  SlidersHorizontal,
  Filter,
  ChevronDown,
  FileSpreadsheet,
} from 'lucide-react';

interface ActionToolbarProps {
  selectedCount: number;
  totalCount: number;
  activeListName: string;
  onUpdateList: () => void;
  isUpdating: boolean;
  onOpenColumns: () => void;
  onOpenFilters: () => void;
  onOpenHelp: () => void;
  activeFilterCount: number;
  onAddCandidate?: () => void;
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  selectedCount,
  totalCount,
  activeListName,
  onUpdateList,
  isUpdating,
  onOpenColumns,
  onOpenFilters,
  onOpenHelp,
  activeFilterCount,
  onAddCandidate,
}) => {
  const [showListMenu, setShowListMenu] = useState(false);

  const hasSelection = selectedCount > 0;

  return (
    <div className="w-full shrink-0">
      {/* Top Header Row: Title & Update List Button */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        {/* Left: Filter Icon & List Title */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400 stroke-[2]" />
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {activeListName}
          </h1>
        </div>

        {/* Right: Update List & Action Button */}
        <div className="flex items-center space-x-2 relative">
          {onAddCandidate && (
            <button
              onClick={onAddCandidate}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded text-xs transition-colors cursor-pointer shadow-2xs font-semibold"
            >
              <span>+ Add Candidate</span>
            </button>
          )}

          <button
            onClick={onUpdateList}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs transition-colors cursor-pointer shadow-2xs font-normal"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-gray-500 ${isUpdating ? 'animate-spin text-[#1d4ed8]' : ''}`}
            />
            <span>Update List</span>
          </button>

          {/* Square Blue List Action Button */}
          <div className="relative">
            <button
              onClick={() => setShowListMenu(!showListMenu)}
              title="Smart List Options"
              className="w-7 h-7 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </button>

            {showListMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg py-1 z-20 text-xs">
                <button
                  onClick={() => setShowListMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                >
                  Save as new list
                </button>
                <button
                  onClick={() => setShowListMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                >
                  Edit Smart List filters
                </button>
                <button
                  onClick={() => setShowListMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700"
                >
                  Reset columns
                </button>
                <button
                  onClick={() => setShowListMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-red-600 border-t border-gray-100"
                >
                  Delete this list
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Toolbar Row: "No candidates found" + Batch Actions + List Controls */}
      <div className="flex items-center justify-between px-6 py-2 select-none">
        {/* Left Side: Count & Action Icons */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 font-normal mr-2">
            {totalCount === 0
              ? 'No candidates found'
              : hasSelection
              ? `${selectedCount} selected`
              : `${totalCount} candidates found`}
          </span>

          {/* Disabled action icons in screenshot */}
          <div className="flex items-center space-x-1">
            <button
              disabled={!hasSelection}
              title="Mass Email"
              className={`w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center ${
                hasSelection ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
            </button>

            <button
              disabled={!hasSelection}
              title="Mass Text / Call"
              className={`w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center ${
                hasSelection ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
            </button>

            <button
              disabled={!hasSelection}
              title="Assign Agent"
              className={`w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center ${
                hasSelection ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <User className="w-3.5 h-3.5" />
            </button>

            <button
              disabled={!hasSelection}
              title="Add Tags"
              className={`w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center ${
                hasSelection ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
            </button>

            <button
              disabled={!hasSelection}
              title="Delete Leads"
              className={`w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center ${
                hasSelection ? 'text-red-500 hover:bg-red-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              disabled={!hasSelection}
              title="Export"
              className={`w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center ${
                hasSelection ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Help link, Columns, Filters */}
        <div className="flex items-center space-x-2.5">
          {/* "How Smart Lists work" link */}
          <button
            onClick={onOpenHelp}
            className="flex items-center space-x-1 text-[#17a2b8] hover:text-[#138496] hover:underline text-xs cursor-pointer mr-1 font-normal"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#17a2b8]" />
            <span>How Smart Lists work</span>
          </button>

          {/* Columns button */}
          <button
            onClick={onOpenColumns}
            className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs transition-colors cursor-pointer shadow-2xs font-normal"
          >
            <svg className="w-3 h-3 text-gray-500" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3h3v10H2V3zm4.5 0h3v10h-3V3zm4.5 0h3v10h-3V3z" />
            </svg>
            <span>Columns</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {/* Filters (0) button */}
          <button
            onClick={onOpenFilters}
            className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs transition-colors cursor-pointer shadow-2xs font-normal"
          >
            <Filter className="w-3 h-3 text-gray-500" />
            <span>Filters ({activeFilterCount})</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
