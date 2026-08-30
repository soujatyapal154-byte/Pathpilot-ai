import React, { useState, useRef, useEffect } from 'react';
import { Compass, Sparkles, User, Map, MessageSquareHeart, Bookmark, Sun, Moon, GraduationCap, Menu, X, ChevronDown } from 'lucide-react';
import { ActiveTab, StudentProfile } from '../types';
import { PRESET_STUDENT_PROFILES } from '../data/presets';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  onToggleTheme?: () => void;
  setDarkMode?: (dark: boolean) => void;
  savedCount?: number;
  hasAnalysis: boolean;
  onSelectPreset?: (profile: StudentProfile) => void;
  onOpenPresets?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  onToggleTheme,
  setDarkMode,
  savedCount = 0,
  hasAnalysis,
  onSelectPreset,
  onOpenPresets,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presetsDropdownOpen, setPresetsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPresetsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleDarkMode = () => {
    if (typeof onToggleTheme === 'function') {
      onToggleTheme();
    } else if (typeof setDarkMode === 'function') {
      setDarkMode(!darkMode);
    }
  };

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode; badge?: number; disabled?: boolean }[] = [
    { tab: 'landing', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { tab: 'quiz', label: 'Profile Quiz', icon: <User className="w-4 h-4" /> },
    {
      tab: 'recommendations',
      label: 'Recommendations',
      icon: <Sparkles className="w-4 h-4" />,
      disabled: !hasAnalysis,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      tab: 'roadmap',
      label: 'Roadmap',
      icon: <Map className="w-4 h-4" />,
      disabled: !hasAnalysis,
    },
    { tab: 'mentor', label: 'AI Mentor', icon: <MessageSquareHeart className="w-4 h-4 text-[#C87D55] dark:text-[#E09D77]" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleSelectSample = (profile: StudentProfile) => {
    setPresetsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectPreset) {
      onSelectPreset(profile);
    } else if (onOpenPresets) {
      onOpenPresets();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D9] bg-[#FDFBF7]/90 backdrop-blur-md dark:border-[#383531] dark:bg-[#1C1B19]/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            id="brand-home-btn"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A6550] to-[#2E4233] dark:from-[#5C7F64] dark:to-[#374E3C] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-lg font-bold tracking-tight text-[#2B2824] dark:text-[#F3EFE6] block leading-none">
                PathPilot <span className="text-[#4A6550] dark:text-[#7D9D85]">AI</span>
              </span>
              <span className="text-[11px] font-medium text-[#736E65] dark:text-[#A39E93] block mt-0.5 tracking-wide">
                Student Career Advisor
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F5F1E9]/80 dark:bg-[#282623]/80 p-1 rounded-xl border border-[#E8E2D9] dark:border-[#383531]">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-link-${item.tab}`}
                disabled={item.disabled}
                onClick={() => handleNavClick(item.tab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFFFFF] dark:bg-[#3D3A35] text-[#2B2824] dark:text-[#F7F5F0] shadow-xs'
                    : item.disabled
                    ? 'text-[#A8A299] dark:text-[#615C54] cursor-not-allowed opacity-60'
                    : 'text-[#5C574F] dark:text-[#D5D0C7] hover:text-[#2B2824] dark:hover:text-white hover:bg-[#EAE4D8]/50 dark:hover:bg-[#33302C]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#C87D55] text-white text-[10px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Preset selector & Theme switch) */}
        <div className="flex items-center gap-2">
          {/* Sample Profiles Dropdown */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              id="preset-explorer-btn"
              onClick={() => setPresetsDropdownOpen(!presetsDropdownOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#4A6550]/30 bg-[#EBF2ED] text-[#2D4534] hover:bg-[#DDE9E0] dark:border-[#7D9D85]/30 dark:bg-[#202E24] dark:text-[#B5D6BE] dark:hover:bg-[#283B2E] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4A6550] dark:text-[#7D9D85]" />
              <span>Sample Profiles</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${presetsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {presetsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#262422] rounded-xl shadow-lg border border-[#E8E2D9] dark:border-[#383531] p-2 z-50">
                <p className="text-[11px] font-bold text-[#736E65] dark:text-[#A39E93] px-2 py-1 uppercase tracking-wider">
                  Select a Student Persona
                </p>
                <div className="space-y-1">
                  {PRESET_STUDENT_PROFILES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectSample(preset.profile)}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#F7F4EE] dark:hover:bg-[#33302C] transition-colors flex flex-col cursor-pointer"
                    >
                      <span className="text-xs font-semibold text-[#3D3A35] dark:text-[#EFECE6]">
                        {preset.title}
                      </span>
                      <span className="text-[11px] text-[#736E65] dark:text-[#A39E93] line-clamp-1">
                        {preset.badge} • {preset.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            id="theme-toggle-btn"
            onClick={handleToggleDarkMode}
            className="p-2 rounded-lg text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#EFEAE1] dark:hover:bg-[#2F2C29] transition-colors border border-[#E8E2D9] dark:border-[#383531] cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#E6A04B]" /> : <Moon className="w-4 h-4 text-[#4A6550]" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg md:hidden text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#EFEAE1] dark:hover:bg-[#2F2C29] border border-[#E8E2D9] dark:border-[#383531] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] dark:border-[#383531] bg-[#FDFBF7] dark:bg-[#1C1B19] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.tab}
              id={`mobile-nav-${item.tab}`}
              disabled={item.disabled}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === item.tab
                  ? 'bg-[#EAE4D8] dark:bg-[#3D3A35] text-[#2B2824] dark:text-white'
                  : item.disabled
                  ? 'text-[#A8A299] dark:text-[#615C54] cursor-not-allowed opacity-50'
                  : 'text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#F3EFE6] dark:hover:bg-[#2B2825]'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C87D55] text-white text-xs flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#383531] space-y-1">
            <p className="text-[11px] font-bold text-[#736E65] dark:text-[#A39E93] px-2 uppercase tracking-wider">
              Try Sample Student Profiles
            </p>
            {PRESET_STUDENT_PROFILES.map((preset) => (
              <button
                key={preset.id}
                id={`mobile-preset-${preset.id}`}
                onClick={() => handleSelectSample(preset.profile)}
                className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] border border-[#4A6550]/30 cursor-pointer"
              >
                {preset.title} ({preset.badge})
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};