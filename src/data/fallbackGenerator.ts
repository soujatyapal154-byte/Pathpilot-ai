import { StudentProfile, AnalysisResponse, CareerRecommendation, RoadmapStep } from '../types';

export function generateFallbackAnalysis(profile: StudentProfile): AnalysisResponse {
  // Determine dominant domains based on student's favorite subjects and interests
  const subjects = profile.favoriteSubjects.map(s => s.toLowerCase()).join(' ');
  const interests = profile.interests.map(i => i.toLowerCase()).join(' ');
  const skills = profile.skills.map(s => s.toLowerCase()).join(' ');

  const hasTech = subjects.includes('computer') || interests.includes('artificial') || interests.includes('game') || skills.includes('coding');
  const hasBio = subjects.includes('bio') || subjects.includes('chem') || interests.includes('medicine') || interests.includes('climate') || interests.includes('sustainability');
  const hasArt = subjects.includes('art') || interests.includes('design') || skills.includes('visual') || interests.includes('3d');
  const hasWriting = subjects.includes('english') || subjects.includes('history') || interests.includes('storytelling') || interests.includes('law') || skills.includes('writing');

  const recommendations: CareerRecommendation[] = [];

  // Career 1: Interactive / Digital
  if (hasTech || hasArt) {
    recommendations.push({
      id: 'career-ux-engineer',
      name: 'UX Engineer & Creative Technologist',
      category: 'Design & Computing',
      tagline: 'Bridging human psychology, visual aesthetics, and interactive software development.',
      matchScore: 95,
      whyItMatches: `Because you enjoy ${profile.favoriteSubjects.slice(0, 2).join(' and ')} combined with strengths in ${profile.strengths.slice(0, 2).join(', ')}, this path lets you craft intuitive digital interfaces without losing sight of human empathy.`,
      matchReasons: [
        { factor: 'Subject Alignment', studentConnection: `Strong overlap with ${profile.favoriteSubjects.slice(0, 2).join(' & ')}.` },
        { factor: 'Strengths Fit', studentConnection: `Leverages your ${profile.strengths[0] || 'creativity'} to solve user challenges.` },
        { factor: 'Learning Style', studentConnection: `Directly matches your ${profile.learningStyle} approach through real visual builds.` }
      ],
      importantSkills: [
        { name: 'User Experience (UX) Design', category: 'domain', importance: 'essential' },
        { name: 'Interactive Frontend (HTML/CSS/JS/React)', category: 'technical', importance: 'essential' },
        { name: 'Wireframing & Prototyping (Figma)', category: 'technical', importance: 'essential' },
        { name: 'Empathy & User Interviewing', category: 'human', importance: 'essential' },
        { name: 'Design Systems & Accessibility', category: 'technical', importance: 'advantageous' }
      ],
      recommendedSubjects: [
        { subject: 'Computer Science', reason: 'Provides foundational computational thinking and web architecture.', relevanceLevel: 'High' },
        { subject: 'Visual Arts / Graphic Design', reason: 'Builds color theory, typography hierarchy, and composition mastery.', relevanceLevel: 'High' },
        { subject: 'Psychology', reason: 'Helps understand cognitive load, user habits, and mental models.', relevanceLevel: 'Medium' }
      ],
      possibleEducationPaths: [
        {
          pathType: 'University Degree',
          title: 'B.S. / B.A. in Human-Computer Interaction, Design, or CS',
          description: 'Comprehensive 4-year degree covering software engineering principles and digital design theory.',
          duration: '3-4 Years',
          costLevel: '$$$',
          pros: ['Deep academic credibility', 'Campus recruitment fairs', 'Broad foundational research opportunities'],
          considerations: ['Higher financial investment', 'Less focused on rapid portfolio execution']
        },
        {
          pathType: 'Community / Vocational College',
          title: 'Associate Degree in Web Development & Graphic Design',
          description: '2-year accelerated curriculum focused heavily on portfolio-building and modern design tools.',
          duration: '2 Years',
          costLevel: '$',
          pros: ['Cost effective', 'Smaller class sizes', 'Directly transferable credits'],
          considerations: ['May require supplementary self-study in advanced software engineering']
        },
        {
          pathType: 'Self-Taught & Bootcamps',
          title: 'Project-Driven Self-Study + Open Source Portfolios',
          description: 'Building public Figma prototypes, interactive web apps, and contributing to open-source UI libraries.',
          duration: '9-18 Months',
          costLevel: '$',
          pros: ['Self-paced schedule', 'Extremely low financial barrier', 'High agency and real-world skills'],
          considerations: ['Requires strong self-discipline and community networking']
        },
        {
          pathType: 'Apprenticeship & Certifications',
          title: 'Google UX Design Professional Certificate + Tech Apprenticeship',
          description: 'Structured industry certificates coupled with junior associate tech apprenticeships.',
          duration: '6-12 Months',
          costLevel: '$',
          pros: ['Earn while learning in many programs', 'Direct industry mentorship'],
          considerations: ['Apprenticeship slots can be competitive']
        }
      ],
      beginnerProjects: [
        {
          id: 'proj-1',
          title: 'Redesign a Frustrating School or Community App',
          summary: 'Pick a tool you use daily (e.g. school cafeteria menu, library portal) and interview 3 classmates to map pain points.',
          difficulty: 'Beginner',
          estimatedHours: '8-12 hours',
          deliverables: ['Figma 5-screen interactive prototype', 'User journey map summary slide', 'Before & After comparison deck'],
          toolsNeeded: ['Figma (Free for Education)', 'Paper & Marker for sketching', 'Google Docs / Notion'],
          stepByStepGuide: [
            'Identify 3 frustrating user tasks in the current application.',
            'Sketch 3 paper wireframe iterations of a streamlined flow.',
            'Build a digital mockup in Figma using standard mobile dimensions (390x844px).',
            'Connect screens into a clickable prototype and test with 2 friends.'
          ]
        },
        {
          id: 'proj-2',
          title: 'Build a Personal Interactive Portfolio / Hobby Guide',
          summary: 'Code a clean single-page site showcasing your favorite hobby with custom styling and animations.',
          difficulty: 'Beginner',
          estimatedHours: '12-16 hours',
          deliverables: ['Live deployed website on GitHub Pages or Vercel', 'Responsive layout for phones and laptops'],
          toolsNeeded: ['VS Code', 'GitHub', 'HTML/CSS/Tailwind'],
          stepByStepGuide: [
            'Create your index.html and style it with modern cards and responsive grid.',
            'Include an "About Me", "My Interests", and interactive feedback button.',
            'Deploy for free on GitHub Pages and share the link with a teacher or mentor.'
          ]
        }
      ],
      futureLearningSteps: [
        'Master responsive CSS frameworks and accessibility (WCAG AA standards)',
        'Learn component-driven React / TypeScript architecture',
        'Study design system tokens, typography scales, and micro-interactions',
        'Conduct usability tests with real users to measure task completion time'
      ],
      roadmap: [
        {
          id: 'rm-1',
          stage: 'Foundation',
          stageNumber: 1,
          title: 'Core Fundamentals & Digital Curiosity',
          subtitle: 'Build strong base instincts in visual aesthetics and logic',
          description: 'Establish comfort with basic HTML/CSS, design fundamentals (color, typography, grid), and curiosity in user behavior.',
          keyActions: [
            'Complete free interactive tutorials in HTML/CSS on freeCodeCamp',
            'Learn Figma basics by recreating your favorite mobile app home screen',
            'Read articles on Nielsen Norman Group (NN/g) usability heuristics'
          ],
          recommendedResources: [
            { name: 'freeCodeCamp (Responsive Web Design)', type: 'free_course', note: 'Free interactive browser tutorials' },
            { name: 'Figma for Education', type: 'tool', note: '100% free pro account for students' }
          ],
          estimatedDuration: '2-4 Months'
        },
        {
          id: 'rm-2',
          stage: 'Skills',
          stageNumber: 2,
          title: 'Applied UI/UX & Interactive Logic',
          subtitle: 'Transition from consumer to active creator',
          description: 'Deepen knowledge in JavaScript basics, responsive layouts, user persona creation, and wireframe testing.',
          keyActions: [
            'Build 3 interactive mini-apps (calculator, habit tracker, quiz)',
            'Conduct a formal usability interview with 3 peers on a prototype',
            'Learn accessibility guidelines (WCAG) and color contrast math'
          ],
          recommendedResources: [
            { name: 'The Odin Project (Foundations)', type: 'free_course', note: 'Open-source web curriculum' },
            { name: 'Refactoring UI (Tips & Articles)', type: 'reading', note: 'Practical developer-focused UI advice' }
          ],
          estimatedDuration: '3-6 Months'
        },
        {
          id: 'rm-3',
          stage: 'Projects',
          stageNumber: 3,
          title: 'Full-Stack Prototypes & Portfolio Showcases',
          subtitle: 'Create standalone polished deliverables that prove capability',
          description: 'Design and build 2 complete case studies solving real student or community issues.',
          keyActions: [
            'Publish detailed case studies documenting the problem, user research, wireframes, and final code',
            'Host your portfolio online with custom domain or GitHub Pages',
            'Participate in a student hackathon or open source contribution'
          ],
          recommendedResources: [
            { name: 'GitHub Student Developer Pack', type: 'tool', note: 'Free developer tools and domains' },
            { name: 'Devpost Student Hackathons', type: 'community', note: 'Collaborative team sprint events' }
          ],
          estimatedDuration: '4-6 Months'
        },
        {
          id: 'rm-4',
          stage: 'Education',
          stageNumber: 4,
          title: 'Higher Education or Targeted Credentials',
          subtitle: 'Formalize theory, human-computer interaction, and networks',
          description: 'Pursue your chosen higher-education path (B.S. in HCI/CS, 2-year vocational program, or verified industry certs).',
          keyActions: [
            'Collaborate on multidisciplinary group capstone projects',
            'Connect with school alumni working in tech/design fields',
            'Join student chapters of ACM or AIGA'
          ],
          recommendedResources: [
            { name: 'ACM SIGCHI Student Chapters', type: 'community', note: 'HCI research and industry network' }
          ],
          estimatedDuration: '1-4 Years'
        },
        {
          id: 'rm-5',
          stage: 'Experience',
          stageNumber: 5,
          title: 'Internships, Freelance & Mentorship',
          subtitle: 'Gain hands-on real-world client and team exposure',
          description: 'Work alongside senior designers and engineers in an internship, university research lab, or nonprofit volunteer capacity.',
          keyActions: [
            'Complete a summer internship or junior apprenticeship',
            'Build websites/tools for a local school club or community nonprofit',
            'Receive code reviews and design critiques from industry mentors'
          ],
          recommendedResources: [
            { name: 'ADPList (Free Design Mentorship)', type: 'community', note: 'Book 1-on-1 mentorship with global practitioners' }
          ],
          estimatedDuration: '6-18 Months'
        },
        {
          id: 'rm-6',
          stage: 'Career',
          stageNumber: 6,
          title: 'Associate / Junior UX Engineer',
          subtitle: 'Launch your professional career with ongoing growth',
          description: 'Begin working on production products, collaborating closely with product managers, QA, and senior staff.',
          keyActions: [
            'Contribute to production design system components',
            'Mentor incoming junior interns and student community members',
            'Keep up with emerging spatial computing, voice UI, and AI interaction paradigms'
          ],
          recommendedResources: [
            { name: 'Smashing Magazine & CSS-Tricks', type: 'reading', note: 'Ongoing professional engineering articles' }
          ],
          estimatedDuration: 'Ongoing Journey'
        }
      ],
      dayInTheLife: 'Starts with a quick team standup to review sprint goals, spends late morning interviewing users on prototype feedback in Figma, and spends afternoons writing clean React components and refining animations.',
      growthOutlook: 'High demand as digital products increasingly require specialists who understand both design aesthetics and actual frontend implementation.',
      transferableStrengths: ['Empathy for user pain points', 'Bilingual fluency in code and visual design', 'Structured problem breakdown'],
      discussionPointsForCounselor: [
        'What computer science and visual art electives are available at our school?',
        'Are there regional tech fairs, coding clubs, or graphic design competitions we can participate in?',
        'What universities or community colleges offer strong Human-Computer Interaction (HCI) or Digital Media programs?'
      ]
    });
  }

  // Career 2: Data Science / AI / Bioinformatics
  if (hasBio || hasTech) {
    recommendations.push({
      id: 'career-bioinformatics',
      name: 'Bioinformatics & Computational Biologist',
      category: 'Health & Life Sciences',
      tagline: 'Using computing power and data algorithms to decode DNA, cure diseases, and protect ecosystems.',
      matchScore: 92,
      whyItMatches: `Your interest in ${profile.favoriteSubjects.join(', ')} and curiosity about real-world scientific impact makes computational biology an ideal bridge between biological discovery and analytical problem solving.`,
      matchReasons: [
        { factor: 'Interdisciplinary Blend', studentConnection: 'Combines life sciences with analytical programming logic.' },
        { factor: 'Work Style', studentConnection: 'Matches your dislike for repetitive routine by focusing on novel discovery.' },
        { factor: 'Long-term Impact', studentConnection: 'High social utility in healthcare, climate genetics, and medicine.' }
      ],
      importantSkills: [
        { name: 'Python & R Data Analysis', category: 'technical', importance: 'essential' },
        { name: 'Genetics & Molecular Biology Foundations', category: 'domain', importance: 'essential' },
        { name: 'Statistical Modeling & Data Visualization', category: 'technical', importance: 'essential' },
        { name: 'Scientific Research & Hypothesis Testing', category: 'human', importance: 'essential' }
      ],
      recommendedSubjects: [
        { subject: 'Biology & Genetics', reason: 'Provides core understanding of cellular mechanisms and genomics.', relevanceLevel: 'High' },
        { subject: 'Mathematics & Statistics', reason: 'Crucial for interpreting sequencing data and population models.', relevanceLevel: 'High' },
        { subject: 'Computer Science', reason: 'Enables writing data parsing pipelines and running cloud compute jobs.', relevanceLevel: 'High' }
      ],
      possibleEducationPaths: [
        {
          pathType: 'University Degree',
          title: 'B.S. in Bioinformatics, Computational Biology, or Biochemistry',
          description: 'A dedicated 4-year curriculum merging genetics laboratory work with statistics and Python/R computing.',
          duration: '4 Years',
          costLevel: '$$$',
          pros: ['Direct pipeline to research labs', 'Access to expensive sequencing instruments', 'Solid foundation for M.S./Ph.D. or industry Biotech'],
          considerations: ['Requires solid commitment to both math and biology']
        },
        {
          pathType: 'Community / Vocational College',
          title: 'Associate in Biotechnology + Transfer Pathway',
          description: 'Hands-on lab technician training with low-cost general science credits transferrable to a 4-year degree.',
          duration: '2 Years + 2 Years',
          costLevel: '$',
          pros: ['Huge tuition savings', 'Immediate lab technician job qualification', 'Practical wet-lab skills'],
          considerations: ['Requires planned credit articulation for university transfer']
        },
        {
          pathType: 'Self-Taught & Bootcamps',
          title: 'Data Science Certifications + Rosalind Bioinformatics Exercises',
          description: 'Self-study using public genomics datasets from NCBI and computational biology problem sets.',
          duration: '1-2 Years',
          costLevel: '$',
          pros: ['Learn from anywhere with a laptop', 'Free access to global genomics databases'],
          considerations: ['Most biotech firms still require at least a Bachelor degree for primary scientist roles']
        },
        {
          pathType: 'Apprenticeship & Certifications',
          title: 'NIH Summer Internship & University Lab Assistant Programs',
          description: 'Student researcher positions in university or government life science laboratories.',
          duration: 'Summer (8-12 weeks)',
          costLevel: '$',
          pros: ['Stipend often provided', 'Authorship on research papers', 'Direct scientist mentorship'],
          considerations: ['Requires early application (typically winter for summer intake)']
        }
      ],
      beginnerProjects: [
        {
          id: 'proj-bio-1',
          title: 'Decode DNA Sequences with Python on Rosalind.info',
          summary: 'Solve computational genetics challenges such as transcribing DNA to RNA, calculating GC content, and finding motifs.',
          difficulty: 'Beginner',
          estimatedHours: '6-10 hours',
          deliverables: ['Jupyter Notebook with code and explanations', 'Rosalind profile showing completed milestones'],
          toolsNeeded: ['Python 3 / Google Colab (Free in browser)', 'Rosalind.info account'],
          stepByStepGuide: [
            'Create a free Google Colab notebook.',
            'Write a Python script that counts A, C, G, T frequencies in a fasta file.',
            'Solve the first 5 beginner problems on Rosalind.info.'
          ]
        }
      ],
      futureLearningSteps: [
        'Explore Biopython and BLAST genome alignment tools',
        'Learn bash command line and Linux environment for processing fastq files',
        'Study machine learning applications in protein folding (e.g. AlphaFold principles)'
      ],
      roadmap: [
        {
          id: 'rm-bio-1',
          stage: 'Foundation',
          stageNumber: 1,
          title: 'Foundations of Biology & Coding Basics',
          subtitle: 'Understand the central dogma of biology and basic Python',
          description: 'Learn cellular biology basics alongside beginner Python variables, loops, and string manipulations.',
          keyActions: [
            'Take high school biology and chemistry with enthusiasm',
            'Learn Python basics on free platforms like Kaggle Learn or Codecademy',
            'Explore Rosalind.info bioinformatics problem tracks'
          ],
          recommendedResources: [
            { name: 'Rosalind.info', type: 'platform', note: 'Gamified learning for bioinformatics' },
            { name: 'Khan Academy Biology', type: 'free_course', note: 'Clear visual video lessons on genetics' }
          ],
          estimatedDuration: '3-6 Months'
        },
        {
          id: 'rm-bio-2',
          stage: 'Skills',
          stageNumber: 2,
          title: 'Data Science & Statistical Genomics',
          subtitle: 'Learn to manipulate biological big data',
          description: 'Master pandas, matplotlib, and R for analyzing gene expression arrays and ecological datasets.',
          keyActions: [
            'Analyze public COVID-19 or cancer genomics datasets from NCBI',
            'Learn basic statistical tests (t-test, ANOVA, clustering algorithms)',
            'Create data visualizers like heatmaps and volcano plots'
          ],
          recommendedResources: [
            { name: 'NCBI GenBank Database', type: 'platform', note: 'World public repository for genomic sequences' }
          ],
          estimatedDuration: '4-8 Months'
        },
        {
          id: 'rm-bio-3',
          stage: 'Projects',
          stageNumber: 3,
          title: 'Independent Research & Science Fair Projects',
          subtitle: 'Apply computational analysis to an unsolved question',
          description: 'Formulate an original hypothesis comparing genetic variations across species or climate conditions.',
          keyActions: [
            'Submit a computational biology project to a regional science fair or ISEF',
            'Publish your analysis notebook on GitHub with a comprehensive README',
            'Present findings to your high school science department'
          ],
          recommendedResources: [
            { name: 'Google Colab', type: 'tool', note: 'Free cloud computing with GPU support' }
          ],
          estimatedDuration: '6-12 Months'
        },
        {
          id: 'rm-bio-4',
          stage: 'Education',
          stageNumber: 4,
          title: 'Undergraduate Degree in Computational Biology / Biotech',
          subtitle: 'Rigorous coursework and wet-lab + dry-lab synergy',
          description: 'Complete formal coursework in algorithms, organic chemistry, molecular genetics, and linear algebra.',
          keyActions: [
            'Join an undergraduate research laboratory as a research assistant',
            'Present a scientific poster at a student biology conference',
            'Pursue summer REU (Research Experience for Undergraduates) fellowships'
          ],
          recommendedResources: [
            { name: 'NSF REU Programs', type: 'community', note: 'Funded undergraduate summer research' }
          ],
          estimatedDuration: '3-4 Years'
        },
        {
          id: 'rm-bio-5',
          stage: 'Experience',
          stageNumber: 5,
          title: 'Biotech Industry Co-Op or Academic Lab Internship',
          subtitle: 'Work on clinical pipelines or therapeutic discovery',
          description: 'Apply computational pipelines to drug discovery, agricultural genomics, or marine microbiome research.',
          keyActions: [
            'Collaborate with wet-lab scientists to validate computational predictions',
            'Write clean, reproducible workflow pipelines (Nextflow / Snakemake)',
            'Contribute to a peer-reviewed scientific manuscript'
          ],
          recommendedResources: [
            { name: 'BioStars Community', type: 'community', note: 'Q&A forum for computational biologists' }
          ],
          estimatedDuration: '1-2 Years'
        },
        {
          id: 'rm-bio-6',
          stage: 'Career',
          stageNumber: 6,
          title: 'Bioinformatics Scientist / Computational Biologist',
          subtitle: 'Leading data-driven biological breakthroughs',
          description: 'Design algorithmic models for personalized medicine, vaccine targets, or carbon-sequestering algae.',
          keyActions: [
            'Lead genomic data analytics for medical research teams',
            'Evaluate emerging AI foundation models in biology',
            'Advise on ethical handling of patient genetic data'
          ],
          recommendedResources: [
            { name: 'ISCB (International Society for Computational Biology)', type: 'community', note: 'Global professional organization' }
          ],
          estimatedDuration: 'Lifelong Career'
        }
      ],
      dayInTheLife: 'Analyzes next-generation sequencing data on a high-performance compute cluster, writes Python scripts to identify mutations, and meets with lab biologists to plan the next experiment.',
      growthOutlook: 'Very high demand due to rapid cost decreases in genome sequencing and booming biotech industries.',
      transferableStrengths: ['Data hygiene and analytical rigor', 'Cross-disciplinary communication', 'Curiosity for deep scientific mysteries'],
      discussionPointsForCounselor: [
        'Can I take AP/IB Biology and AP Computer Science in parallel?',
        'Does our school have connections with local university research labs for high school summer interns?',
        'What colleges have strong interdisciplinary Bioinformatics or Computational Biology majors?'
      ]
    });
  }

  // Career 3: Sustainable Solutions / Environmental Policy / Renewable Systems
  recommendations.push({
    id: 'career-sustainability-analyst',
    name: 'Sustainable Systems & CleanTech Analyst',
    category: 'Sustainability & Earth Sciences',
    tagline: 'Designing energy transitions, sustainable supply chains, and environmental resilience strategies.',
    matchScore: 89,
    whyItMatches: `Aligns with your desire to make a tangible positive impact on communities and the planet, leveraging your strengths in ${profile.strengths.slice(0, 2).join(' & ')} to create practical eco-friendly solutions.`,
    matchReasons: [
      { factor: 'Values & Mission', studentConnection: 'Addresses urgent environmental challenges with practical systems thinking.' },
      { factor: 'Subject Relevancy', studentConnection: `Builds on ${profile.favoriteSubjects.slice(0, 2).join(', ')}.` },
      { factor: 'Balanced Workstyle', studentConnection: 'Mixes research, data modelling, team collaboration, and field engagement.' }
    ],
    importantSkills: [
      { name: 'Life Cycle Assessment (LCA) & Carbon Accounting', category: 'domain', importance: 'essential' },
      { name: 'Data Analysis & Environmental Modelling', category: 'technical', importance: 'essential' },
      { name: 'Stakeholder Communication & Policy Writing', category: 'human', importance: 'essential' },
      { name: 'Renewable Energy Technologies (Solar, Wind, Storage)', category: 'domain', importance: 'advantageous' }
    ],
    recommendedSubjects: [
      { subject: 'Environmental Science / Geography', reason: 'Gives foundational understanding of Earth systems and climate cycles.', relevanceLevel: 'High' },
      { subject: 'Economics / Social Studies', reason: 'Crucial for understanding policy incentives, carbon markets, and urban development.', relevanceLevel: 'High' },
      { subject: 'Physics / Mathematics', reason: 'Helps calculate energy yields, efficiency metrics, and thermodynamic limits.', relevanceLevel: 'Medium' }
    ],
    possibleEducationPaths: [
      {
        pathType: 'University Degree',
        title: 'B.S. in Environmental Engineering, Sustainability Science, or Energy Policy',
        description: 'Comprehensive degree covering renewable energy systems, urban planning, environmental law, and sustainability economics.',
        duration: '4 Years',
        costLevel: '$$$',
        pros: ['Broad versatility across corporate, municipal, and NGO sectors', 'Strong professional engineering credentials'],
        considerations: ['Requires solid grounding in math and environmental physics']
      },
      {
        pathType: 'Community / Vocational College',
        title: 'Associate Degree in Clean Energy Technology / Solar Systems Management',
        description: 'Practical, fast-track technical degree in installing, auditing, and maintaining clean energy infrastructure.',
        duration: '2 Years',
        costLevel: '$',
        pros: ['Immediate high-demand job placement', 'Very low debt', 'Hands-on hardware & audit training'],
        considerations: ['Focused primarily on technical implementation rather than executive policy']
      },
      {
        pathType: 'Self-Taught & Bootcamps',
        title: 'LEED Green Associate & Carbon Accounting Certifications',
        description: 'Targeted self-paced industry certifications combined with local community environmental audits.',
        duration: '6-12 Months',
        costLevel: '$',
        pros: ['Recognized credentials worldwide', 'Low cost exam fees'],
        considerations: ['Best combined with practical project experience or related degree']
      },
      {
        pathType: 'Apprenticeship & Certifications',
        title: 'AmeriCorps VISTA / Climate Corps Fellowship',
        description: 'Government and nonprofit fellowships embedding youth in regional climate resilience projects.',
        duration: '1 Year',
        costLevel: '$',
        pros: ['Living stipend + education award', 'Direct community leadership experience', 'High resume prestige for public sector'],
        considerations: ['Modest living stipend during service year']
      }
    ],
    beginnerProjects: [
      {
        id: 'proj-sus-1',
        title: 'Conduct a School or Household Energy & Waste Audit',
        summary: 'Measure electricity consumption and waste streams for your school or home, calculating annual carbon footprint and suggesting 3 high-ROI fixes.',
        difficulty: 'Beginner',
        estimatedHours: '6-8 hours',
        deliverables: ['1-page Carbon Audit Infographic', 'Presentation slides with 3 realistic reduction proposals', 'Estimated dollar savings sheet'],
        toolsNeeded: ['Google Sheets / Excel', 'Canva (for infographic)', 'Utility bill receipts (with parent/school permission)'],
        stepByStepGuide: [
          'Log 1 week of electricity, heating, and waste generation numbers.',
          'Use EPA Carbon Footprint Calculator formulas to estimate metric tons of CO2.',
          'Propose 3 feasible changes (e.g. smart thermostats, LED transition, composting system) and calculate payback periods.'
        ]
      }
    ],
    futureLearningSteps: [
      'Learn GIS mapping (QGIS) to visualize geographic climate risk and solar irradiance',
      'Study international standards (GHG Protocol, ISO 14040 for Life Cycle Assessment)',
      'Participate in youth climate summits or city hall environmental task forces'
    ],
    roadmap: [
      {
        id: 'rm-sus-1',
        stage: 'Foundation',
        stageNumber: 1,
        title: 'Ecological Systems & Civic Awareness',
        subtitle: 'Understand global climate dynamics and local community impacts',
        description: 'Explore the basics of ecology, circular economy principles, and renewable energy technologies.',
        keyActions: [
          'Join or launch a high school Environmental Club or Sustainability Committee',
          'Take introductory online modules on climate science from Coursera or edX',
          'Read Project Drawdown climate solution briefs'
        ],
        recommendedResources: [
          { name: 'Project Drawdown', type: 'reading', note: 'Top 100 research-backed climate solutions' },
          { name: 'QGIS (Free Open Source GIS)', type: 'tool', note: 'Spatial map analysis software' }
        ],
        estimatedDuration: '3-6 Months'
      },
      {
        id: 'rm-sus-2',
        stage: 'Skills',
        stageNumber: 2,
        title: 'Carbon Accounting & Spatial Data',
        subtitle: 'Develop quantitative modeling and audit capabilities',
        description: 'Learn to use spreadsheets, Python, or GIS mapping to analyze renewable energy potential and emissions data.',
        keyActions: [
          'Learn QGIS basics to map local tree canopy or solar roof suitability',
          'Study the Greenhouse Gas (GHG) Protocol corporate accounting standard',
          'Volunteer with a local watershed or conservation land trust'
        ],
        recommendedResources: [
          { name: 'GHG Protocol Standards', type: 'reading', note: 'Global framework for emissions accounting' }
        ],
        estimatedDuration: '4-8 Months'
      },
      {
        id: 'rm-sus-3',
        stage: 'Projects',
        stageNumber: 3,
        title: 'Campus / Community Resilience Action',
        subtitle: 'Lead a tangible local initiative with measurable impact',
        description: 'Plan, budget, and implement a school-wide recycling/compost revamp or solar feasibility study.',
        keyActions: [
          'Present a clean energy proposal to your school board or city council',
          'Publish an open-source report analyzing local municipal transit patterns',
          'Compete in student sustainability competitions (e.g. Biomimicry Youth Design Challenge)'
        ],
        recommendedResources: [
          { name: 'Biomimicry Institute', type: 'community', note: 'Nature-inspired design challenges' }
        ],
        estimatedDuration: '6-12 Months'
      },
      {
        id: 'rm-sus-4',
        stage: 'Education',
        stageNumber: 4,
        title: 'University or Technical Specialization',
        subtitle: 'Master policy, clean energy engineering, or circular systems',
        description: 'Pursue your degree in Environmental Management, Sustainability, or Engineering with internship focus.',
        keyActions: [
          'Obtain LEED Green Associate credential during college',
          'Conduct undergraduate research on microgrids, battery storage, or regenerative agriculture',
          'Join Net Impact or student sustainability advisory boards'
        ],
        recommendedResources: [
          { name: 'USGBC LEED Credentials', type: 'platform', note: 'Globally recognized green building standard' }
        ],
        estimatedDuration: '2-4 Years'
      },
      {
        id: 'rm-sus-5',
        stage: 'Experience',
        stageNumber: 5,
        title: 'Sustainability Consulting or Municipal Fellowship',
        subtitle: 'Advise organizations on ESG targets and energy transitions',
        description: 'Work as an analyst in clean energy startups, municipal sustainability offices, or corporate ESG divisions.',
        keyActions: [
          'Conduct comprehensive Life Cycle Assessments (LCA) for consumer products',
          'Model financial payback for commercial solar and geothermal heat pump retrofits',
          'Facilitate public community hearings on climate adaptation'
        ],
        recommendedResources: [
          { name: 'GreenBiz & Trellis Group', type: 'reading', note: 'Leading sustainable business news and jobs' }
        ],
        estimatedDuration: '1-3 Years'
      },
      {
        id: 'rm-sus-6',
        stage: 'Career',
        stageNumber: 6,
        title: 'Senior Sustainability Strategist / CleanTech Director',
        subtitle: 'Spearheading large-scale ecological and industrial transitions',
        description: 'Lead decarbonization strategies for entire cities, utility providers, or global manufacturers.',
        keyActions: [
          'Architect net-zero roadmap milestones and capital deployment',
          'Advise national policymakers on grid modernization regulations',
          'Mentor the next generation of youth climate leaders'
        ],
        recommendedResources: [
          { name: 'International Society of Sustainability Professionals (ISSP)', type: 'community', note: 'Global professional credentialing body' }
        ],
        estimatedDuration: 'Lifelong Impact'
      }
    ],
    dayInTheLife: 'Analyzes energy consumption metrics across building facilities in the morning, tests solar roof irradiance models in GIS during the afternoon, and drafts an executive sustainability policy briefing.',
    growthOutlook: 'Rapid expansion spurred by global climate commitments, green tax incentives, and corporate ESG standards.',
    transferableStrengths: ['Systems-level perspective', 'Financial and ecological quantitative modeling', 'Inspiring public communication'],
    discussionPointsForCounselor: [
      'What environmental science or AP Physics/Statistics classes can I take next year?',
      'Are there scholarship opportunities for students pursuing CleanTech, Agriculture, or Environmental Policy?',
      'Can our school support an internship with the local city planning or conservation department?'
    ]
  });

  // Career 4: Digital Storytelling / Media & Social Impact
  if (hasWriting || !hasTech) {
    recommendations.push({
      id: 'career-multimedia-journalist',
      name: 'Digital Journalist & Media Producer',
      category: 'Media, Law & Society',
      tagline: 'Investigating vital stories, explaining complex world issues, and building community empathy.',
      matchScore: 88,
      whyItMatches: `Capitalizes on your strengths in ${profile.strengths.slice(0, 2).join(' and ')} to research, produce, and broadcast stories that inform the public and spark constructive dialogue.`,
      matchReasons: [
        { factor: 'Communication Strength', studentConnection: 'Directly harnesses your skills in storytelling, research, and active listening.' },
        { factor: 'Subject Passion', studentConnection: `Deep ties to ${profile.favoriteSubjects.slice(0, 2).join(' & ')}.` },
        { factor: 'Dynamic Routine', studentConnection: 'Every week brings new investigations, interviews, and media formats.' }
      ],
      importantSkills: [
        { name: 'Investigative Research & Fact-Checking', category: 'domain', importance: 'essential' },
        { name: 'Compelling Narrative Writing', category: 'human', importance: 'essential' },
        { name: 'Audio/Video Editing (Premiere, Audacity, DaVinci)', category: 'technical', importance: 'essential' },
        { name: 'Interviewing & Active Listening', category: 'human', importance: 'essential' }
      ],
      recommendedSubjects: [
        { subject: 'English Literature & Journalism', reason: 'Builds clarity, conciseness, ethics, and strong narrative structure.', relevanceLevel: 'High' },
        { subject: 'History & Civics', reason: 'Provides historical context and understanding of legal systems.', relevanceLevel: 'High' },
        { subject: 'Digital Media / Audio-Visual Arts', reason: 'Teaches video shooting, mic placement, and timeline editing.', relevanceLevel: 'Medium' }
      ],
      possibleEducationPaths: [
        {
          pathType: 'University Degree',
          title: 'B.A. in Journalism, Media Studies, or Political Science',
          description: '4-year university degree with campus newspaper reporting, broadcast studios, and media law coursework.',
          duration: '4 Years',
          costLevel: '$$$',
          pros: ['Access to campus broadcast studios', 'Alumni networks in major media outlets', 'Rigorous media law & ethics training'],
          considerations: ['Important to build a published portfolio of real work during studies']
        },
        {
          pathType: 'Community / Vocational College',
          title: 'Associate in Digital Communications / Broadcasting',
          description: '2-year hands-on program focused on studio camera work, podcast editing, and digital news writing.',
          duration: '2 Years',
          costLevel: '$',
          pros: ['Very cost efficient', 'Immediate technical studio training', 'Great transfer options'],
          considerations: ['Requires self-starting clips for national internships']
        },
        {
          pathType: 'Self-Taught & Bootcamps',
          title: 'Independent Podcasting & Substack / YouTube Publication',
          description: 'Starting your own investigative local newsletter, audio podcast, or video documentary channel.',
          duration: 'Ongoing',
          costLevel: '$',
          pros: ['100% creative control', 'Proof of real audience engagement', 'Low equipment barrier'],
          considerations: ['Requires persistence to build credibility and reach']
        },
        {
          pathType: 'Apprenticeship & Certifications',
          title: 'NPR / BBC Student Journalism Mentorship & Fellowships',
          description: 'Youth journalism workshops and local newsroom apprentice programs.',
          duration: '3-12 Months',
          costLevel: '$',
          pros: ['Direct bylines under veteran editors', 'Professional newsroom experience'],
          considerations: ['Competitive application process']
        }
      ],
      beginnerProjects: [
        {
          id: 'proj-media-1',
          title: 'Produce a 3-Episode Mini-Podcast on a Local Issue',
          summary: 'Interview 3 different community members (e.g. a local store owner, teacher, student) about a recent change in your town or school.',
          difficulty: 'Beginner',
          estimatedHours: '8-12 hours',
          deliverables: ['3 edited audio episodes (3-5 minutes each)', 'Written show notes and transcript with references'],
          toolsNeeded: ['Smartphone voice recorder', 'Audacity (Free audio editor)', 'Anchor / Spotify for Podcasters (Free)'],
          stepByStepGuide: [
            'Draft 5 thoughtful open-ended interview questions.',
            'Record 15-minute interviews in a quiet room with good acoustics.',
            'Edit the best soundbites into a 4-minute story with an intro and outro musical cue in Audacity.',
            'Publish with an engaging cover graphic.'
          ]
        }
      ],
      futureLearningSteps: [
        'Study FOIA (Freedom of Information Act) and public records requests',
        'Learn data journalism using Google Sheets and interactive charts (Datawrapper)',
        'Master ethical standards in media verification and attribution'
      ],
      roadmap: [
        {
          id: 'rm-med-1',
          stage: 'Foundation',
          stageNumber: 1,
          title: 'Curiosity, Reading & News Literacy',
          subtitle: 'Learn to discern fact from opinion and write with punch',
          description: 'Read quality long-form journalism, learn the inverted pyramid structure, and write weekly opinion/feature articles.',
          keyActions: [
            'Write for your school newspaper, yearbook, or student literary magazine',
            'Read Pulitzer Prize-winning feature articles to study narrative techniques',
            'Practice editing your own paragraphs to cut unnecessary filler words'
          ],
          recommendedResources: [
            { name: 'Poynter News University', type: 'free_course', note: 'Journalism ethics and news literacy' },
            { name: 'Audacity Audio Editor', type: 'tool', note: 'Free multi-track audio recorder' }
          ],
          estimatedDuration: '3-6 Months'
        },
        {
          id: 'rm-med-2',
          stage: 'Skills',
          stageNumber: 2,
          title: 'Multimedia Tools & Investigative Interviewing',
          subtitle: 'Expand from written text to audio, video, and data charts',
          description: 'Master lighting, podcast editing, DSLR/smartphone camera framing, and data visualization.',
          keyActions: [
            'Learn DaVinci Resolve or Adobe Premiere for video editing',
            'Conduct at least 5 structured interviews with people outside your friend group',
            'Learn Datawrapper to make clean charts from public city statistics'
          ],
          recommendedResources: [
            { name: 'Datawrapper.de', type: 'tool', note: 'Free interactive data visualization for journalists' }
          ],
          estimatedDuration: '4-8 Months'
        },
        {
          id: 'rm-med-3',
          stage: 'Projects',
          stageNumber: 3,
          title: 'In-Depth Feature Investigations & Publishing',
          subtitle: 'Publish articles that make a difference in your community',
          description: 'Cover an overlooked community initiative, high school policy change, or local environmental challenge.',
          keyActions: [
            'Pitch and publish a freelance piece or guest op-ed to your local town paper',
            'Launch an investigative student newsletter on Substack',
            'Enter the National Scholastic Press Association (NSPA) journalism contest'
          ],
          recommendedResources: [
            { name: 'Student Press Law Center (SPLC)', type: 'community', note: 'Legal rights and support for student journalists' }
          ],
          estimatedDuration: '6-12 Months'
        },
        {
          id: 'rm-med-4',
          stage: 'Education',
          stageNumber: 4,
          title: 'Journalism Degree or Intensive Newsroom Co-Op',
          subtitle: 'Refine media law, investigative techniques, and ethics',
          description: 'Complete undergraduate studies while serving as an editor or broadcast producer for campus media.',
          keyActions: [
            'Become an editor on the college paper or radio station director',
            'Take courses in Media Law, First Amendment ethics, and International Relations',
            'Apply for summer reporting internships at regional newsrooms'
          ],
          recommendedResources: [
            { name: 'Society of Professional Journalists (SPJ)', type: 'community', note: 'Code of ethics and student resources' }
          ],
          estimatedDuration: '2-4 Years'
        },
        {
          id: 'rm-med-5',
          stage: 'Experience',
          stageNumber: 5,
          title: 'Staff Reporter, Audio Producer, or Video Journalist',
          subtitle: 'Break real stories under daily and weekly deadlines',
          description: 'Work in a fast-paced multimedia newsroom, podcast production studio, or investigative documentary team.',
          keyActions: [
            'Cover daily beats (local government, science, culture, or tech)',
            'Build deep relationships with trusted community sources',
            'Collaborate with visual photojournalists and data analysts on flagship packages'
          ],
          recommendedResources: [
            { name: 'Nieman Journalism Lab', type: 'reading', note: 'Insights on the future of media and news innovation' }
          ],
          estimatedDuration: '1-3 Years'
        },
        {
          id: 'rm-med-6',
          stage: 'Career',
          stageNumber: 6,
          title: 'Senior Correspondent / Documentary Producer / Bureau Chief',
          subtitle: 'Shaping public understanding and mentoring emerging voices',
          description: 'Lead major investigative reporting series, host acclaimed audio series, or manage an entire editorial team.',
          keyActions: [
            'Direct comprehensive investigative reporting projects that hold power to account',
            'Host in-depth documentary series or daily flagship news podcasts',
            'Teach workshops to student reporters and protect press freedoms'
          ],
          recommendedResources: [
            { name: 'Investigative Reporters and Editors (IRE)', type: 'community', note: 'Advanced investigative data and FOIA techniques' }
          ],
          estimatedDuration: 'Lifelong Career'
        }
      ],
      dayInTheLife: 'Monitors wire feeds and source tips in the morning, records an interview with a community advocate before lunch, and edits a narrative audio package and web story for the evening edition.',
      growthOutlook: 'Growing opportunities in specialized digital media, niche newsletters, investigative podcasting, and corporate narrative communications.',
      transferableStrengths: ['Rapid synthesis of complex topics', 'Inquisitive and ethical fact verification', 'High emotional intelligence during interviews'],
      discussionPointsForCounselor: [
        'Does our school have a student newspaper or broadcast club I can join or lead?',
        'What writing and speech competitions can I enter this semester?',
        'Which colleges have top student newsrooms with strong post-grad job placement?'
      ]
    });
  }

  return {
    studentSummary: `Based on your profile as a ${profile.educationLevel} student in ${profile.countryRegion || 'your region'} with favorite subjects in ${profile.favoriteSubjects.slice(0, 3).join(', ')}, you possess a distinctive blend of ${profile.strengths.slice(0, 3).join(', ')}.`,
    identifiedArchetype: hasTech && hasArt ? 'Creative Technologist & Innovator' : hasBio ? 'Curious Scientific Explorer' : 'Strategic Communicator & Problem Solver',
    topStrengthsProfile: profile.strengths.length > 0 ? profile.strengths : ['Curiosity', 'Analytical Problem-Solving', 'Empathy & Communication'],
    guidanceDisclaimer: 'PathPilot AI is an exploratory educational tool designed to spark curiosity and provide personalized learning roadmaps. Career choices are personal and evolving; please discuss these suggestions with your school counselor, teachers, and family.',
    careerRecommendations: recommendations.slice(0, 4),
    generalAdvice: [
      'Focus on building small, fun projects before committing to expensive programs.',
      'Reach out to professionals on LinkedIn or through your school alumni network for a 15-minute informational interview.',
      'Remember that career paths are rarely a straight line—the skills you learn in one area transfer powerfully to others!'
    ]
  };
}
