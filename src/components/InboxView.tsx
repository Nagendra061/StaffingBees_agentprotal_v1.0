import React, { useState } from 'react';
import { ChevronDown, Play, Filter, Check, ArrowLeft, Send } from 'lucide-react';
import { HoneyBeeIcon } from './HoneyBeeLogo';
import { Conversation, InboxFolder, Message } from '../types';

interface InboxViewProps {
  selectedFolder: InboxFolder;
  conversations: Conversation[];
  onOpenVideoModal: () => void;
  onSelectConversation?: (conv: Conversation) => void;
  selectedConversation?: Conversation | null;
  onSendMessage?: (convId: string, text: string) => void;
  onToggleDemoData?: () => void;
  hasDemoData?: boolean;
}

export const InboxView: React.FC<InboxViewProps> = ({
  selectedFolder,
  conversations,
  onOpenVideoModal,
  onSelectConversation,
  selectedConversation,
  onSendMessage,
  onToggleDemoData,
  hasDemoData = false,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'email' | 'text'>('all');
  const [replyText, setReplyText] = useState('');

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    if (selectedFolder !== 'inbox' && c.folder !== selectedFolder) return false;
    if (filterType === 'unread' && !c.unread) return false;
    return true;
  });

  const handleSend = () => {
    if (!replyText.trim() || !selectedConversation || !onSendMessage) return;
    onSendMessage(selectedConversation.id, replyText);
    setReplyText('');
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#ebedf0]">
      {/* Middle Column: Inbox Conversation List Area */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 select-none">
        {/* Top Controls: [ All | Unread ] and Filter ▾ */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
          {/* Segmented Button [ All | Unread ] */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded border border-gray-200 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-gray-800 font-medium shadow-2xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('unread')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                filterType === 'unread'
                  ? 'bg-white text-gray-800 font-medium shadow-2xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Unread
            </button>
          </div>

          {/* Filter ▾ button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <span className="text-gray-600">Filter</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded shadow-md py-1 z-20 text-xs">
                <button
                  onClick={() => {
                    setSelectedChannel('all');
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                >
                  <span>All Channels</span>
                  {selectedChannel === 'all' && <Check className="w-3 h-3 text-[#3ca1df]" />}
                </button>
                <button
                  onClick={() => {
                    setSelectedChannel('email');
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                >
                  <span>Emails only</span>
                  {selectedChannel === 'email' && <Check className="w-3 h-3 text-[#3ca1df]" />}
                </button>
                <button
                  onClick={() => {
                    setSelectedChannel('text');
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                >
                  <span>Texts only</span>
                  {selectedChannel === 'text' && <Check className="w-3 h-3 text-[#3ca1df]" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Conversation List or Empty State */}
        {filteredConversations.length > 0 ? (
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredConversations.map((conv) => {
              const isSelected = selectedConversation?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation && onSelectConversation(conv)}
                  className={`p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#eef6fc] border-l-3 border-[#3ca1df]'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-gray-800 truncate">
                      {conv.candidateName}
                    </span>
                    <span className="text-[11px] text-gray-400 shrink-0">
                      {conv.timestamp}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#3ca1df] font-medium mb-1">
                    {conv.jobTitle}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State exactly matching the screenshot */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
            {/* Tray Icon */}
            <div className="text-gray-400 mb-2">
              <svg
                className="w-12 h-10 text-gray-400 stroke-1"
                viewBox="0 0 48 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Paper inside tray */}
                <path d="M12 12h24M16 8h16" stroke="currentColor" />
                {/* Inbox Tray */}
                <path d="M6 16l4-8h28l4 8v16a2 2 0 01-2 2H8a2 2 0 01-2-2V16z" />
                {/* Cutout front */}
                <path d="M6 24h10l3 4h10l3-4h10" />
              </svg>
            </div>

            {/* Exact text: "Inbox is empty, nice work!" */}
            <p className="text-gray-400 text-xs font-normal">
              Inbox is empty, nice work!
            </p>

            {/* Subtle demo data toggle */}
            {onToggleDemoData && (
              <button
                onClick={onToggleDemoData}
                className="mt-6 text-[11px] text-gray-400 hover:text-[#3ca1df] hover:underline cursor-pointer"
              >
                {hasDemoData ? 'Clear demo conversations' : 'Load 2-3 demo conversations'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Onboarding Panel OR Active Conversation Thread */}
      <div className="flex-1 flex flex-col overflow-y-auto items-center justify-center p-6 bg-[#ebedf0]">
        {selectedConversation ? (
          /* Active conversation view */
          <div className="w-full max-w-2xl bg-white rounded-md shadow-xs border border-gray-200 flex flex-col h-[520px] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between bg-[#f8fafc]">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onSelectConversation && onSelectConversation(null as any)}
                  className="text-gray-400 hover:text-gray-600 sm:hidden cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {selectedConversation.candidateName}
                  </h3>
                  <span className="text-xs text-[#3ca1df] font-medium">
                    {selectedConversation.jobTitle} Candidate
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {selectedConversation.timestamp}
              </span>
            </div>

            {/* Message thread */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-[#fdfdfd]">
              {selectedConversation.messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isRecruiter ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[11px] text-gray-400 mb-0.5">
                    {m.sender} • {m.timestamp}
                  </div>
                  <div
                    className={`max-w-md px-3.5 py-2 rounded text-xs leading-relaxed ${
                      m.isRecruiter
                        ? 'bg-[#3ca1df] text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-3 border-t border-gray-200 bg-white flex items-center space-x-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message to candidate..."
                className="flex-1 text-xs border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#3ca1df]"
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 bg-[#3ca1df] hover:bg-[#3293cf] text-white rounded text-xs flex items-center space-x-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        ) : (
          /* Right-Side Onboarding / Video & Help Panel matching Staffing Bees Image */
          <div className="flex flex-col items-center max-w-xl w-full select-none py-6">
            {/* Dark rectangular video box */}
            <div
              onClick={onOpenVideoModal}
              className="relative w-full max-w-[510px] h-[250px] bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] hover:brightness-105 transition-all rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-md group border border-slate-700/60 overflow-hidden"
            >
              {/* Honey Bee watermark / top branding */}
              <div className="mb-2 flex items-center space-x-1.5">
                <HoneyBeeIcon size={24} />
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  Staffing<span className="text-[#FBBF24]">Bees</span>
                </span>
              </div>

              {/* Heading inside dark card */}
              <h2 className="text-white text-lg md:text-xl font-bold tracking-tight max-w-md leading-snug px-4 drop-shadow-xs">
                How the Inbox helps you never miss important candidate conversations
              </h2>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#1d4ed8]/90 group-hover:bg-[#1d4ed8] group-hover:scale-110 transition-all flex items-center justify-center text-white shadow-xl pl-0.5 border border-white/30">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>
              </div>
            </div>

            {/* Section below the dark box */}
            <div className="flex flex-col items-center mt-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-1.5">
                Get Started Today
              </h3>
              <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                Inbox shows you all emails & texts with your candidates inside Staffing Bees.
              </p>

              {/* "How It Works" button */}
              <button
                onClick={onOpenVideoModal}
                className="mt-4 px-6 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-sm"
              >
                How It Works
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
