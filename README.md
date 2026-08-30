# PathPilot AI 🧭
### Personalized Career & Educational Pathway Advisor for Students

PathPilot AI is an interactive, student-centric career guidance platform built with React, TypeScript, Tailwind CSS, Express, and the Google Gemini API (`@google/genai`). It empowers middle school, high school, and college students to explore personalized career trajectories, step-by-step 6-stage educational roadmaps, and actionable beginner-friendly projects—supported by an interactive conversational AI mentor.

---

## 🌟 Key Features

- **Interactive 4-Step Questionnaire**: Guided profiling covering academic level, favorite subjects, personal interests, skills, curiosity areas, and learning preferences without requiring private identifying information.
- **AI-Powered Career Matching**: Dynamic recommendations generating structured career profiles with realistic match alignment, growth outlooks, day-in-the-life overviews, and subject synergies.
- **6-Stage Actionable Roadmaps**: Structured visual milestones across **Foundation**, **Skills**, **Projects**, **Education**, **Experience**, and **Career Entry**, complete with milestone check-offs and printable/downloadable summary reports.
- **Accessible Beginner Projects**: Curated zero-cost or accessible project ideas and free learning resources that students can start immediately.
- **Conversational AI Mentor**: Dedicated contextual chat interface providing supportive educational guidance, interview preparation tips, and suggested exploration questions.
- **Resilient Offline / Demo Mode**: Built-in intelligent fallback generation system that provides high-quality guidance even if no Gemini API key is configured or when offline.
- **Modern Responsive Design**: Accessible, high-contrast UI with dark mode support, smooth animations via Motion, and responsive layout across mobile and desktop.

---

## 🔒 Student Safety, Privacy & AI Disclaimer

> ### ⚠️ Important Educational Guidance Notice
> **All career recommendations, match percentages, and roadmaps provided by PathPilot AI are exploratory suggestions to inspire learning and curiosity.**

PathPilot AI adheres to strict safety, ethical, and privacy standards:

1. **Exploratory Suggestions Only**: Pathways and matches are educational ideas, not guarantees of job placement, academic admission, or financial compensation.
2. **No Future Predictions**: The AI does not claim to know or forecast a student's destiny. Students have the agency to explore, evolve, and change their career interests at any time.
3. **Non-Discriminatory & Unbiased**: PathPilot AI does not make decisions, filter careers, or introduce bias based on sensitive or protected characteristics (such as race, ethnicity, gender, religion, sexual orientation, disability, socioeconomic status, or nationality).
4. **Zero Pressure**: The platform does not pressure students into choosing a specific career path or committing prematurely.
5. **Counselor & Guardian Collaboration**: We strongly encourage students to discuss all generated roadmaps and career ideas with certified school guidance counselors, teachers, and parents/guardians.
6. **Privacy First**: The application does not collect, track, or require personally identifiable information (PII) such as full names, phone numbers, home addresses, or school names.
7. **Secure Architecture**: API keys (`GEMINI_API_KEY`) are kept strictly on the backend server and are **never** exposed to client-side code or browser bundles.

---

## 📁 Project Structure

```text
├── .env.example              # Template for required environment variables
├── .gitignore                # Git ignore rules for node_modules, build artifacts, and secrets
├── index.html                # Main HTML entry point with metadata and fonts
├── metadata.json             # App metadata and platform capabilities
├── package.json              # Project dependencies, scripts, and build configuration
├── server.ts                 # Full-stack Express backend with secure Gemini API integration
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite configuration with Tailwind CSS plugin
└── src/
    ├── main.tsx              # React DOM entry point
    ├── App.tsx               # Main application controller, view router, and theme state
    ├── index.css             # Global Tailwind styling and typography imports
    ├── types.ts              # Global TypeScript interfaces for student profiles, careers, & roadmaps
    ├── components/
    │   ├── Navbar.tsx             # Top navigation bar with theme toggle, reset, and view switching
    │   ├── DisclaimerBanner.tsx   # Persistent student safety and educational guidance notice
    │   ├── LandingView.tsx        # Welcome screen with value props and quick start triggers
    │   ├── QuestionnaireView.tsx  # 4-step interactive profile builder with sample personas
    │   ├── AnalysisLoadingView.tsx# Engaging multi-step AI reasoning animation screen
    │   ├── RecommendationsView.tsx# Career match cards with category filters and comparison mode
    │   ├── CareerDetailView.tsx   # In-depth breakdown with salary, skills, pros/cons, and daily life
    │   ├── RoadmapView.tsx        # Interactive 6-stage roadmap visualizer with progress tracking
    │   └── MentorChatView.tsx     # Real-time conversational AI mentor with safety guardrails
    └── data/
        ├── presets.ts             # Pre-configured student sample profiles for fast exploration
        └── fallbackGenerator.ts  # Intelligent deterministic recommendations generator
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React icons
- **Backend**: Node.js, Express, `esbuild`, `tsx`
- **AI Integration**: Google Gen AI SDK (`@google/genai`) with Gemini models (`gemini-2.5-flash`, `gemini-2.5-pro`)
- **Build Tool**: Vite 6

---

## 🚀 Getting Started (Local Setup)

### 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher, v20+ recommended)
- **npm** (v9+), **yarn**, or **pnpm**

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/pathpilot-ai.git
cd pathpilot-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy the `.env.example` file to create a local `.env` file:

```bash
cp .env.example .env
```

Open `.env` in your text editor and add your Google Gemini API key:

```env
# Optional: Get your API key from Google AI Studio (https://aistudio.google.com/)
GEMINI_API_KEY="your-gemini-api-key-here"
```

*(Note: If no API key is provided, PathPilot AI will automatically run in intelligent fallback mode with curated, realistic recommendations and roadmaps).*

### 5. Run the Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The application will be accessible at:
👉 **`http://localhost:3000`**

---

## 📦 Production Build & Deployment

### Build the Application

To compile the React frontend and bundle the Express backend into `dist/`:

```bash
npm run build
```

### Start the Production Server

```bash
npm start
```

### Type Checking & Linting

To verify TypeScript types and validate syntax:

```bash
npm run lint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
