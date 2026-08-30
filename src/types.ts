/**
 * PathPilot AI - Types and Data Models
 * Personalized career & education exploration for students
 */

export type EducationLevel =
  | 'Middle School (Ages 11-14)'
  | 'High School - Early (Grades 9-10 / Ages 14-16)'
  | 'High School - Senior (Grades 11-12 / Ages 16-18)'
  | 'Undergraduate / College Student'
  | 'Vocational / Technical Student'
  | 'Gap Year / Career Explorer';

export type LearningStyle =
  | 'Hands-on & Project-based'
  | 'Visual & Concept Maps'
  | 'Reading & Written Reflection'
  | 'Collaborative & Group Discussions'
  | 'Self-paced Interactive Tutorials';

export type BudgetPreference =
  | 'Low-Cost / Self-Directed & Free Resources'
  | 'Community College / Vocational Training'
  | 'Standard In-State / Public University'
  | 'Flexible / Exploring All Paths & Scholarships'
  | 'No Specific Preference';

export interface StudentProfile {
  educationLevel: EducationLevel;
  ageGroup: string;
  countryRegion: string;
  favoriteSubjects: string[];
  interests: string[];
  skills: string[];
  strengths: string[];
  activitiesEnjoyed: string[];
  activitiesDisliked: string[];
  curiousCareers: string[];
  learningStyle: LearningStyle;
  budgetPreference: BudgetPreference;
  additionalNotes?: string;
}

export interface SkillItem {
  name: string;
  category: 'technical' | 'human' | 'domain';
  importance: 'essential' | 'advantageous';
  description?: string;
}

export interface SubjectRecommendation {
  subject: string;
  reason: string;
  relevanceLevel: 'High' | 'Medium';
}

export interface EducationPathway {
  pathType: 'University Degree' | 'Community / Vocational College' | 'Self-Taught & Bootcamps' | 'Apprenticeship & Certifications';
  title: string;
  description: string;
  duration: string;
  costLevel: '$' | '$$' | '$$$';
  pros: string[];
  considerations: string[];
}

export interface BeginnerProject {
  id: string;
  title: string;
  summary: string;
  difficulty: 'Beginner' | 'Intermediate';
  estimatedHours: string;
  deliverables: string[];
  toolsNeeded: string[];
  stepByStepGuide: string[];
}

export interface ResourceLink {
  name: string;
  type: 'free_course' | 'tool' | 'platform' | 'community' | 'reading';
  note: string;
}

export interface RoadmapStep {
  id: string;
  stage: 'Foundation' | 'Skills' | 'Projects' | 'Education' | 'Experience' | 'Career';
  stageNumber: number;
  title: string;
  subtitle: string;
  description: string;
  keyActions: string[];
  recommendedResources: ResourceLink[];
  estimatedDuration: string;
  completed?: boolean;
}

export interface CareerRecommendation {
  id: string;
  name: string;
  category: string;
  tagline: string;
  matchScore: number;
  whyItMatches: string;
  matchReasons: {
    factor: string;
    studentConnection: string;
  }[];
  importantSkills: SkillItem[];
  recommendedSubjects: SubjectRecommendation[];
  possibleEducationPaths: EducationPathway[];
  beginnerProjects: BeginnerProject[];
  futureLearningSteps: string[];
  roadmap: RoadmapStep[];
  dayInTheLife: string;
  growthOutlook: string;
  transferableStrengths: string[];
  discussionPointsForCounselor: string[];
}

export interface AnalysisResponse {
  studentSummary: string;
  identifiedArchetype: string;
  topStrengthsProfile: string[];
  guidanceDisclaimer: string;
  careerRecommendations: CareerRecommendation[];
  generalAdvice: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  careerContext?: string;
  suggestedPrompts?: string[];
}

export type ActiveTab = 'landing' | 'questionnaire' | 'recommendations' | 'career-detail' | 'roadmap' | 'mentor' | 'saved';
