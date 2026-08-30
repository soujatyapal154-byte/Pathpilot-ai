import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  X, 
  Check, 
  HelpCircle, 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  Heart, 
  Zap, 
  ThumbsUp, 
  ThumbsDown, 
  Compass, 
  Layers, 
  DollarSign 
} from 'lucide-react';
import { 
  StudentProfile, 
  EducationLevel, 
  LearningStyle, 
  BudgetPreference 
} from '../types';
import { 
  SUBJECT_OPTIONS, 
  INTEREST_OPTIONS, 
  SKILL_OPTIONS, 
  STRENGTH_OPTIONS, 
  ACTIVITIES_ENJOYED_OPTIONS, 
  ACTIVITIES_DISLIKED_OPTIONS,
  PRESET_STUDENT_PROFILES
} from '../data/presets';

interface QuestionnaireViewProps {
  initialProfile?: StudentProfile;
  onSubmit: (profile: StudentProfile) => void;
  onCancel?: () => void;
  onSelectPreset: (profile: StudentProfile) => void;
}

const EDUCATION_LEVELS: EducationLevel[] = [
  'Middle School (Ages 11-14)',
  'High School - Early (Grades 9-10 / Ages 14-16)',
  'High School - Senior (Grades 11-12 / Ages 16-18)',
  'Undergraduate / College Student',
  'Vocational / Technical Student',
  'Gap Year / Career Explorer'
];

const LEARNING_STYLES: { style: LearningStyle; desc: string }[] = [
  { style: 'Hands-on & Project-based', desc: 'Building prototypes, coding, experiments, and active doing' },
  { style: 'Visual & Concept Maps', desc: 'Diagrams, video walk-throughs, color coding, and visual models' },
  { style: 'Reading & Written Reflection', desc: 'Deep-dive articles, textbooks, essays, and independent research' },
  { style: 'Collaborative & Group Discussions', desc: 'Debating with peers, study groups, workshops, and team projects' },
  { style: 'Self-paced Interactive Tutorials', desc: 'Step-by-step digital modules, gamified learning, and solo practice' }
];

const BUDGET_PREFERENCES: { pref: BudgetPreference; desc: string }[] = [
  { pref: 'Low-Cost / Self-Directed & Free Resources', desc: 'Open-source curricula, free libraries, YouTube, and low debt' },
  { pref: 'Community College / Vocational Training', desc: '2-year certificates and cost-effective transfer pathways' },
  { pref: 'Standard In-State / Public University', desc: 'Traditional 4-year public university tuition' },
  { pref: 'Flexible / Exploring All Paths & Scholarships', desc: 'Open to private, international, and merit scholarship programs' },
  { pref: 'No Specific Preference', desc: 'Focus purely on learning fit and skills rather than financial tier' }
];

export const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({
  initialProfile,
  onSubmit,
  onCancel,
  onSelectPreset,
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  const [profile, setProfile] = useState<StudentProfile>(
    initialProfile || {
      educationLevel: 'High School - Senior (Grades 11-12 / Ages 16-18)',
      ageGroup: '16-18',
      countryRegion: '',
      favoriteSubjects: ['Computer Science & Coding', 'Mathematics (Algebra/Calculus)'],
      interests: ['Artificial Intelligence & Machine Learning', 'Game Design & 3D Modeling'],
      skills: ['Logical Reasoning & Coding', 'Visual Layout & UI Design'],
      strengths: ['Creative Imagination & Innovation', 'Analytical & Systematic Thinking'],
      activitiesEnjoyed: ['Building digital or physical prototypes', 'Solving complex puzzles and logic riddles'],
      activitiesDisliked: ['Repetitive manual data entry', 'Aggressive sales and high-pressure quotas'],
      curiousCareers: ['Software Engineer', 'UX Designer'],
      learningStyle: 'Hands-on & Project-based',
      budgetPreference: 'Standard In-State / Public University',
      additionalNotes: '',
    }
  );

  // Custom Tag Input States
  const [customSubject, setCustomSubject] = useState('');
  const [customInterest, setCustomInterest] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [customStrength, setCustomStrength] = useState('');
  const [customCareer, setCustomCareer] = useState('');

  // Toggle helpers
  const toggleArrayItem = (field: keyof StudentProfile, item: string) => {
    setProfile((prev) => {
      const current = (prev[field] as string[]) || [];
      const exists = current.includes(item);
      const updated = exists ? current.filter((x) => x !== item) : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const addCustomItem = (field: keyof StudentProfile, value: string, clearFn: () => void) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setProfile((prev) => {
      const current = (prev[field] as string[]) || [];
      if (!current.includes(trimmed)) {
        return { ...prev, [field]: [...current, trimmed] };
      }
      return prev;
    });
    clearFn();
  };

  const removeArrayItem = (field: keyof StudentProfile, item: string) => {
    setProfile((prev) => {
      const current = (prev[field] as string[]) || [];
      return { ...prev, [field]: current.filter((x) => x !== item) };
    });
  };

  // Validation
  const isStep1Valid = !!profile.educationLevel;
  const isStep2Valid = profile.favoriteSubjects.length > 0 && profile.interests.length > 0;
  const isStep3Valid = profile.skills.length > 0 || profile.strengths.length > 0;
  const isStep4Valid = !!profile.learningStyle;

  const canProceed =
    step === 1 ? isStep1Valid : step === 2 ? isStep2Valid : step === 3 ? isStep3Valid : isStep4Valid;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSubmit(profile);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner with Presets & Progress */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#B5D6BE] text-xs font-bold">
                Step {step} of {totalSteps}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
                Student Profile Questionnaire
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#736E65] dark:text-[#A39E93] mt-1">
              Help us understand your interests and learning preferences to build your personalized career map.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="quiz-quick-preset-btn"
              onClick={() => onSelectPreset(PRESET_STUDENT_PROFILES[0].profile)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#4A6550]/30 bg-[#EBF2ED] text-[#2D4534] dark:bg-[#202E24] dark:text-[#B5D6BE] hover:bg-[#DDE9E0] transition-colors"
            >
              Fill Sample Profile
            </button>
          </div>
        </div>

        {/* Student Privacy & Safety Guarantee */}
        <div className="mb-4 p-3 rounded-2xl bg-[#F7F4EE] dark:bg-[#22201E] border border-[#E8E2D9] dark:border-[#383531] flex items-center gap-2.5 text-xs text-[#5C574F] dark:text-[#C5C0B6]">
          <span className="font-bold text-[#2D4534] dark:text-[#B5D6BE] shrink-0">🔒 Privacy First:</span>
          <span>No personally identifiable information (such as your full name, email, phone number, or school name) is required, collected, or tracked.</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-[#E8E2D9] dark:bg-[#383531] h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#3A5341] to-[#5C7862] h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-semibold text-[#8C867A] dark:text-[#736E65] mt-2">
          <span className={step >= 1 ? 'text-[#3A5341] dark:text-[#7D9D85]' : ''}>1. Background</span>
          <span className={step >= 2 ? 'text-[#3A5341] dark:text-[#7D9D85]' : ''}>2. Subjects & Passions</span>
          <span className={step >= 3 ? 'text-[#3A5341] dark:text-[#7D9D85]' : ''}>3. Skills & Strengths</span>
          <span className={step >= 4 ? 'text-[#3A5341] dark:text-[#7D9D85]' : ''}>4. Workstyle & Budget</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-6 sm:p-8 shadow-xs">
        {/* STEP 1: Background & Education Level */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-3">
                <GraduationCap className="w-4 h-4 text-[#4A6550]" />
                <span>What is your current education level? *</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    id={`edu-level-${level.slice(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setProfile({ ...profile, educationLevel: level })}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      profile.educationLevel === level
                        ? 'border-[#4A6550] bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#D5EAD9] font-bold shadow-xs'
                        : 'border-[#E8E2D9] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1F1D1B] hover:border-[#B5ADA0] dark:hover:border-[#524E48] text-[#5C574F] dark:text-[#D5D0C7]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{level}</span>
                    {profile.educationLevel === level && (
                      <Check className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-2">
                  <MapPin className="w-4 h-4 text-[#4A6550]" />
                  <span>Country / Region (Optional)</span>
                </label>
                <p className="text-[11px] text-[#736E65] dark:text-[#A39E93] mb-2">
                  Helps us contextualize education systems and university pathways.
                </p>
                <input
                  type="text"
                  id="country-region-input"
                  value={profile.countryRegion}
                  onChange={(e) => setProfile({ ...profile, countryRegion: e.target.value })}
                  placeholder="e.g. United States, Canada, United Kingdom, India, Global"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] text-xs sm:text-sm focus:outline-[#4A6550]"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-2">
                  <Layers className="w-4 h-4 text-[#4A6550]" />
                  <span>Age Group (Optional)</span>
                </label>
                <p className="text-[11px] text-[#736E65] dark:text-[#A39E93] mb-2">
                  Used only to calibrate project complexity recommendations.
                </p>
                <select
                  id="age-group-select"
                  value={profile.ageGroup}
                  onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] text-xs sm:text-sm focus:outline-[#4A6550]"
                >
                  <option value="11-13">11-13 Years</option>
                  <option value="14-16">14-16 Years</option>
                  <option value="16-18">16-18 Years</option>
                  <option value="19-22">19-22 Years</option>
                  <option value="23+">23+ Years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Academics & Interests */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Favorite Subjects */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
                  <BookOpen className="w-4 h-4 text-[#4A6550]" />
                  <span>Favorite School Subjects *</span>
                </label>
                <span className="text-[11px] text-[#8C867A]">Select all that apply</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {SUBJECT_OPTIONS.map((subj) => {
                  const selected = profile.favoriteSubjects.includes(subj);
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteSubjects', subj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selected
                          ? 'bg-[#3A5341] text-[#FDFBF7] shadow-xs'
                          : 'bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#E2DDD3] dark:hover:bg-[#3D3934]'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                      <span>{subj}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Subject Input */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Add custom subject..."
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomItem('favoriteSubjects', customSubject, () => setCustomSubject(''));
                    }
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] flex-1 focus:outline-[#4A6550]"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('favoriteSubjects', customSubject, () => setCustomSubject(''))}
                  className="px-3 py-1.5 rounded-lg bg-[#3D3A35] hover:bg-[#292723] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Interests & Curiosities */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
                  <Heart className="w-4 h-4 text-[#C87D55]" />
                  <span>Broad Topics & Industries You Love *</span>
                </label>
                <span className="text-[11px] text-[#8C867A]">Pick 2 or more</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {INTEREST_OPTIONS.map((interest) => {
                  const selected = profile.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem('interests', interest)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selected
                          ? 'bg-[#C87D55] text-white shadow-xs'
                          : 'bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#E2DDD3] dark:hover:bg-[#3D3934]'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Interest Input */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Add custom interest..."
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomItem('interests', customInterest, () => setCustomInterest(''));
                    }
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] flex-1 focus:outline-[#4A6550]"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('interests', customInterest, () => setCustomInterest(''))}
                  className="px-3 py-1.5 rounded-lg bg-[#3D3A35] hover:bg-[#292723] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Curious Careers */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-2">
                <Compass className="w-4 h-4 text-[#516F7D]" />
                <span>Any specific careers you are curious about right now? (Optional)</span>
              </label>
              <p className="text-[11px] text-[#736E65] dark:text-[#A39E93] mb-3">
                If you have some dream jobs or curious titles in mind, add them here so our advisor can analyze how well they align!
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.curiousCareers.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EBF1F5] dark:bg-[#1E2B33] border border-[#BACED9] dark:border-[#2C414E] text-[#2C4B5E] dark:text-[#9EC4D7] text-xs font-medium"
                  >
                    <span>{c}</span>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('curiousCareers', c)}
                      className="hover:text-[#C87D55] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="e.g. Game Designer, Architect, Marine Biologist..."
                  value={customCareer}
                  onChange={(e) => setCustomCareer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomItem('curiousCareers', customCareer, () => setCustomCareer(''));
                    }
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] flex-1 focus:outline-[#4A6550]"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('curiousCareers', customCareer, () => setCustomCareer(''))}
                  className="px-3 py-1.5 rounded-lg bg-[#516F7D] hover:bg-[#3E5C6E] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Skills, Strengths & Enjoyed/Disliked Activities */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Skills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
                  <Zap className="w-4 h-4 text-[#B88448]" />
                  <span>Current Skills & Capabilities</span>
                </label>
                <span className="text-[11px] text-[#8C867A]">Pick any you currently practice</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {SKILL_OPTIONS.map((skill) => {
                  const selected = profile.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleArrayItem('skills', skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selected
                          ? 'bg-[#B88448] text-white shadow-xs'
                          : 'bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#E2DDD3] dark:hover:bg-[#3D3934]'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Skill Input */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Add custom skill..."
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomItem('skills', customSkill, () => setCustomSkill(''));
                    }
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] flex-1 focus:outline-[#4A6550]"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('skills', customSkill, () => setCustomSkill(''))}
                  className="px-3 py-1.5 rounded-lg bg-[#3D3A35] hover:bg-[#292723] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display">
                  <Sparkles className="w-4 h-4 text-[#516F7D]" />
                  <span>Your Personal Strengths</span>
                </label>
                <span className="text-[11px] text-[#8C867A]">What comes naturally to you?</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {STRENGTH_OPTIONS.map((strength) => {
                  const selected = profile.strengths.includes(strength);
                  return (
                    <button
                      key={strength}
                      type="button"
                      onClick={() => toggleArrayItem('strengths', strength)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selected
                          ? 'bg-[#516F7D] text-white shadow-xs'
                          : 'bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#E2DDD3] dark:hover:bg-[#3D3934]'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                      <span>{strength}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Strength Input */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Add custom strength..."
                  value={customStrength}
                  onChange={(e) => setCustomStrength(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomItem('strengths', customStrength, () => setCustomStrength(''));
                    }
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] flex-1 focus:outline-[#4A6550]"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('strengths', customStrength, () => setCustomStrength(''))}
                  className="px-3 py-1.5 rounded-lg bg-[#3D3A35] hover:bg-[#292723] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Activities Enjoyed vs Disliked */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E8E2D9] dark:border-[#383531]">
              {/* Enjoyed */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-[#2D4534] dark:text-[#B5D6BE] font-display mb-2">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#4A6550]" />
                  <span>Activities You Enjoy Doing</span>
                </label>
                <div className="space-y-1.5">
                  {ACTIVITIES_ENJOYED_OPTIONS.map((act) => {
                    const active = profile.activitiesEnjoyed.includes(act);
                    return (
                      <button
                        key={act}
                        type="button"
                        onClick={() => toggleArrayItem('activitiesEnjoyed', act)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? 'bg-[#EBF2ED] dark:bg-[#202E24] border border-[#4A6550]/40 text-[#2D4534] dark:text-[#D5EAD9] font-semibold'
                            : 'bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29]'
                        }`}
                      >
                        <span>{act}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#4A6550] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Disliked */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-[#8F4826] dark:text-[#E8B59E] font-display mb-2">
                  <ThumbsDown className="w-3.5 h-3.5 text-[#C87D55]" />
                  <span>Activities You Prefer to Avoid</span>
                </label>
                <div className="space-y-1.5">
                  {ACTIVITIES_DISLIKED_OPTIONS.map((act) => {
                    const active = profile.activitiesDisliked.includes(act);
                    return (
                      <button
                        key={act}
                        type="button"
                        onClick={() => toggleArrayItem('activitiesDisliked', act)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? 'bg-[#FAF0EB] dark:bg-[#2E201B] border border-[#C87D55]/40 text-[#8F4826] dark:text-[#E8B59E] font-semibold'
                            : 'bg-[#FAF8F5] dark:bg-[#1F1D1B] border border-[#E8E2D9] dark:border-[#383531] text-[#5C574F] dark:text-[#C5C0B6] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29]'
                        }`}
                      >
                        <span>{act}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#C87D55] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Learning Style, Budget & Final Notes */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Preferred Learning Style */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-3">
                <Layers className="w-4 h-4 text-[#4A6550]" />
                <span>Preferred Learning Style *</span>
              </label>
              <div className="space-y-2.5">
                {LEARNING_STYLES.map(({ style, desc }) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setProfile({ ...profile, learningStyle: style })}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      profile.learningStyle === style
                        ? 'border-[#4A6550] bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#D5EAD9] font-bold shadow-xs'
                        : 'border-[#E8E2D9] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1F1D1B] hover:border-[#B5ADA0] dark:hover:border-[#524E48] text-[#5C574F] dark:text-[#D5D0C7]'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold">{style}</div>
                      <div className="text-[11px] text-[#736E65] dark:text-[#A39E93] mt-0.5">{desc}</div>
                    </div>
                    {profile.learningStyle === style && (
                      <Check className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Education Budget Preference */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-3">
                <DollarSign className="w-4 h-4 text-[#4A6550]" />
                <span>Education Cost / Budget Preference (Optional)</span>
              </label>
              <div className="space-y-2.5">
                {BUDGET_PREFERENCES.map(({ pref, desc }) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setProfile({ ...profile, budgetPreference: pref })}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      profile.budgetPreference === pref
                        ? 'border-[#4A6550] bg-[#EBF2ED] dark:bg-[#202E24] text-[#2D4534] dark:text-[#D5EAD9] font-bold shadow-xs'
                        : 'border-[#E8E2D9] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1F1D1B] hover:border-[#B5ADA0] dark:hover:border-[#524E48] text-[#5C574F] dark:text-[#D5D0C7]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{pref}</div>
                      <div className="text-[11px] text-[#736E65] dark:text-[#A39E93] mt-0.5">{desc}</div>
                    </div>
                    {profile.budgetPreference === pref && (
                      <Check className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Student Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#3D3A35] dark:text-[#EFECE6] font-display mb-1">
                <HelpCircle className="w-4 h-4 text-[#4A6550]" />
                <span>Any other thoughts, worries, or goals you want the advisor to consider? (Optional)</span>
              </label>
              <p className="text-[11px] text-[#736E65] dark:text-[#A39E93] mb-2">
                🔒 <span className="font-semibold">Privacy note:</span> Please do not include private personal identifying information (such as your full name, phone number, address, email, or school name).
              </p>
              <textarea
                id="additional-notes-textarea"
                rows={3}
                value={profile.additionalNotes || ''}
                onChange={(e) => setProfile({ ...profile, additionalNotes: e.target.value })}
                placeholder="e.g. I want to explore hands-on creative roles, learn about scholarship-friendly degrees, or understand flexible options..."
                className="w-full p-3 rounded-xl border border-[#DFD7CB] dark:border-[#383531] bg-[#FAF8F5] dark:bg-[#1C1B19] text-[#3D3A35] dark:text-[#EFECE6] text-xs sm:text-sm focus:outline-[#4A6550]"
              />
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D9] dark:border-[#383531] flex items-center justify-between gap-3">
          <button
            type="button"
            id="quiz-prev-btn"
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl border border-[#DFD7CB] dark:border-[#383531] text-[#5C574F] dark:text-[#D5D0C7] hover:bg-[#F7F4EE] dark:hover:bg-[#2F2C29] text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancel' : 'Previous Step'}</span>
          </button>

          <button
            type="button"
            id="quiz-next-btn"
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
              canProceed
                ? 'bg-[#3A5341] hover:bg-[#2D4233] text-[#FDFBF7] shadow-[#3A5341]/20 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-[#E8E2D9] dark:bg-[#383531] text-[#A39E93] dark:text-[#736E65] cursor-not-allowed shadow-none'
            }`}
          >
            <span>{step === totalSteps ? 'Generate Career Recommendations' : 'Next Step'}</span>
            {step === totalSteps ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
