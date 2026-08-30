import React, { useEffect, useState } from 'react';
import { Sparkles, Compass, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  { label: 'Synthesizing your favorite subjects & strengths...', icon: BookOpen },
  { label: 'Connecting academic interests to emerging career fields...', icon: Compass },
  { label: 'Constructing personalized 6-stage visual roadmaps...', icon: Layers },
  { label: 'Formulating beginner projects & counselor discussion points...', icon: Sparkles }
];

const INSPIRATIONAL_QUOTES = [
  "“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt",
  "“You don’t have to see the whole staircase, just take the first step.” — Martin Luther King Jr.",
  "“The expert in anything was once a beginner.” — Helen Hayes",
  "“Curiosity is the engine of achievement.” — Sir Ken Robinson"
];

export const AnalysisLoadingView: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      {/* Animated Glowing Orb */}
      <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#4A6550]/20 blur-xl animate-pulse" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#3A5341] to-[#7D9D85] flex items-center justify-center text-[#FDFBF7] shadow-lg shadow-[#3A5341]/30 animate-bounce">
          <Sparkles className="w-10 h-10" />
        </div>
      </div>

      <h2 className="text-2xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7] mb-2">
        Crafting Your Personalized Pathways
      </h2>
      <p className="text-xs sm:text-sm text-[#736E65] dark:text-[#A39E93] mb-8 max-w-md mx-auto">
        Our AI advisor is evaluating your unique profile, favorite subjects, and learning style.
      </p>

      {/* Progressive Step Checklist */}
      <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-2xl p-6 text-left shadow-xs mb-8 space-y-4">
        {ANALYSIS_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 transition-opacity ${
                idx > currentStepIndex ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isDone
                    ? 'bg-[#3A5341] text-[#FDFBF7]'
                    : isCurrent
                    ? 'bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] animate-spin'
                    : 'bg-[#FAF8F5] dark:bg-[#1F1D1B] text-[#8C867A]'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <StepIcon className="w-3.5 h-3.5" />}
              </div>
              <span
                className={`text-xs font-medium ${
                  isCurrent
                    ? 'text-[#2D4534] dark:text-[#B5D6BE] font-semibold'
                    : 'text-[#5C574F] dark:text-[#D5D0C7]'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rotating Encouraging Quote */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] text-xs italic text-[#736E65] dark:text-[#A39E93] min-h-[50px] flex items-center justify-center">
        <span>{INSPIRATIONAL_QUOTES[quoteIndex]}</span>
      </div>
    </div>
  );
};
