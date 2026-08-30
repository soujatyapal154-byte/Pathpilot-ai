import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Scale, 
  BookOpen, 
  Code, 
  Layers, 
  MessageSquareHeart, 
  Compass, 
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { AnalysisResponse, CareerRecommendation } from '../types';

interface RecommendationsViewProps {
  analysis: AnalysisResponse;
  onSelectCareer: (career: CareerRecommendation) => void;
  onOpenRoadmap: (career: CareerRecommendation) => void;
  onOpenMentor: (career?: CareerRecommendation) => void;
  onRetakeQuiz: () => void;
  savedCareerIds: string[];
  onToggleSaveCareer: (careerId: string) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  analysis,
  onSelectCareer,
  onOpenRoadmap,
  onOpenMentor,
  onRetakeQuiz,
  savedCareerIds,
  onToggleSaveCareer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [comparingIds, setComparingIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const categories = ['all', ...Array.from(new Set(analysis.careerRecommendations.map((c) => c.category)))];

  const filteredRecommendations = analysis.careerRecommendations.filter((career) => {
    if (selectedCategory === 'all') return true;
    return career.category === selectedCategory;
  });

  const toggleCompare = (id: string) => {
    setComparingIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const comparedCareers = analysis.careerRecommendations.filter((c) => comparingIds.includes(c.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Student Archetype Banner */}
      <div className="bg-[#2D4534] dark:bg-[#1E2E23] border border-[#3A5341] rounded-3xl p-6 sm:p-8 text-[#FDFBF7] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#EBF2ED] text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Profile Matched</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display">
              {analysis.identifiedArchetype || 'Personalized Career Explorer'}
            </h1>
            <p className="text-xs sm:text-sm text-[#D5EAD9] max-w-2xl leading-relaxed">
              {analysis.studentSummary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              id="recommendations-ask-mentor-btn"
              onClick={() => onOpenMentor()}
              className="px-4 py-2.5 rounded-xl bg-[#FDFBF7] text-[#2D4534] hover:bg-[#EBF2ED] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-[#4A6550]" />
              <span>Discuss with AI Mentor</span>
            </button>
            <button
              id="retake-quiz-btn"
              onClick={onRetakeQuiz}
              className="px-3.5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Key Strengths Pills */}
        {analysis.topStrengthsProfile && analysis.topStrengthsProfile.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#D5EAD9] mr-1">Your Key Strengths:</span>
            {analysis.topStrengthsProfile.map((strength) => (
              <span
                key={strength}
                className="px-2.5 py-1 rounded-lg bg-white/15 text-white text-xs font-medium"
              >
                {strength}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Prominent Educational Suggestion & Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-[#F7F4EE] dark:bg-[#242220] border border-[#DFD7CB] dark:border-[#383531] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-[#EBF2ED] dark:bg-[#1E2E23] text-[#2D4534] dark:text-[#B5D6BE] shrink-0 mt-0.5 sm:mt-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#2D4534] dark:text-[#B5D6BE]">
              Career Recommendations are Suggestions Only
            </p>
            <p className="text-[#5C574F] dark:text-[#C5C0B6] mt-0.5 leading-relaxed">
              These paths and match percentages are exploratory ideas to help you discover new fields—never guarantees of success or fixed predictions. Explore freely without pressure, and discuss all goals with school counselors and guardians.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Compare Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="w-4 h-4 text-[#8C867A] shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#3A5341] text-[#FDFBF7] shadow-xs'
                  : 'bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#E2DDD3] dark:hover:bg-[#3D3934]'
              }`}
            >
              {cat === 'all' ? 'All Pathways' : cat}
            </button>
          ))}
        </div>

        {/* Compare Trigger */}
        {comparingIds.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              id="open-compare-modal-btn"
              onClick={() => setShowCompareModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#516F7D] hover:bg-[#3E5C6E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Selected ({comparingIds.length}/2)</span>
            </button>
            <button
              onClick={() => setComparingIds([])}
              className="text-xs text-[#736E65] hover:underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Career Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((career) => {
          const isSaved = savedCareerIds.includes(career.id);
          const isComparing = comparingIds.includes(career.id);

          return (
            <div
              key={career.id}
              id={`career-card-${career.id}`}
              className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#4A6550]/60"
            >
              <div>
                {/* Header: Match Score, Category, Bookmark */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#EBF2ED] dark:bg-[#202E24] border border-[#4A6550]/30 text-[#2D4534] dark:text-[#B5D6BE] text-xs font-extrabold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#4A6550] dark:text-[#7D9D85]" />
                      <span>{career.matchScore}% Match</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] text-[#736E65] dark:text-[#A39E93] text-[11px] font-medium">
                      {career.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      id={`compare-toggle-${career.id}`}
                      onClick={() => toggleCompare(career.id)}
                      title="Compare with another career"
                      className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isComparing
                          ? 'bg-[#EBF1F5] dark:bg-[#1E2B33] border-[#516F7D] text-[#516F7D]'
                          : 'border-[#E8E2D9] dark:border-[#383531] text-[#8C867A] hover:text-[#3D3A35] dark:hover:text-[#EFECE6]'
                      }`}
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                    <button
                      id={`save-career-${career.id}`}
                      onClick={() => onToggleSaveCareer(career.id)}
                      title={isSaved ? 'Remove from saved' : 'Save career'}
                      className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#FAF0EB] dark:bg-[#2E201B] border-[#C87D55] text-[#C87D55]'
                          : 'border-[#E8E2D9] dark:border-[#383531] text-[#8C867A] hover:text-[#C87D55]'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Career Title & Tagline */}
                <h3 className="text-xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7] group-hover:text-[#4A6550] dark:group-hover:text-[#7D9D85] transition-colors">
                  {career.name}
                </h3>
                <p className="text-xs text-[#736E65] dark:text-[#A39E93] mt-1 mb-4 italic">
                  {career.tagline}
                </p>

                {/* Why it matches */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D4534] dark:text-[#B5D6BE] mb-1">
                    <Compass className="w-3.5 h-3.5 text-[#4A6550]" />
                    <span>Why This Matches You:</span>
                  </div>
                  <p className="text-xs text-[#5C574F] dark:text-[#D5D0C7] leading-relaxed">
                    {career.whyItMatches}
                  </p>
                </div>

                {/* Key Skills & Recommended Subjects Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs">
                  <div>
                    <div className="flex items-center gap-1 font-semibold text-[#3D3A35] dark:text-[#EFECE6] mb-1.5">
                      <Code className="w-3.5 h-3.5 text-[#B88448]" />
                      <span>Important Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {career.importantSkills.slice(0, 3).map((s) => (
                        <span
                          key={s.name}
                          className="px-2 py-0.5 rounded-md bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] text-[11px]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 font-semibold text-[#3D3A35] dark:text-[#EFECE6] mb-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#516F7D]" />
                      <span>Focus Subjects:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {career.recommendedSubjects.slice(0, 2).map((sub) => (
                        <span
                          key={sub.subject}
                          className="px-2 py-0.5 rounded-md bg-[#EBF1F5] dark:bg-[#1E2B33] text-[#2C4B5E] dark:text-[#9EC4D7] text-[11px]"
                        >
                          {sub.subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8E2D9] dark:border-[#383531] flex flex-col sm:flex-row items-center gap-2">
                <button
                  id={`view-detail-${career.id}`}
                  onClick={() => onSelectCareer(career)}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#3D3A35] hover:bg-[#292723] dark:bg-[#EFECE6] dark:hover:bg-white text-white dark:text-[#262422] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Career Deep-Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`view-roadmap-${career.id}`}
                  onClick={() => onOpenRoadmap(career)}
                  className="w-full sm:w-auto py-2.5 px-3 rounded-xl border border-[#DFD7CB] dark:border-[#383531] text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#4A6550]" />
                  <span>Roadmap</span>
                </button>

                <button
                  id={`ask-mentor-${career.id}`}
                  onClick={() => onOpenMentor(career)}
                  title="Ask Mentor about this path"
                  className="w-full sm:w-auto py-2.5 px-3 rounded-xl border border-[#DFD7CB] dark:border-[#383531] text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <MessageSquareHeart className="w-3.5 h-3.5 text-[#B88448]" />
                  <span className="sm:hidden">Ask Mentor</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compare Modal */}
      {showCompareModal && comparedCareers.length >= 2 && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] dark:border-[#383531] mb-6">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#516F7D]" />
                <h3 className="text-lg font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
                  Side-by-Side Career Comparison
                </h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] text-[#5C574F] dark:text-[#D5D0C7] hover:text-[#3D3A35] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {comparedCareers.map((c) => (
                <div key={c.id} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531]">
                    <span className="text-xs font-extrabold text-[#4A6550] dark:text-[#7D9D85]">
                      {c.matchScore}% Match
                    </span>
                    <h4 className="text-base font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7] mt-1">
                      {c.name}
                    </h4>
                    <p className="text-[11px] text-[#736E65] dark:text-[#A39E93] mt-0.5">{c.category}</p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#3D3A35] dark:text-[#EFECE6] mb-1">
                      Core Subjects Needed:
                    </h5>
                    <ul className="text-xs text-[#5C574F] dark:text-[#D5D0C7] list-disc list-inside space-y-1">
                      {c.recommendedSubjects.map((s) => (
                        <li key={s.subject}>
                          <span className="font-semibold">{s.subject}</span> ({s.relevanceLevel} priority)
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#3D3A35] dark:text-[#EFECE6] mb-1">
                      Education Options:
                    </h5>
                    <div className="space-y-1 text-xs text-[#5C574F] dark:text-[#D5D0C7]">
                      {c.possibleEducationPaths.map((p) => (
                        <div key={p.title} className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531]">
                          <div className="font-semibold text-[#3D3A35] dark:text-[#EFECE6]">{p.pathType}</div>
                          <div className="text-[11px] text-[#736E65] dark:text-[#A39E93]">{p.duration} • Cost: {p.costLevel}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#3D3A35] dark:text-[#EFECE6] mb-1">
                      Beginner Project Idea:
                    </h5>
                    <p className="text-xs text-[#2D4534] dark:text-[#D5EAD9] bg-[#EBF2ED] dark:bg-[#202E24] p-2.5 rounded-xl border border-[#4A6550]/30">
                      {c.beginnerProjects[0]?.title || 'Interactive prototype'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowCompareModal(false);
                      onSelectCareer(c);
                    }}
                    className="w-full py-2 rounded-xl bg-[#3D3A35] hover:bg-[#292723] dark:bg-[#EFECE6] dark:hover:bg-white text-white dark:text-[#262422] text-xs font-bold cursor-pointer"
                  >
                    View Full Roadmap for {c.name.split(' ')[0]}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
