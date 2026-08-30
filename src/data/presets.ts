import { StudentProfile, AnalysisResponse } from '../types';

export const PRESET_STUDENT_PROFILES: {
  id: string;
  title: string;
  badge: string;
  description: string;
  profile: StudentProfile;
}[] = [
  {
    id: 'creative-tech',
    title: 'Visual & Interactive Tech Explorer',
    badge: 'Tech & Design',
    description: 'High school junior who loves coding mini-games, visual arts, and psychology of user experiences.',
    profile: {
      educationLevel: 'High School - Senior (Grades 11-12 / Ages 16-18)',
      ageGroup: '16-18',
      countryRegion: 'North America / United States',
      favoriteSubjects: ['Computer Science', 'Visual Arts', 'Psychology', 'Mathematics'],
      interests: ['Game Design', 'User Interfaces', 'Interactive Web', 'Digital Illustration', 'Virtual Reality'],
      skills: ['HTML/CSS Basics', 'Digital Drawing', 'Visual Layout', 'Logical Problem Solving'],
      strengths: ['Creativity', 'Attention to Detail', 'Empathetic Perspective', 'Curiosity'],
      activitiesEnjoyed: ['Designing wireframes & sketches', 'Building web mini-tools', 'Video editing', 'Collaborating on creative projects'],
      activitiesDisliked: ['Monotonous spreadsheet entry', 'High-pressure cold sales', 'Rigid rote memorization without application'],
      curiousCareers: ['UX/UI Designer', 'Creative Frontend Developer', 'Game UX Designer', 'Product Designer'],
      learningStyle: 'Hands-on & Project-based',
      budgetPreference: 'Standard In-State / Public University',
      additionalNotes: 'Interested in seeing how technology and human psychology blend together to make products people love.'
    }
  },
  {
    id: 'eco-biotech',
    title: 'Eco & Life Sciences Innovator',
    badge: 'Sciences & Nature',
    description: 'Sophomore fascinated by biology, climate solutions, data analysis, and laboratory experiments.',
    profile: {
      educationLevel: 'High School - Early (Grades 9-10 / Ages 14-16)',
      ageGroup: '14-16',
      countryRegion: 'Europe / United Kingdom',
      favoriteSubjects: ['Biology', 'Chemistry', 'Environmental Science', 'Geography'],
      interests: ['Climate Tech', 'Marine Biology', 'Sustainable Agriculture', 'Wildlife Conservation', 'Genetics'],
      skills: ['Lab Methodology', 'Data Organization', 'Scientific Writing', 'Critical Thinking'],
      strengths: ['Analytical Thinking', 'Dedication to Purpose', 'Observational Precision', 'Curiosity'],
      activitiesEnjoyed: ['Field work and outdoor observations', 'Conducting hands-on experiments', 'Reading scientific articles', 'Debating solutions to global warming'],
      activitiesDisliked: ['Sitting at a desk doing repetitive calls', 'Aggressive commercial marketing', 'Ignoring environmental impacts'],
      curiousCareers: ['Environmental Scientist', 'Bioinformatician', 'Conservation Biologist', 'Renewable Energy Analyst'],
      learningStyle: 'Visual & Concept Maps',
      budgetPreference: 'Flexible / Exploring All Paths & Scholarships',
      additionalNotes: 'I want a career where I can actively protect ecosystems and solve real-world sustainability challenges.'
    }
  },
  {
    id: 'social-impact',
    title: 'Advocate & Storyteller',
    badge: 'Media & Society',
    description: 'Student passionate about literature, law, public policy, community organizing, and podcasting.',
    profile: {
      educationLevel: 'High School - Senior (Grades 11-12 / Ages 16-18)',
      ageGroup: '16-18',
      countryRegion: 'Global / International',
      favoriteSubjects: ['English Literature', 'History', 'Social Studies & Civics', 'Debate'],
      interests: ['Public Policy', 'Journalism & Podcasts', 'Human Rights', 'Education Reform', 'Community Organizing'],
      skills: ['Persuasive Writing', 'Public Speaking', 'Active Listening', 'Qualitative Research'],
      strengths: ['Empathy', 'Strategic Communication', 'Leadership', 'Grit & Adaptability'],
      activitiesEnjoyed: ['Writing essays and editorials', 'Hosting discussion panels', 'Interviewing people in my community', 'Volunteering with local youth programs'],
      activitiesDisliked: ['Heavy abstract calculus', 'Working entirely in isolation without human interaction', 'Strict bureaucratic stagnation'],
      curiousCareers: ['Public Policy Analyst', 'Investigative Journalist', 'Human Rights Advocate', 'Communications Director'],
      learningStyle: 'Collaborative & Group Discussions',
      budgetPreference: 'Low-Cost / Self-Directed & Free Resources',
      additionalNotes: 'Eager to build a career around empowering underserved communities and clear storytelling.'
    }
  }
];

export const SUBJECT_OPTIONS = [
  'Mathematics (Algebra/Calculus)',
  'Computer Science & Coding',
  'Physics',
  'Chemistry',
  'Biology & Life Sciences',
  'Environmental Science',
  'English & Literature',
  'World History & Civics',
  'Psychology & Human Behavior',
  'Economics & Business',
  'Visual Arts & Graphic Design',
  'Music & Audio Production',
  'Sociology & Anthropology',
  'Foreign Languages',
  'Physical Education & Kinesiology',
  'Debate & Speech Communications'
];

export const INTEREST_OPTIONS = [
  'Artificial Intelligence & Machine Learning',
  'Climate & Sustainability',
  'Game Design & 3D Modeling',
  'Medicine & Healthcare Tech',
  'Robotics & Hardware Engineering',
  'Storytelling, Creative Writing & Journalism',
  'Entrepreneurship & Startups',
  'Psychology & Mental Health',
  'Law, Policy & Social Justice',
  'Architecture & Spatial Design',
  'Music & Sound Design',
  'Finance, Cryptography & Economics',
  'Astronomy & Space Exploration',
  'Culinary Arts & Food Science'
];

export const SKILL_OPTIONS = [
  'Logical Reasoning & Coding',
  'Visual Layout & UI Design',
  'Creative Writing & Storytelling',
  'Data Analysis & Math Modelling',
  'Active Listening & Empathy',
  'Public Speaking & Presenting',
  'Hands-on Tinkering & Hardware',
  'Research & Fact-Checking',
  'Team Collaboration & Leadership',
  'Project Management & Organization'
];

export const STRENGTH_OPTIONS = [
  'Analytical & Systematic Thinking',
  'Creative Imagination & Innovation',
  'Empathetic Perspective-Taking',
  'Attention to Detail & Accuracy',
  'Adaptability & Resilience under change',
  'Fast Self-Directed Learner',
  'Clear & Persuasive Communicator',
  'Hands-on Maker Mentality'
];

export const ACTIVITIES_ENJOYED_OPTIONS = [
  'Building digital or physical prototypes',
  'Reading research and in-depth articles',
  'Collaborating in small lively teams',
  'Drawing, sketching, or designing graphics',
  'Mentoring or helping peers learn',
  'Solving complex puzzles and logic riddles',
  'Organizing plans, events, or spreadsheets',
  'Writing stories, essays, or scripts'
];

export const ACTIVITIES_DISLIKED_OPTIONS = [
  'Repetitive manual data entry',
  'Aggressive sales and high-pressure quotas',
  'Working for days in complete isolation',
  'Strict rote memorization without practical use',
  'High-stress confrontation and conflict management',
  'Rigid bureaucracy and slow-moving hierarchies'
];
