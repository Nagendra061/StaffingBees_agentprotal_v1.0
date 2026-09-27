import React, { useState } from 'react';
import { X, Plus, Trash2, Filter } from 'lucide-react';

interface FilterRule {
  id: string;
  field: string;
  condition: string;
  value: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterRule[];
  onApplyFilters: (filters: FilterRule[]) => void;
  onClearFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters: initialFilters,
  onApplyFilters,
  onClearFilters,
}) => {
  const [filterList, setFilterList] = useState<FilterRule[]>(initialFilters);

  if (!isOpen) return null;

  const handleAddFilter = () => {
    setFilterList([
      ...filterList,
      {
        id: Date.now().toString(),
        field: 'Stage',
        condition: 'is',
        value: 'Lead',
      },
    ]);
  };

  const handleRemoveFilter = (id: string) => {
    setFilterList(filterList.filter((f) => f.id !== id));
  };

  const handleUpdateFilter = (id: string, key: keyof FilterRule, val: string) => {
    setFilterList(
      filterList.map((f) => (f.id === id ? { ...f, [key]: val } : f))
    );
  };

  const handleSave = () => {
    onApplyFilters(filterList);
    onClose();
  };

  const handleClear = () => {
    setFilterList([]);
    onClearFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="bg-white rounded-md shadow-xl w-[460px] max-w-lg border border-gray-200 overflow-hidden text-xs">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#f8fafc]">
          <div className="flex items-center space-x-1.5">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-800 text-sm">Filters</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 min-h-[160px] max-h-80 overflow-y-auto">
          {filterList.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              <p className="mb-2">No active filters.</p>
              <button
                onClick={handleAddFilter}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-gray-500" />
                <span>Add filter rule</span>
              </button>
            </div>
          ) : (
            <>
              {filterList.map((f) => (
                <div key={f.id} className="flex items-center space-x-2">
                  <select
                    value={f.field}
                    onChange={(e) => handleUpdateFilter(f.id, 'field', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white outline-none focus:border-[#3ca1df]"
                  >
                    <option value="Stage">Stage</option>
                    <option value="Source">Source</option>
                    <option value="Created">Created</option>
                    <option value="Last Activity">Last Activity</option>
                    <option value="Tags">Tags</option>
                  </select>

                  <select
                    value={f.condition}
                    onChange={(e) => handleUpdateFilter(f.id, 'condition', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white outline-none focus:border-[#3ca1df]"
                  >
                    <option value="is">is</option>
                    <option value="is not">is not</option>
                    <option value="contains">contains</option>
                    <option value="starts with">starts with</option>
                  </select>

                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => handleUpdateFilter(f.id, 'value', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 outline-none focus:border-[#3ca1df]"
                    placeholder="Value..."
                  />

                  <button
                    onClick={() => handleRemoveFilter(f.id)}
                    className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={handleAddFilter}
                  className="flex items-center space-x-1 text-[#3ca1df] hover:underline text-xs cursor-pointer font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add another filter</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700 text-xs cursor-pointer hover:underline"
          >
            Clear all
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#3ca1df] hover:bg-[#3293cf] text-white rounded text-xs font-medium cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
