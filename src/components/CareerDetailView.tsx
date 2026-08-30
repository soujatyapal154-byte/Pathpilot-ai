import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Map, 
  MessageSquareHeart, 
  Bookmark, 
  BookmarkCheck, 
  Code, 
  BookOpen, 
  GraduationCap, 
  Hammer, 
  Sun, 
  Clock, 
  DollarSign, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { CareerRecommendation } from '../types';

interface CareerDetailViewProps {
  career: CareerRecommendation;
  onBack: () => void;
  onOpenRoadmap: (career: CareerRecommendation) => void;
  onOpenMentor: (career: CareerRecommendation) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const CareerDetailView: React.FC<CareerDetailViewProps> = ({
  career,
  onBack,
  onOpenRoadmap,
  onOpenMentor,
  isSaved,
  onToggleSave,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          id="career-detail-back-btn"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-[#736E65] dark:text-[#A39E93] hover:text-[#3D3A35] dark:hover:text-[#FDFBF7] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Recommendations</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="career-detail-save-btn"
            onClick={onToggleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#FAF0EB] dark:bg-[#2E201B] border-[#C87D55] text-[#C87D55]'
                : 'border-[#DFD7CB] dark:border-[#383531] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29] text-[#5C574F] dark:text-[#D5D0C7]'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#C87D55]" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Saved to Profile' : 'Save Pathway'}</span>
          </button>

          <button
            id="career-detail-open-roadmap-btn"
            onClick={() => onOpenRoadmap(career)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#3A5341] hover:bg-[#2D4233] text-[#FDFBF7] text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>Interactive Roadmap</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] text-xs font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#4A6550]" />
                <span>{career.matchScore}% Interest Match (Exploratory Suggestion)</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] text-[#736E65] dark:text-[#A39E93] text-xs font-medium">
                {career.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              {career.name}
            </h1>
            <p className="text-sm text-[#736E65] dark:text-[#A39E93] mt-2 max-w-2xl leading-relaxed italic">
              {career.tagline}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              id="career-detail-mentor-chat-btn"
              onClick={() => onOpenMentor(career)}
              className="px-5 py-3 rounded-2xl bg-[#B88448] hover:bg-[#9E6E37] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Ask AI Mentor About {career.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* Why it matches breakdown */}
        <div className="mt-8 p-5 rounded-2xl bg-[#EBF2ED] dark:bg-[#202E24] border border-[#4A6550]/30">
          <h3 className="text-xs font-bold text-[#2D4534] dark:text-[#B5D6BE] uppercase tracking-wider mb-2">
            Why This Matches You:
          </h3>
          <p className="text-xs sm:text-sm text-[#3D3A35] dark:text-[#EFECE6] leading-relaxed mb-4">
            {career.whyItMatches}
          </p>

          {career.matchReasons && career.matchReasons.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#4A6550]/20">
              {career.matchReasons.map((m) => (
                <div key={m.factor} className="text-xs">
                  <div className="font-bold text-[#2D4534] dark:text-[#B5D6BE]">{m.factor}</div>
                  <div className="text-[#5C574F] dark:text-[#C5C0B6] text-[11px] mt-0.5">{m.studentConnection}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid: Important Skills & Recommended Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Important Skills */}
        <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-[#B88448]" />
            <h3 className="text-lg font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              Essential & High-Value Skills
            </h3>
          </div>
          <p className="text-xs text-[#736E65] dark:text-[#A39E93] mb-4">
            A balanced combination of technical capabilities and human strengths:
          </p>

          <div className="space-y-3">
            {career.importantSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-[#3D3A35] dark:text-[#EFECE6]">
                    {skill.name}
                  </div>
                  {skill.description && (
                    <div className="text-[11px] text-[#736E65] dark:text-[#A39E93] mt-0.5">{skill.description}</div>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${
                    skill.importance === 'essential'
                      ? 'bg-[#F5EAD9] dark:bg-[#382D1D] text-[#8C5D1F] dark:text-[#E5B978]'
                      : 'bg-[#E8E2D9] dark:bg-[#383531] text-[#5C574F] dark:text-[#C5C0B6]'
                  }`}
                >
                  {skill.importance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended School Subjects */}
        <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#516F7D]" />
            <h3 className="text-lg font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              Recommended School Subjects
            </h3>
          </div>
          <p className="text-xs text-[#736E65] dark:text-[#A39E93] mb-4">
            Coursework and electives to prioritize during upcoming academic semesters:
          </p>

          <div className="space-y-3">
            {career.recommendedSubjects.map((sub) => (
              <div
                key={sub.subject}
                className="p-3 rounded-xl bg-[#EBF1F5] dark:bg-[#1E2B33] border border-[#BACED9] dark:border-[#2C414E]"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="text-xs font-bold text-[#2C4B5E] dark:text-[#9EC4D7]">
                    {sub.subject}
                  </div>
                  <span className="text-[10px] font-semibold text-[#2C4B5E] dark:text-[#9EC4D7] bg-[#D7E5ED] dark:bg-[#2A3F4C] px-2 py-0.5 rounded-full">
                    {sub.relevanceLevel} Priority
                  </span>
                </div>
                <p className="text-xs text-[#5C574F] dark:text-[#C5C0B6] leading-relaxed">
                  {sub.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Possible Education Paths Comparison */}
      <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#4A6550]" />
            <h3 className="text-lg sm:text-xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              Possible Education Pathways
            </h3>
          </div>
          <span className="text-xs text-[#8C867A]">There is no single "right" way!</span>
        </div>
        <p className="text-xs sm:text-sm text-[#736E65] dark:text-[#A39E93] mb-6">
          Compare the trade-offs between 4-year universities, 2-year community colleges, bootcamps, and apprenticeships for this career.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {career.possibleEducationPaths.map((path) => (
            <div
              key={path.title}
              className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#2D4534] dark:text-[#B5D6BE] bg-[#EBF2ED] dark:bg-[#202E24] px-2 py-0.5 rounded-md">
                    {path.pathType}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#736E65] font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{path.duration}</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#3D3A35] dark:text-[#FDFBF7] mb-2">
                  {path.title}
                </h4>
                <p className="text-xs text-[#5C574F] dark:text-[#C5C0B6] leading-relaxed mb-4">
                  {path.description}
                </p>

                <div className="space-y-3 text-[11px]">
                  <div>
                    <span className="font-bold text-[#2D4534] dark:text-[#B5D6BE]">Advantages:</span>
                    <ul className="list-disc list-inside text-[#5C574F] dark:text-[#C5C0B6] mt-1 space-y-0.5">
                      {path.pros.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#8C5D1F] dark:text-[#E5B978]">Considerations:</span>
                    <ul className="list-disc list-inside text-[#5C574F] dark:text-[#C5C0B6] mt-1 space-y-0.5">
                      {path.considerations.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D9] dark:border-[#383531] flex items-center justify-between text-xs text-[#736E65]">
                <span>Estimated Cost Level:</span>
                <span className="font-bold text-[#3D3A35] dark:text-[#EFECE6]">{path.costLevel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beginner Projects Sandbox */}
      <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Hammer className="w-5 h-5 text-[#B88448]" />
          <h3 className="text-lg sm:text-xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
            Beginner Weekend Projects
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#736E65] dark:text-[#A39E93] mb-6">
          The best way to know if you'll love this career is to build something small. Here is a guided, zero-cost project you can start right away:
        </p>

        <div className="space-y-6">
          {career.beginnerProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="text-base font-bold text-[#3D3A35] dark:text-[#FDFBF7] font-display">
                  {proj.title}
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] font-semibold">
                    {proj.difficulty}
                  </span>
                  <span className="text-[#736E65] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proj.estimatedHours}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5C574F] dark:text-[#D5D0C7] leading-relaxed mb-4">
                {proj.summary}
              </p>

              {/* Tools & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 p-4 rounded-xl bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] text-xs">
                <div>
                  <span className="font-bold text-[#3D3A35] dark:text-[#EFECE6] block mb-1">
                    Tools You Need (Free):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.toolsNeeded.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[#3D3A35] dark:text-[#EFECE6] block mb-1">
                    What You'll Finish With:
                  </span>
                  <ul className="list-disc list-inside text-[#5C574F] dark:text-[#C5C0B6] space-y-0.5 text-[11px]">
                    {proj.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-step instructions */}
              <div>
                <span className="text-xs font-bold text-[#3D3A35] dark:text-[#EFECE6] block mb-2">
                  Step-by-Step Action Plan:
                </span>
                <div className="space-y-2">
                  {proj.stepByStepGuide.map((stepText, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5C574F] dark:text-[#D5D0C7]">
                      <span className="w-5 h-5 rounded-full bg-[#3A5341] text-[#FDFBF7] font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="leading-snug pt-0.5">{stepText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* A Day in the Life & Growth Outlook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-5 h-5 text-[#B88448]" />
            <h3 className="text-base font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              A Day in the Life
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5C574F] dark:text-[#D5D0C7] leading-relaxed">
            {career.dayInTheLife}
          </p>
        </div>

        <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#4A6550]" />
            <h3 className="text-base font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              Industry Growth & Evolution
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5C574F] dark:text-[#D5D0C7] leading-relaxed">
            {career.growthOutlook}
          </p>
        </div>
      </div>

      {/* Counselor Discussion Points */}
      <div className="p-6 rounded-3xl bg-[#EBF2ED] dark:bg-[#202E24] border border-[#4A6550]/30 text-[#3D3A35] dark:text-[#EFECE6]">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#4A6550] shrink-0 mt-0.5" />
          <div className="w-full">
            <h3 className="text-base font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
              Questions to Bring to Your School Counselor or Parents
            </h3>
            <p className="text-xs text-[#736E65] dark:text-[#A39E93] mt-1 mb-3">
              Print or screenshot these questions for your next academic planning meeting:
            </p>
            <ul className="space-y-2">
              {career.discussionPointsForCounselor.map((q, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs font-medium text-[#2D4534] dark:text-[#D5EAD9]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#4A6550] shrink-0 mt-0.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Floating CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531]">
        <div>
          <h4 className="text-xs font-bold text-[#3D3A35] dark:text-[#FDFBF7]">
            Ready to chart your step-by-step progress?
          </h4>
          <p className="text-[11px] text-[#736E65] dark:text-[#A39E93]">
            Explore the visual 6-stage roadmap from Foundation to Career.
          </p>
        </div>
        <button
          id="career-detail-bottom-roadmap-btn"
          onClick={() => onOpenRoadmap(career)}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#3A5341] hover:bg-[#2D4233] text-[#FDFBF7] text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>View 6-Stage Roadmap</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
