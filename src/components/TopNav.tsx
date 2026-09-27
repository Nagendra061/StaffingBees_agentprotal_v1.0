import React, { useState } from 'react';
import {
  Users,
  Home,
  LayoutDashboard,
  Building,
  Briefcase,
  FileCheck2,
  Award,
  DollarSign,
  GraduationCap,
  Layers,
  ShieldCheck,
  Search,
  Bell,
  LogOut,
  Sun,
  Moon,
  Clock,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { StaffingBeesLogo } from './HoneyBeeLogo';
import { Agent } from '../types';
import { INITIAL_AGENTS } from '../data/platformData';

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  onLogout?: () => void;
  currentAgent: Agent;
  onSwitchAgent?: (agent: Agent) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  searchQuery,
  onSearchChange,
  activeNav,
  onNavClick,
  onLogout,
  currentAgent,
  onSwitchAgent,
  theme = 'light',
  onToggleTheme,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isLicencePending = currentAgent.licenceStatus === 'pending';

  // Navigation Items per PRD Section 7, 8 & 13
  // If licence is pending, nav is restricted to Home + Training & Certification only!
  const allNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'full dashboard', label: 'Full Dashboard', icon: LayoutDashboard },
    { id: 'my candidates', label: 'My Candidates', icon: Users },
    { id: 'my clients', label: 'My Clients', icon: Building },
    { id: 'available requirements', label: 'Available Requirements', icon: Briefcase },
    { id: 'my submissions', label: 'My Submissions', icon: FileCheck2 },
    { id: 'my agent referrals', label: 'My Agent Referrals', icon: Award },
    { id: 'my financials', label: 'My Financials', icon: DollarSign },
    { id: 'training & certification', label: 'Training & Certification', icon: GraduationCap },
    { id: 'all services', label: 'All Services', icon: Layers },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  const visibleNavItems = isLicencePending
    ? allNavItems.filter((i) => i.id === 'home' || i.id === 'training & certification')
    : allNavItems;

  return (
    <header className="bg-[#0f172a] text-gray-300 h-13 flex items-center justify-between px-3 text-xs select-none border-b border-[#1e293b] z-30 shrink-0">
      {/* Left side: Logo & Navigation */}
      <div className="flex items-center space-x-2 md:space-x-3 h-full overflow-x-auto no-scrollbar">
        {/* Staffing Bees Honey Bee Logo */}
        <div
          onClick={onLogout}
          title="Return to Landing Page"
          className="flex items-center mr-1 cursor-pointer hover:opacity-95 transition-opacity shrink-0"
        >
          <StaffingBeesLogo size="md" />
        </div>

        {/* Licence pending indicator badge */}
        {isLicencePending && (
          <div className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Licence Pending (Restricted Nav)</span>
          </div>
        )}

        {/* Navigation items */}
        <nav className="flex items-center h-full space-x-0.5 shrink-0">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeNav.toLowerCase() === item.label.toLowerCase() ||
              activeNav.toLowerCase() === item.id ||
              (item.id === 'my candidates' && activeNav.toLowerCase().includes('candidate'));

            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.label)}
                className={`relative flex items-center space-x-1.5 h-full px-2.5 transition-colors cursor-pointer text-xs whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold bg-[#1e293b]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1e293b]/60 font-normal'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-[#FBBF24]' : 'text-gray-400'
                  }`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-white" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right side: Search, Theme Toggle, and Profile Avatar */}
      <div className="flex items-center space-x-2 shrink-0 ml-2">
        {/* Search */}
        <div className="relative flex items-center hidden xl:block w-48">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search portal..."
            className="w-full bg-[#1e293b] text-gray-200 placeholder-gray-400 pl-7 pr-3 py-1 rounded-full text-xs outline-none focus:ring-1 focus:ring-[#1d4ed8]"
          />
        </div>

        {/* Theme Toggle (PRD Section 15) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="w-7 h-7 rounded-full hover:bg-[#1e293b] flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Profile Avatar & Persona Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title={`${currentAgent.name} (${currentAgent.id})`}
            className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-[#1e293b] cursor-pointer transition-colors"
          >
            <div
              className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs"
              style={{ backgroundColor: currentAgent.avatarBg || '#d35400' }}
            >
              {currentAgent.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-2xl py-2 z-50 border border-gray-200 text-xs animate-in fade-in slide-in-from-top-1">
              <div className="px-3.5 py-2 border-b border-gray-100">
                <div className="font-bold text-gray-900 flex items-center justify-between">
                  <span>{currentAgent.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      currentAgent.licenceStatus === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {currentAgent.licenceStatus === 'active' ? 'Licensed' : 'Licence Pending'}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  ID: {currentAgent.id} • {currentAgent.email}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">
                  Credits: {currentAgent.credits} pts
                </div>
              </div>

              {/* Persona Switcher Section */}
              <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/80">
                Switch Agent Persona
              </div>

              {INITIAL_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onSwitchAgent) onSwitchAgent(agent);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-amber-50/70 flex items-center justify-between transition-colors ${
                    agent.id === currentAgent.id ? 'bg-amber-50/50 font-bold text-amber-950' : 'text-gray-700'
                  }`}
                >
                  <div>
                    <div className="text-xs">{agent.name}</div>
                    <div className="text-[10px] text-gray-400 font-normal">
                      {agent.id} • {agent.licenceStatus}
                    </div>
                  </div>
                  {agent.id === currentAgent.id && (
                    <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                  )}
                </button>
              ))}

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out to Public Site</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
