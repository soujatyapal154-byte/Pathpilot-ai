import React, { useState, useEffect } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { QuestionnaireView } from './components/QuestionnaireView';
import { AnalysisLoadingView } from './components/AnalysisLoadingView';
import { RecommendationsView } from './components/RecommendationsView';
import { CareerDetailView } from './components/CareerDetailView';
import { RoadmapView } from './components/RoadmapView';
import { MentorChatView } from './components/MentorChatView';
import { StudentProfile, AnalysisResponse, CareerRecommendation } from './types';
import { PRESET_STUDENT_PROFILES } from './data/presets';
import { generateFallbackAnalysis } from './data/fallbackGenerator';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pathpilot_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState<
    'landing' | 'quiz' | 'recommendations' | 'career-detail' | 'roadmap' | 'mentor'
  >('landing');

  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_analysis');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_selected_career');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedCareerIds, setSavedCareerIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_saved_careers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedStepIds, setCompletedStepIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pathpilot_completed_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  const [mentorContextTopic, setMentorContextTopic] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync Dark Mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pathpilot_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pathpilot_theme', 'light');
    }
  }, [darkMode]);

  // Persist State
  useEffect(() => {
    if (studentProfile) {
      localStorage.setItem('pathpilot_profile', JSON.stringify(studentProfile));
    }
  }, [studentProfile]);

  useEffect(() => {
    if (analysis) {
      localStorage.setItem('pathpilot_analysis', JSON.stringify(analysis));
    }
  }, [analysis]);

  useEffect(() => {
    if (selectedCareer) {
      localStorage.setItem('pathpilot_selected_career', JSON.stringify(selectedCareer));
    }
  }, [selectedCareer]);

  useEffect(() => {
    localStorage.setItem('pathpilot_saved_careers', JSON.stringify(savedCareerIds));
  }, [savedCareerIds]);

  useEffect(() => {
    localStorage.setItem('pathpilot_completed_steps', JSON.stringify(completedStepIds));
  }, [completedStepIds]);

  // Actions
  const handleToggleTheme = () => setDarkMode(!darkMode);

  const handleToggleSaveCareer = (careerId: string) => {
    setSavedCareerIds((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  };

  const handleToggleStepCompleted = (stepId: string) => {
    setCompletedStepIds((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleAnalyzeProfile = async (profile: StudentProfile) => {
    setStudentProfile(profile);
    setLoadingAnalysis(true);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (!res.ok) {
        throw new Error('Analysis server request failed');
      }

      const data: AnalysisResponse = await res.json();
      setAnalysis(data);
      if (data.careerRecommendations && data.careerRecommendations.length > 0) {
        setSelectedCareer(data.careerRecommendations[0]);
      }
      setActiveTab('recommendations');
    } catch (err) {
      console.warn('Backend call failed, using high-fidelity local synthesis:', err);
      const fallback = generateFallbackAnalysis(profile);
      setAnalysis(fallback);
      if (fallback.careerRecommendations.length > 0) {
        setSelectedCareer(fallback.careerRecommendations[0]);
      }
      setActiveTab('recommendations');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleSelectPreset = (presetProfile: StudentProfile) => {
    handleAnalyzeProfile(presetProfile);
  };

  const handleOpenCareerDetail = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    setActiveTab('career-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRoadmap = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMentor = (career?: CareerRecommendation, contextTopic?: string) => {
    if (career) {
      setSelectedCareer(career);
    }
    setMentorContextTopic(contextTopic);
    setActiveTab('mentor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] flex flex-col font-sans transition-colors duration-200 selection:bg-[#4A6550] selection:text-white">
      {/* Top Educational Guidance Safety Banner */}
      <DisclaimerBanner />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasAnalysis={!!analysis}
        onSelectPreset={handleSelectPreset}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {loadingAnalysis ? (
          <AnalysisLoadingView />
        ) : (
          <>
            {activeTab === 'landing' && (
              <LandingView
                onStartQuiz={() => setActiveTab('quiz')}
                onSelectPreset={handleSelectPreset}
                onOpenMentor={() => handleOpenMentor()}
              />
            )}

            {activeTab === 'quiz' && (
              <QuestionnaireView
                initialProfile={studentProfile || undefined}
                onSubmit={handleAnalyzeProfile}
                onCancel={() => setActiveTab(analysis ? 'recommendations' : 'landing')}
                onSelectPreset={handleSelectPreset}
              />
            )}

            {activeTab === 'recommendations' && analysis && (
              <RecommendationsView
                analysis={analysis}
                onSelectCareer={handleOpenCareerDetail}
                onOpenRoadmap={handleOpenRoadmap}
                onOpenMentor={handleOpenMentor}
                onRetakeQuiz={() => setActiveTab('quiz')}
                savedCareerIds={savedCareerIds}
                onToggleSaveCareer={handleToggleSaveCareer}
              />
            )}

            {activeTab === 'career-detail' && selectedCareer && (
              <CareerDetailView
                career={selectedCareer}
                onBack={() => setActiveTab('recommendations')}
                onOpenRoadmap={handleOpenRoadmap}
                onOpenMentor={handleOpenMentor}
                isSaved={savedCareerIds.includes(selectedCareer.id)}
                onToggleSave={() => handleToggleSaveCareer(selectedCareer.id)}
              />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapView
                career={
                  selectedCareer ||
                  analysis?.careerRecommendations[0] ||
                  PRESET_STUDENT_PROFILES[0].profile as any
                }
                allCareers={analysis?.careerRecommendations || []}
                onSelectCareer={(c) => setSelectedCareer(c)}
                onOpenMentor={handleOpenMentor}
                completedStepIds={completedStepIds}
                onToggleStepCompleted={handleToggleStepCompleted}
              />
            )}

            {activeTab === 'mentor' && (
              <MentorChatView
                studentProfile={studentProfile || undefined}
                activeCareer={selectedCareer || undefined}
                initialContextTopic={mentorContextTopic}
                onClearContext={() => setSelectedCareer(null)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E2D9] dark:border-[#383531] bg-[#F7F4EE]/90 dark:bg-[#262422]/90 py-8 px-4 text-center text-xs text-[#736E65] dark:text-[#A39E93] print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-semibold text-[#3D3A35] dark:text-[#EFECE6]">
            <span>PathPilot AI</span>
            <span>•</span>
            <span className="font-normal text-[#736E65] dark:text-[#A39E93]">Educational Guidance & Exploration Platform</span>
          </div>
          <p className="text-[11px] max-w-md">
            Remember: AI career advice offers exploratory ideas, not fixed outcomes. Always consult your school counselors, educators, and family when planning academic futures.
          </p>
        </div>
      </footer>
    </div>
  );
}
