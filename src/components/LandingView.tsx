import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Map, 
  Code, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { PRESET_STUDENT_PROFILES } from '../data/presets';
import { StudentProfile } from '../types';

interface LandingViewProps {
  onStartQuiz: () => void;
  onSelectPreset: (profile: StudentProfile) => void;
  onOpenMentor: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartQuiz,
  onSelectPreset,
  onOpenMentor,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 text-center max-w-4xl mx-auto px-4">
        {/* Subtle Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2ED] dark:bg-[#202E24] border border-[#D2E2D6] dark:border-[#2C4032] text-[#2D4534] dark:text-[#B5D6BE] text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#4A6550] dark:text-[#7D9D85]" />
          <span>Personalized Career & Education Exploration for Students</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3D3A35] dark:text-[#FDFBF7] font-display leading-[1.15]">
          Find your direction.{' '}
          <span className="bg-gradient-to-r from-[#3A5341] via-[#4A6550] to-[#7D9D85] bg-clip-text text-transparent">
            Build your future.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-[#736E65] dark:text-[#B8B2A7] max-w-2xl mx-auto leading-relaxed">
          PathPilot AI connects your favorite school subjects, natural strengths, and creative interests to meaningful career paths, actionable learning roadmaps, and hands-on beginner projects.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="hero-start-questionnaire-btn"
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#3A5341] hover:bg-[#2D4233] text-[#FDFBF7] font-semibold text-sm shadow-md shadow-[#3A5341]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Take Student Profile Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-ai-mentor-btn"
            onClick={onOpenMentor}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-[#262422] border border-[#DFD7CB] dark:border-[#383531] text-[#3D3A35] dark:text-[#EFECE6] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29] font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4 text-[#C87D55]" />
            <span>Chat with AI Career Mentor</span>
          </button>
        </div>

        {/* Safe Exploration Notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#736E65] dark:text-[#A39E93]">
          <ShieldCheck className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85]" />
          <span>Exploratory & educational • No personal data sold • Counselor-aligned</span>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
            How PathPilot Guides Your Journey
          </h2>
          <p className="mt-2 text-sm text-[#736E65] dark:text-[#A39E93]">
            A student-centered framework turning abstract interests into tangible next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] shadow-xs hover:border-[#7D9D85] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#EBF2ED] dark:bg-[#202E24] text-[#3A5341] dark:text-[#A3C6AB] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
              1. Personalized Analysis
            </h3>
            <p className="mt-2 text-xs text-[#736E65] dark:text-[#A39E93] leading-relaxed">
              We look at your favorite subjects, things you enjoy, and activities you dislike to generate 3-5 high-match career possibilities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] shadow-xs hover:border-[#516F7D] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#EBF1F5] dark:bg-[#1E2B33] text-[#3E5C6E] dark:text-[#9EC4D7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
              2. 6-Stage Visual Roadmap
            </h3>
            <p className="mt-2 text-xs text-[#736E65] dark:text-[#A39E93] leading-relaxed">
              Follow a clear path: Foundation → Skills → Projects → Education → Experience → Career with actionable milestones.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] shadow-xs hover:border-[#C87D55] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#FAF0EB] dark:bg-[#2E201B] text-[#A36B4F] dark:text-[#E2A98F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
              3. Weekend Beginner Projects
            </h3>
            <p className="mt-2 text-xs text-[#736E65] dark:text-[#A39E93] leading-relaxed">
              Build zero-cost prototypes and tangible deliverables you can start right away to test if you truly enjoy the day-to-day work.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] shadow-xs hover:border-[#B88448] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#F5F0E8] dark:bg-[#2B251B] text-[#8C6B38] dark:text-[#D9B87D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
              4. AI Career Mentor
            </h3>
            <p className="mt-2 text-xs text-[#736E65] dark:text-[#A39E93] leading-relaxed">
              Ask questions anytime about degrees vs bootcamps, school subjects, talking with parents, and finding internships.
            </p>
          </div>
        </div>
      </section>

      {/* Try with Sample Student Profiles Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-b from-[#F7F4EE] to-[#EFEAE1]/70 dark:from-[#262422] dark:to-[#1F1D1B] border border-[#DFD7CB] dark:border-[#383531] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3A5341] dark:text-[#7D9D85] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Explorer</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
                Explore with Pre-built Student Archetypes
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#736E65] dark:text-[#A39E93] max-w-xl">
                Want to see PathPilot in action right now? Choose a sample student profile to generate recommendations instantly.
              </p>
            </div>
            <button
              id="landing-custom-quiz-btn"
              onClick={onStartQuiz}
              className="text-xs font-bold text-[#3A5341] dark:text-[#7D9D85] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Or fill out your own profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRESET_STUDENT_PROFILES.map((preset) => (
              <div
                key={preset.id}
                id={`preset-card-${preset.id}`}
                className="bg-white dark:bg-[#1C1B19] p-5 rounded-2xl border border-[#E8E2D9] dark:border-[#383531] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4A6550] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] border border-[#D2E2D6] dark:border-[#2C4032]">
                      {preset.badge}
                    </span>
                    <span className="text-[11px] text-[#8C867A] dark:text-[#736E65]">
                      {preset.profile.educationLevel.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#3D3A35] dark:text-[#EFECE6] mb-2 font-display">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-[#736E65] dark:text-[#A39E93] leading-relaxed mb-4">
                    {preset.description}
                  </p>

                  <div className="space-y-1.5 mb-5 text-[11px]">
                    <div className="flex items-center gap-1.5 text-[#736E65] dark:text-[#A39E93]">
                      <BookOpen className="w-3.5 h-3.5 text-[#4A6550] dark:text-[#7D9D85]" />
                      <span>Fav Subjects: {preset.profile.favoriteSubjects.slice(0, 2).join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#736E65] dark:text-[#A39E93]">
                      <GraduationCap className="w-3.5 h-3.5 text-[#516F7D] dark:text-[#88A6B5]" />
                      <span>Curious about: {preset.profile.curiousCareers.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>

                <button
                  id={`launch-preset-${preset.id}-btn`}
                  onClick={() => onSelectPreset(preset.profile)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#3D3A35] hover:bg-[#292723] dark:bg-[#EFEAE1] dark:hover:bg-white text-white dark:text-[#3D3A35] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Analyze This Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counselor & Parent Collaboration Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#EBF2ED]/80 dark:bg-[#202E24]/60 border border-[#D2E2D6] dark:border-[#2C4032] text-[#3D3A35] dark:text-[#EFECE6]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3A5341] text-[#FDFBF7] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
                A Partner for School Counselors & Parents
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#736E65] dark:text-[#A39E93] leading-relaxed">
                PathPilot AI is designed to start constructive conversations, not replace human mentorship. Each career recommendation includes tailored discussion points you can print or bring to your next meeting with your guidance counselor or family.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[#2D4534] dark:text-[#B5D6BE]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85]" />
                  <span>Aligned with high school course planning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85]" />
                  <span>Explores 4 distinct higher-education paths</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
