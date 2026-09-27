import React from 'react';
import { X, Check } from 'lucide-react';

interface ColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibleColumns: { [key: string]: boolean };
  onToggleColumn: (key: string) => void;
  onResetColumns: () => void;
}

export const ColumnsModal: React.FC<ColumnsModalProps> = ({
  isOpen,
  onClose,
  visibleColumns,
  onToggleColumn,
  onResetColumns,
}) => {
  if (!isOpen) return null;

  const columnOptions = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'created', label: 'Created' },
    { key: 'stage', label: 'Stage' },
    { key: 'source', label: 'Source' },
    { key: 'lastActivity', label: 'Last Activity' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="bg-white rounded-md shadow-xl w-80 max-w-sm border border-gray-200 overflow-hidden text-xs">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#f8fafc]">
          <span className="font-semibold text-gray-800 text-sm">Customize Columns</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 space-y-1 max-h-64 overflow-y-auto">
          {columnOptions.map((col) => {
            const isChecked = visibleColumns[col.key] !== false;
            return (
              <label
                key={col.key}
                onClick={() => onToggleColumn(col.key)}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer select-none"
              >
                <span className="text-gray-700">{col.label}</span>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isChecked
                      ? 'bg-[#3ca1df] border-[#3ca1df] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onResetColumns}
            className="text-gray-500 hover:text-gray-700 text-xs cursor-pointer hover:underline"
          >
            Reset to default
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#3ca1df] hover:bg-[#3293cf] text-white rounded text-xs font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
