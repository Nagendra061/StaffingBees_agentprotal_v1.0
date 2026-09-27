import React from 'react';
import { Inbox, User, FileText, Send, CheckCircle2 } from 'lucide-react';
import { InboxFolder } from '../types';

interface InboxSidebarProps {
  selectedFolder: InboxFolder;
  onSelectFolder: (folder: InboxFolder) => void;
  unreadCount?: number;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({
  selectedFolder,
  onSelectFolder,
  unreadCount = 0,
}) => {
  const folders: { id: InboxFolder; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'assigned', label: 'Assigned', icon: User },
    { id: 'drafts', label: 'Drafts', icon: FileText },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'closed', label: 'Closed', icon: CheckCircle2 },
  ];

  return (
    <aside className="w-52 bg-white border-r border-gray-200 shrink-0 flex flex-col select-none h-full overflow-y-auto">
      {/* Header: My Inbox (0) */}
      <div className="px-4 py-3.5 border-b border-gray-100">
        <h2 className="text-xs font-semibold text-gray-800 tracking-tight">
          My Inbox ({unreadCount})
        </h2>
      </div>

      {/* Navigation List */}
      <nav className="p-2 space-y-0.5">
        {folders.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedFolder === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectFolder(item.id)}
              className={`w-full flex items-center px-3 py-2 rounded text-xs transition-colors cursor-pointer text-left ${
                isSelected
                  ? 'bg-[#eff6ff] text-[#1d4ed8] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-normal'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 mr-2.5 shrink-0 ${
                  isSelected ? 'text-[#1d4ed8]' : 'text-gray-400'
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
