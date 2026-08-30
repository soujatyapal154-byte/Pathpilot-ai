export type GradeLevel = 'middle_school' | 'early_high_school' | 'late_high_school' | 'early_college' | 'other';

export type WorkEnvironment = 'outdoors_hands_on' | 'creative_studio' | 'tech_office_remote' | 'lab_research' | 'community_helping' | 'business_corporate';

export interface StudentProfile {
  name?: string;
  gradeLevel: GradeLevel;
  favoriteSubjects: string[];
  interests: string[];
  skills: string[];
  workPreferences: {
    environment: WorkEnvironment;
    teamwork: 'solo' | 'small_team' | 'large_team';
    problemSolvingStyle: 'practical_hands_on' | 'analytical_logical' | 'creative_intuitive' | 'social_empathetic';
  };
  hobbies: string[];
  freeformNotes?: string;
}

export interface RoadmapMilestone {
  id: string;
  phase: 'Foundation' | 'Skill Building' | 'Projects' | 'Education' | 'Experience' | 'Career Launch';
  title: string;
  description: string;
  timeframe: string;
  recommendedSubjects: string[];
  actionItems: string[];
  resources: {
    title: string;
    type: 'Course' | 'Book' | 'Website' | 'Tool' | 'Competition' | 'Club';
    url?: string;
  }[];
  keyMilestone: string;
}

export interface CareerProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  toolsNeeded: string[];
  stepByStepOverview: string[];
  learningOutcome: string;
}

export interface CareerRecommendation {
  id: string;
  name: string;
  category: string;
  tagline: string;
  matchScore: number;
  whyItMatches: string;
  description: string;
  dayInTheLife: string[];
  coreSkills: {
    technical: string[];
    soft: string[];
  };
  salaryOutlook: {
    entryLevel: string;
    median: string;
    experienced: string;
    growthRate: string;
  };
  educationPaths: {
    type: 'Degree' | 'Bootcamp/Certification' | 'Self-Taught / Apprenticeship';
    details: string;
  }[];
  beginnerProjects: CareerProject[];
  highSchoolSubjects: string[];
  pros: string[];
  challenges: string[];
  roadmap: RoadmapMilestone[];
}

export interface CareerAnalysisResult {
  studentSummary: string;
  strengthHighlights: string[];
  topCareers: CareerRecommendation[];
  crossDisciplinaryInsight: string;
  recommendedImmediateAction: string;
}

export interface MentorChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  careerContext?: string;
  suggestedPrompts?: string[];
}

export type ActiveTab = 'landing' | 'quiz' | 'recommendations' | 'career-detail' | 'roadmap' | 'mentor';
