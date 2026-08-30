import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { QuestionnaireView } from './components/QuestionnaireView';
import { RecommendationsView } from './components/RecommendationsView';
import { CareerDetailView } from './components/CareerDetailView';
import { RoadmapView } from './components/RoadmapView';
import { MentorChatView } from './components/MentorChatView';
import { AnalysisLoadingView } from './components/AnalysisLoadingView';
import { StudentProfile, CareerAnalysisResult, CareerRecommendation, ActiveTab } from './types';
import { PRESET_STUDENT_PROFILES } from './data/presets';
import { generateFallbackAnalysis } from './data/fallbackGenerator';

export const App: React.FC = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Current active view
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');

  // Student profile state
  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Career analysis results
  const [analysis, setAnalysis] = useState<CareerAnalysisResult | null>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_analysis');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Selected Career for Detail or Roadmap view
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_selected_career');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Saved careers list (bookmarked IDs)
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_saved_careers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Completed roadmap step IDs
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_completed_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Loading analysis state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Sync theme with HTML root class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pathpilot_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pathpilot_theme', 'light');
    }
  }, [darkMode]);

  // Save profile to localStorage
  useEffect(() => {
    if (profile) {
      localStorage.setItem('pathpilot_profile', JSON.stringify(profile));
    }
  }, [profile]);

  // Save analysis to localStorage
  useEffect(() => {
    if (analysis) {
      localStorage.setItem('pathpilot_analysis', JSON.stringify(analysis));
    }
  }, [analysis]);

  // Save selected career to localStorage
  useEffect(() => {
    if (selectedCareer) {
      localStorage.setItem('pathpilot_selected_career', JSON.stringify(selectedCareer));
    }
  }, [selectedCareer]);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem('pathpilot_saved_careers', JSON.stringify(savedCareerIds));
  }, [savedCareerIds]);

  // Save completed steps
  useEffect(() => {
    localStorage.setItem('pathpilot_completed_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const handleToggleTheme = () => setDarkMode(!darkMode);

  // Handle career analysis generation (calls backend or fallback)
  const handleGenerateRecommendations = async (studentProfile: StudentProfile) => {
    setProfile(studentProfile);
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: studentProfile }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setAnalysis(result.data);
        if (result.data.topCareers && result.data.topCareers.length > 0) {
          setSelectedCareer(result.data.topCareers[0]);
        }
        setActiveTab('recommendations');
      } else {
        throw new Error(result.error || 'Unable to parse career results');
      }
    } catch (err) {
      console.warn('API error or network delay, switching seamlessly to built-in generator:', err);
      // Seamlessly generate comprehensive high-quality fallback analysis
      const fallback = generateFallbackAnalysis(studentProfile);
      setAnalysis(fallback);
      if (fallback.topCareers.length > 0) {
        setSelectedCareer(fallback.topCareers[0]);
      }
      setActiveTab('recommendations');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectCareer = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    setActiveTab('career-detail');
  };

  const handleViewRoadmap = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    setActiveTab('roadmap');
  };

  const handleToggleSaveCareer = (careerId: string) => {
    setSavedCareerIds((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  };

  const handleToggleCompleteStep = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleSelectPreset = (presetProfile: StudentProfile) => {
    setProfile(presetProfile);
    handleGenerateRecommendations(presetProfile);
  };

  const handleReset = () => {
    setProfile(null);
    setAnalysis(null);
    setSelectedCareer(null);
    setSavedCareerIds([]);
    setCompletedSteps([]);
    localStorage.removeItem('pathpilot_profile');
    localStorage.removeItem('pathpilot_analysis');
    localStorage.removeItem('pathpilot_selected_career');
    localStorage.removeItem('pathpilot_saved_careers');
    localStorage.removeItem('pathpilot_completed_steps');
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#161514] text-[#2B2824] dark:text-[#F3EFE6] font-sans antialiased transition-colors selection:bg-[#4A6550]/20 selection:text-[#2D4534] dark:selection:bg-[#7D9D85]/30 dark:selection:text-[#B5D6BE]">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAnalysis={!!analysis}
        onSelectPreset={handleSelectPreset}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        setDarkMode={setDarkMode}
        savedCount={savedCareerIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {isAnalyzing ? (
          <AnalysisLoadingView profile={profile} />
        ) : (
          <>
            {activeTab === 'landing' && (
              <LandingView
                onStartQuiz={() => setActiveTab('quiz')}
                onSelectPreset={handleSelectPreset}
                hasExistingAnalysis={!!analysis}
                onViewResults={() => setActiveTab('recommendations')}
              />
            )}

            {activeTab === 'quiz' && (
              <QuestionnaireView
                initialProfile={profile}
                onSubmit={handleGenerateRecommendations}
                onSelectPreset={handleSelectPreset}
                isLoading={isAnalyzing}
              />
            )}

            {activeTab === 'recommendations' && analysis && (
              <RecommendationsView
                analysis={analysis}
                profile={profile}
                onSelectCareer={handleSelectCareer}
                onViewRoadmap={handleViewRoadmap}
                savedCareerIds={savedCareerIds}
                onToggleSave={handleToggleSaveCareer}
                onRetakeQuiz={() => setActiveTab('quiz')}
              />
            )}

            {activeTab === 'career-detail' && selectedCareer && (
              <CareerDetailView
                career={selectedCareer}
                onBack={() => setActiveTab('recommendations')}
                onViewRoadmap={() => setActiveTab('roadmap')}
                onChatMentor={() => setActiveTab('mentor')}
                isSaved={savedCareerIds.includes(selectedCareer.id)}
                onToggleSave={() => handleToggleSaveCareer(selectedCareer.id)}
              />
            )}

            {activeTab === 'roadmap' && selectedCareer && (
              <RoadmapView
                career={selectedCareer}
                profile={profile}
                completedSteps={completedSteps}
                onToggleCompleteStep={handleToggleCompleteStep}
                onBack={() => setActiveTab('career-detail')}
                onChatMentor={() => setActiveTab('mentor')}
              />
            )}

            {activeTab === 'mentor' && (
              <MentorChatView
                profile={profile}
                selectedCareer={selectedCareer}
                allCareers={analysis?.topCareers || []}
                onSelectCareer={(career) => {
                  setSelectedCareer(career);
                }}
              />
            )}

            {/* Fallback if navigated to an analysis view with no analysis loaded */}
            {(activeTab === 'recommendations' || activeTab === 'career-detail' || activeTab === 'roadmap') && !analysis && (
              <div className="max-w-2xl mx-auto my-20 p-8 text-center bg-white dark:bg-[#201E1C] rounded-2xl border border-[#E8E2D9] dark:border-[#383531] shadow-xs">
                <h3 className="text-xl font-bold mb-2">No Profile Quiz Completed Yet</h3>
                <p className="text-sm text-[#736E65] dark:text-[#A39E93] mb-6">
                  Complete the quick 4-step questionnaire or try a sample student profile to unlock personalized career paths and step-by-step roadmaps.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-5 py-2.5 bg-[#4A6550] text-white rounded-xl text-sm font-semibold hover:bg-[#3B5240] transition-colors cursor-pointer"
                  >
                    Start Profile Quiz
                  </button>
                  <button
                    onClick={() =>
                      handleSelectPreset(
                        PRESET_STUDENT_PROFILES[0].profile as any
                      )
                    }
                    className="px-5 py-2.5 bg-[#F0EBE1] dark:bg-[#33302C] text-[#3D3A35] dark:text-[#EFECE6] rounded-xl text-sm font-semibold hover:bg-[#E5DEC4] transition-colors cursor-pointer"
                  >
                    Load Sample Persona
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Global Compact Footer */}
      <footer className="w-full border-t border-[#E8E2D9] dark:border-[#383531] bg-[#F7F4EE] dark:bg-[#1A1918] py-6 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736E65] dark:text-[#A39E93]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#3D3A35] dark:text-[#EAE6DF]">PathPilot AI</span>
            <span>•</span>
            <span>Empowering students with personalized educational pathways</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('mentor')}
              className="hover:text-[#4A6550] dark:hover:text-[#7D9D85] transition-colors cursor-pointer"
            >
              Ask AI Mentor
            </button>
            <span>•</span>
            <button
              onClick={handleReset}
              className="hover:text-[#B34040] dark:hover:text-[#E57373] transition-colors cursor-pointer"
            >
              Reset Session
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
