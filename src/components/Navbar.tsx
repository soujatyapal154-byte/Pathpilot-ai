import React from 'react';
import { Compass, Sparkles, User, Map, MessageSquareHeart, Bookmark, Sun, Moon, GraduationCap, Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  savedCount: number;
  hasAnalysis: boolean;
  onOpenPresets: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  savedCount,
  hasAnalysis,
  onOpenPresets,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode; badge?: number; disabled?: boolean }[] = [
    { tab: 'landing', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { tab: 'questionnaire', label: 'Profile Quiz', icon: <User className="w-4 h-4" /> },
    {
      tab: 'recommendations',
      label: 'Recommendations',
      icon: <Sparkles className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85]" />,
      disabled: !hasAnalysis,
    },
    {
      tab: 'roadmap',
      label: 'Career Roadmap',
      icon: <Map className="w-4 h-4 text-[#516F7D] dark:text-[#88A6B5]" />,
      disabled: !hasAnalysis,
    },
    { tab: 'mentor', label: 'AI Mentor', icon: <MessageSquareHeart className="w-4 h-4 text-[#C87D55] dark:text-[#E09D77]" /> },
    {
      tab: 'saved',
      label: 'Saved Paths',
      icon: <Bookmark className="w-4 h-4 text-[#A36B4F] dark:text-[#D19B82]" />,
      badge: savedCount,
    },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D9] bg-[#FDFBF7]/90 backdrop-blur-md dark:border-[#383531] dark:bg-[#1C1B19]/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="brand-logo-button"
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3A5341] to-[#5C7862] flex items-center justify-center text-[#FDFBF7] shadow-sm shadow-[#3A5341]/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg text-[#3D3A35] dark:text-[#EFECE6] tracking-tight">
                PathPilot<span className="text-[#4A6550] dark:text-[#7D9D85]"> AI</span>
              </span>
            </div>
            <p className="text-[11px] text-[#736E65] dark:text-[#A39E93] leading-none">
              Student Career & Education Advisor
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EFEAE1]/70 dark:bg-[#262422]/70 p-1 rounded-xl border border-[#E8E2D9] dark:border-[#383531]">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-tab-${item.tab}`}
                onClick={() => handleNavClick(item.tab)}
                disabled={item.disabled}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-white dark:bg-[#33302C] text-[#3D3A35] dark:text-[#FDFBF7] shadow-xs'
                    : item.disabled
                    ? 'text-[#A39E93] dark:text-[#5C574F] cursor-not-allowed opacity-60'
                    : 'text-[#736E65] dark:text-[#A39E93] hover:text-[#3D3A35] dark:hover:text-[#FDFBF7] hover:bg-[#E8E2D9]/60 dark:hover:bg-[#383531]/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#C87D55] text-white text-[10px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Preset selector & Theme switch) */}
        <div className="flex items-center gap-2">
          <button
            id="preset-explorer-btn"
            onClick={onOpenPresets}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#4A6550]/30 bg-[#EBF2ED] text-[#2D4534] hover:bg-[#DDE9E0] dark:border-[#7D9D85]/30 dark:bg-[#202E24] dark:text-[#B5D6BE] dark:hover:bg-[#283B2E] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4A6550] dark:text-[#7D9D85]" />
            <span>Sample Profiles</span>
          </button>

          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#EFEAE1] dark:hover:bg-[#2F2C29] transition-colors border border-[#E8E2D9] dark:border-[#383531]"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#D99A4E]" /> : <Moon className="w-4 h-4 text-[#5C574F]" />}
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#EFEAE1] dark:hover:bg-[#2F2C29] border border-[#E8E2D9] dark:border-[#383531]"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] dark:border-[#383531] bg-[#F7F4EE] dark:bg-[#262422] px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              id={`mobile-nav-${item.tab}`}
              onClick={() => handleNavClick(item.tab)}
              disabled={item.disabled}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === item.tab
                  ? 'bg-[#3A5341] text-[#FDFBF7] font-semibold'
                  : item.disabled
                  ? 'text-[#A39E93] dark:text-[#5C574F] opacity-50 cursor-not-allowed'
                  : 'text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#EFEAE1] dark:hover:bg-[#2F2C29]'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#C87D55] text-white text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#383531]">
            <button
              id="mobile-presets-btn"
              onClick={() => {
                onOpenPresets();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] border border-[#4A6550]/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Sample Student Profiles</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
