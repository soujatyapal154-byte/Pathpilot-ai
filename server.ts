import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { generateFallbackAnalysis } from "./src/data/fallbackGenerator.js";
import { StudentProfile } from "./src/types.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Available production Gemini models in order of priority
const CANDIDATE_GEMINI_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.7-flash",
];

async function executeGeminiWithFallback(
  ai: GoogleGenAI,
  requestConfig: Omit<Parameters<typeof ai.models.generateContent>[0], "model">
) {
  let lastError: any = null;

  for (const model of CANDIDATE_GEMINI_MODELS) {
    try {
      console.log(`[Gemini API] Attempting generateContent with model: ${model}`);
      const response = await ai.models.generateContent({
        ...requestConfig,
        model,
      });

      const text = response.text?.trim();
      if (text) {
        console.log(`[Gemini API] Successfully received response from ${model} (${text.length} chars)`);
        return { response, text, modelUsed: model };
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      console.warn(`[Gemini API] Model ${model} failed with: ${errMsg.substring(0, 150)}`);
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini models failed to generate a response.");
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Profile Analysis endpoint
app.post("/api/analyze-profile", async (req: Request, res: Response) => {
  try {
    const profile: StudentProfile = req.body.profile;

    if (!profile || !profile.educationLevel) {
      res.status(400).json({ error: "Invalid profile data provided." });
      return;
    }

    const ai = getGenAI();

    // If no API key is set, return rich fallback immediately
    if (!ai) {
      console.log("No GEMINI_API_KEY configured. Utilizing built-in intelligent fallback generator.");
      const fallbackResult = generateFallbackAnalysis(profile);
      res.json({
        ...fallbackResult,
        source: "local-advisor",
      });
      return;
    }

    const prompt = `
You are PathPilot AI, a personalized, supportive, and compassionate educational & career advisor for students.
Analyze this student's profile and generate 3 to 4 distinct, highly personalized, realistic career recommendations and actionable 6-stage roadmaps.

STUDENT PROFILE (Anonymized & General):
- Current Education Level: ${profile.educationLevel}
- Age Group: ${profile.ageGroup || "Not specified"}
- Region/Context: ${profile.countryRegion || "Global"}
- Favorite Academic Subjects: ${profile.favoriteSubjects.join(", ") || "General curiosity"}
- Key Interests: ${profile.interests.join(", ") || "Exploring diverse topics"}
- Current Skills: ${profile.skills.join(", ") || "General learning capabilities"}
- Natural Strengths: ${profile.strengths.join(", ") || "Adaptability and willingness to learn"}
- Activities Enjoyed: ${profile.activitiesEnjoyed.join(", ") || "Hands-on projects"}
- Activities Disliked / Avoided: ${profile.activitiesDisliked.join(", ") || "Repetitive routine without purpose"}
- Careers Curious About: ${profile.curiousCareers.join(", ") || "Open to suggestions"}
- Preferred Learning Style: ${profile.learningStyle}
- Budget / Education Preference: ${profile.budgetPreference}
- Student Notes (Interests/Preferences): ${profile.additionalNotes || "None"}

CRITICAL SAFETY, PRIVACY & ETHICAL GUIDANCE DIRECTIVES:
1. RECOMMENDATIONS ARE SUGGESTIONS ONLY: All career matches, roadmaps, and insights are exploratory suggestions to spark curiosity—never guarantees or requirements.
2. NO GUARANTEES OF SUCCESS: You must NEVER state, imply, or promise career success, job placement, earnings, or university admissions.
3. NEVER CLAIM TO KNOW OR PREDICT THE STUDENT'S FUTURE: You do not know or forecast a student's destiny. Frame all pathways as open, evolving possibilities that the student actively explores and shapes.
4. NO DECISIONS ON SENSITIVE CHARACTERISTICS: You must NEVER make decisions, filter careers, or introduce bias based on sensitive or protected characteristics (such as race, ethnicity, gender, religion, sexual orientation, disability, socioeconomic status, or national origin). Maintain an equitable, inclusive, and growth-oriented perspective for all students.
5. ZERO PRESSURE: NEVER pressure students into choosing a career or committing to a single pathway prematurely. Validate that changing minds, exploring varied interests, and taking time to learn is normal and encouraged.
6. COLLABORATE WITH COUNSELORS & PARENTS: Explicitly encourage students to discuss their thoughts and plans with school guidance counselors, teachers, and parents/guardians.
7. STUDENT PRIVACY: Respect privacy; treat all inputs as exploratory educational attributes without attempting to identify the student.
8. ACCESSIBLE BEGINNER PROJECTS & ROADMAPS: Provide zero-cost or accessible beginner projects and a clear 6-stage roadmap (Foundation, Skills, Projects, Education, Experience, Career).

Return your response strictly as valid JSON matching the schema.
`;

    try {
      const { text, modelUsed } = await executeGeminiWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction: `You are PathPilot AI, a supportive, unbiased, and ethical student career advisor. Career recommendations are purely exploratory suggestions, not guarantees or predictions of the future. Never pressure students into a career. Never discriminate or make assumptions based on sensitive characteristics. Always encourage students to consult school counselors and trusted guardians. Respond strictly in valid structured JSON.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              studentSummary: { type: Type.STRING, description: "Empathetic 2-sentence summary of the student's unique profile" },
              identifiedArchetype: { type: Type.STRING, description: "Inspiring title for student persona, e.g. Creative Technologist" },
              topStrengthsProfile: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 key student strengths" },
              guidanceDisclaimer: { type: Type.STRING, description: "Reminder that this is an educational exploration tool to discuss with counselors" },
              careerRecommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    tagline: { type: Type.STRING },
                    matchScore: { type: Type.INTEGER },
                    whyItMatches: { type: Type.STRING },
                    matchReasons: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          factor: { type: Type.STRING },
                          studentConnection: { type: Type.STRING },
                        },
                        required: ["factor", "studentConnection"],
                      },
                    },
                    importantSkills: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          category: { type: Type.STRING },
                          importance: { type: Type.STRING },
                          description: { type: Type.STRING },
                        },
                        required: ["name", "category", "importance"],
                      },
                    },
                    recommendedSubjects: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          subject: { type: Type.STRING },
                          reason: { type: Type.STRING },
                          relevanceLevel: { type: Type.STRING },
                        },
                        required: ["subject", "reason", "relevanceLevel"],
                      },
                    },
                    possibleEducationPaths: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          pathType: { type: Type.STRING },
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          duration: { type: Type.STRING },
                          costLevel: { type: Type.STRING },
                          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                          considerations: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ["pathType", "title", "description", "duration", "costLevel", "pros", "considerations"],
                      },
                    },
                    beginnerProjects: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          title: { type: Type.STRING },
                          summary: { type: Type.STRING },
                          difficulty: { type: Type.STRING },
                          estimatedHours: { type: Type.STRING },
                          deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
                          toolsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
                          stepByStepGuide: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ["id", "title", "summary", "difficulty", "deliverables", "toolsNeeded", "stepByStepGuide"],
                      },
                    },
                    futureLearningSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    roadmap: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          stage: { type: Type.STRING },
                          stageNumber: { type: Type.INTEGER },
                          title: { type: Type.STRING },
                          subtitle: { type: Type.STRING },
                          description: { type: Type.STRING },
                          keyActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                          recommendedResources: {
                            type: Type.ARRAY,
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                name: { type: Type.STRING },
                                type: { type: Type.STRING },
                                note: { type: Type.STRING },
                              },
                              required: ["name", "type", "note"],
                            },
                          },
                          estimatedDuration: { type: Type.STRING },
                        },
                        required: ["id", "stage", "stageNumber", "title", "subtitle", "description", "keyActions", "recommendedResources", "estimatedDuration"],
                      },
                    },
                    dayInTheLife: { type: Type.STRING },
                    growthOutlook: { type: Type.STRING },
                    transferableStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    discussionPointsForCounselor: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: [
                    "id", "name", "category", "tagline", "matchScore", "whyItMatches",
                    "importantSkills", "recommendedSubjects", "possibleEducationPaths",
                    "beginnerProjects", "futureLearningSteps", "roadmap", "dayInTheLife",
                    "growthOutlook", "transferableStrengths", "discussionPointsForCounselor"
                  ],
                },
              },
              generalAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              "studentSummary", "identifiedArchetype", "topStrengthsProfile",
              "guidanceDisclaimer", "careerRecommendations", "generalAdvice"
            ],
          },
        },
      });

      const parsed = JSON.parse(text);
      res.json({
        ...parsed,
        source: modelUsed,
      });
    } catch (geminiError: any) {
      console.warn("[Gemini Analysis Error] Failed to generate AI analysis:", geminiError?.message || geminiError);
      const fallbackResult = generateFallbackAnalysis(profile);
      res.json({
        ...fallbackResult,
        source: "local-advisor-fallback",
        warning: "AI couldn't respond right now. Loaded verified curriculum guidelines.",
      });
    }
  } catch (error) {
    console.error("Error in /api/analyze-profile:", error);
    res.status(500).json({ error: "AI couldn't respond right now. Please try again." });
  }
});

// Mentor Chatbot endpoint
app.post("/api/mentor-chat", async (req: Request, res: Response) => {
  try {
    const { messages, studentProfile, currentCareer } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages history is required." });
      return;
    }

    const ai = getGenAI();

    // Prepare system instructions with safety rules
    const systemInstruction = `
You are the PathPilot AI Career Mentor, a friendly, encouraging, thoughtful, and pragmatic academic guide for students.
You help students explore career ideas, choose school subjects, build beginner projects, understand degree vs alternative pathways, and gain confidence.

STUDENT PROFILE CONTEXT:
${studentProfile ? `
- Education Level: ${studentProfile.educationLevel || "Student"}
- Region/Context: ${studentProfile.countryRegion || "Global"}
- Favorite Subjects: ${(studentProfile.favoriteSubjects || []).join(", ")}
- Interests: ${(studentProfile.interests || []).join(", ")}
- Learning Style: ${studentProfile.learningStyle || "Interactive"}
` : "General student explorer"}

CURRENT CAREER IN FOCUS:
${currentCareer ? `
- Career Name: ${currentCareer.name} (${currentCareer.category})
- Tagline: ${currentCareer.tagline}
- Why matched: ${currentCareer.whyItMatches}
` : "General career exploration"}

MANDATORY SAFETY, PRIVACY & COUNSELING DIRECTIVES:
1. SUGGESTIONS ONLY: Frame all advice as exploratory possibilities, ideas, and suggestions—never as definitive commands or guarantees.
2. NO SUCCESS GUARANTEES: Never state or imply that any degree, job, or salary is guaranteed.
3. NEVER CLAIM TO PREDICT THE FUTURE: Never claim to know the student's destiny or future. Emphasize that their path is open and shaped by their own experiences.
4. NO BIAS ON SENSITIVE CHARACTERISTICS: Never base recommendations or judgment on sensitive or protected characteristics (race, gender, religion, sexual orientation, disability, socioeconomic status, or national origin).
5. ZERO PRESSURE: Never pressure the student to commit to a field. Validate that exploring diverse interests and changing their mind is healthy and normal.
6. STUDENT PRIVACY: Do not ask for, collect, or store personal identifying details (e.g. full names, phone numbers, home addresses, or school names).
7. COLLABORATION WITH TRUSTED ADULTS: Consistently encourage students to discuss their educational choices with school counselors, teachers, and parents/guardians.
8. ACTIONABLE & ACCESSIBLE: Recommend accessible, low-barrier, or free learning opportunities and projects.
9. Provide 2-3 short, relevant follow-up questions or prompt ideas for the student at the end.
`;

    if (!ai) {
      // Local intelligent response fallback when no API key configured
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      let answer = `That is a great question! `;

      if (lastUserMsg.toLowerCase().includes("subject") || lastUserMsg.toLowerCase().includes("class")) {
        answer += `To prepare well for ${currentCareer?.name || "your desired field"}, focus on building both core foundational classes and hands-on electives. Ask your school guidance counselor if advanced courses (like AP/IB, Dual Enrollment, or vocational labs) are available. You don't have to be perfect at every subject—curiosity and consistent practice matter far more!`;
      } else if (lastUserMsg.toLowerCase().includes("project") || lastUserMsg.toLowerCase().includes("start")) {
        answer += `The best way to start is with a weekend micro-project! Pick a small, real problem around you—like designing a prototype app for a school club or writing an article explaining a topic you love. Having 1-2 real projects in your portfolio speaks louder than just test scores.`;
      } else if (lastUserMsg.toLowerCase().includes("parent") || lastUserMsg.toLowerCase().includes("talk")) {
        answer += `Talking to parents or guardians about career interests is a great step! Try showing them the Roadmap view and explain *why* this path excites you and how it connects to your favorite subjects. Remember to invite them into the conversation by asking for their perspectives.`;
      } else {
        answer += `Exploring ${currentCareer?.name || "new pathways"} is an exciting journey of discovery. Focus on experimenting with low-cost resources, connecting with mentors, and keeping an open mind. Be sure to check in with your school counselor to align your upcoming class schedule with your goals!`;
      }

      res.json({
        reply: answer,
        suggestedPrompts: [
          `What beginner projects should I start this month?`,
          `How can I explain this career path to my parents?`,
          `What free certifications or courses do you recommend?`
        ],
        source: "local-mentor",
      });
      return;
    }

    // Format conversation history for Gemini
    const lastUserMessage = messages[messages.length - 1]?.text || "Hello";
    const historyContext = messages.slice(0, -1).map((m: any) => `${m.sender === "user" ? "Student" : "PathPilot Mentor"}: ${m.text}`).join("\n");

    const prompt = `
${historyContext ? `Conversation History:\n${historyContext}\n` : ""}
Student Question: ${lastUserMessage}

Please provide an encouraging, helpful response following all safety and educational guidelines. At the end, propose 2-3 relevant follow-up question chips the student might want to ask next.
`;

    try {
      const { text, modelUsed } = await executeGeminiWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: "Helpful, friendly mentor advice for the student" },
              suggestedPrompts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2 to 3 concise follow-up prompt suggestions"
              }
            },
            required: ["reply", "suggestedPrompts"]
          }
        }
      });

      const parsed = JSON.parse(text);
      res.json({
        ...parsed,
        source: modelUsed,
      });
    } catch (mentorErr: any) {
      console.error("[Gemini Mentor Error] Failed to generate mentor response:", mentorErr?.message || mentorErr);
      res.status(500).json({
        error: "AI couldn't respond right now. Please try again.",
        reply: "AI couldn't respond right now. Please try again.",
        suggestedPrompts: [
          "What high school classes help prepare for this?",
          "What are some zero-cost beginner project ideas?",
          "How do I find a mentor in this field?"
        ],
        source: "error-fallback"
      });
    }
  } catch (error) {
    console.error("Error in /api/mentor-chat:", error);
    res.status(500).json({
      error: "AI couldn't respond right now. Please try again.",
      reply: "AI couldn't respond right now. Please try again.",
      suggestedPrompts: [
        "What high school classes help prepare for this?",
        "What are some zero-cost beginner project ideas?"
      ]
    });
  }
});

// Vite & Static Asset Handling
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PathPilot AI Server running on port ${PORT}`);
  });
}

start();
