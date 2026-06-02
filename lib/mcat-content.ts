import type { McatSectionId } from "./mcat"

export const mcatPhasesEnhanced = [
  {
    id: "content" as const,
    phase: "Phase 1 — Content review",
    duration: "Roughly the first third of your prep",
    detail:
      "Rebuild your foundation across all subjects. Don't just re-read — turn each topic into active recall and flashcards. The goal is recognition turning into retrieval.",
    tasks: [
      "Finish one pass of high-yield content per section (see topic lists below).",
      "Use Anki or similar for daily recall — 30–45 min/day minimum.",
      "End each week with 20–30 mixed questions to find gaps, not to 'grade' yourself.",
    ],
    mistakes: [
      "Re-reading textbooks without testing yourself.",
      "Skipping CARS because it feels vague — start daily passages early.",
      "Cramming P/S only at the end — it's memorization-heavy and rewards consistency.",
    ],
    weeklyHours: "15–20 hrs/week",
  },
  {
    id: "practice" as const,
    phase: "Phase 2 — Practice & application",
    duration: "The middle stretch",
    detail:
      "Shift to practice passages and question banks. The MCAT tests reasoning, not memorization. Review every wrong answer deeply enough to explain why each option is right or wrong.",
    tasks: [
      "Timed passages daily (especially CARS).",
      "Maintain an error log: question type, why you missed it, rule to remember.",
      "Introduce AAMC Section Banks before full-lengths.",
    ],
    mistakes: [
      "Doing hundreds of questions without reviewing misses.",
      "Avoiding timed practice until 'ready' — timing is a skill.",
      "Neglecting weak sections because they feel uncomfortable.",
    ],
    weeklyHours: "20–25 hrs/week",
  },
  {
    id: "full-length" as const,
    phase: "Phase 3 — Full-length tests",
    duration: "The final stretch",
    detail:
      "Take full-length exams under real conditions to build stamina and timing. Your review of each test matters more than the test itself. Track patterns in your mistakes.",
    tasks: [
      "AAMC full-lengths spaced with 3–5 days between for review.",
      "Simulate test-day routine: wake time, breaks, lunch.",
      "Adjust final week: lighter content, sleep, confidence — not new material.",
    ],
    mistakes: [
      "Taking FLs back-to-back without reviewing.",
      "Panicking over one bad score instead of analyzing trends.",
      "Cramming new content in the last 7 days.",
    ],
    weeklyHours: "25–30 hrs/week (includes FL + review days)",
  },
]

export const mcatSectionTopics: {
  sectionId: McatSectionId
  title: string
  topics: string[]
  tip: string
}[] = [
  {
    sectionId: "cp",
    title: "C/P high-yield topics",
    topics: [
      "Acid–base, buffers, titrations",
      "Electrochemistry & redox",
      "Thermodynamics, kinetics, equilibrium",
      "Fluids, circuits, optics, forces",
      "Amino acids, enzymes, metabolism overview",
      "Lab techniques & experimental design",
    ],
    tip: "Moravian's gen chem / orgo / physics sequence maps directly here — use course exams as checkpoint quizzes.",
  },
  {
    sectionId: "cars",
    title: "CARS strategies",
    topics: [
      "Daily timed passages (1–2/day minimum in Phase 2)",
      "Main idea vs. author's tone vs. inference",
      "Passage mapping — don't over-highlight",
      "Question-type review: strengthen/weaken, inference, tone",
      "Pacing: ~9 min/passage including questions",
    ],
    tip: "CARS improvement is slow but steady. Start before you feel 'ready' — there is no content to memorize.",
  },
  {
    sectionId: "bb",
    title: "B/B high-yield topics",
    topics: [
      "Amino acids, proteins, enzyme kinetics",
      "Central metabolism pathways (glycolysis, TCA, ETC)",
      "Molecular biology: replication, transcription, translation",
      "Organ systems: cardio, renal, endocrine, immune",
      "Genetics & inheritance patterns",
      "Research passages & data interpretation",
    ],
    tip: "Biochem at Moravian is high-yield — treat it as MCAT preview, not just a grade.",
  },
  {
    sectionId: "ps",
    title: "P/S high-yield topics",
    topics: [
      "Research methods & study design",
      "Learning, memory, cognition",
      "Social stratification, inequality, demographics",
      "Identity, prejudice, discrimination",
      "Stress, emotion, psychological disorders (DSM concepts)",
      "Sociological theories & institutions",
    ],
    tip: "Psych + Soc courses cover much of this section — connect lecture terms to MCAT-style scenarios.",
  },
]

export const mcatResources = [
  {
    name: "AAMC official materials",
    type: "Essential",
    bestFor: "Full-lengths, section banks, official practice",
    note: "The only source that mirrors real exam construction. Budget for these first.",
    href: "https://students-residents.aamc.org/taking-mcat-exam/practice-materials",
  },
  {
    name: "UWorld",
    type: "Question bank",
    bestFor: "Phase 2 — detailed explanations, passage practice",
    note: "Strong for C/P and B/B; pair with error log discipline.",
    href: "https://www.uworld.com",
  },
  {
    name: "Khan Academy",
    type: "Free content",
    bestFor: "Phase 1 — content gaps, P/S foundations",
    note: "Free AAMC-partnered videos; great supplement, not a full plan alone.",
    href: "https://www.khanacademy.org/test-prep/mcat",
  },
  {
    name: "Anki (MCAT decks)",
    type: "Flashcards",
    bestFor: "Daily active recall across all sections",
    note: "Use a reputable deck; don't collect cards without reviewing daily.",
    href: "https://apps.ankiweb.net",
  },
  {
    name: "Jack Westin",
    type: "Free / paid",
    bestFor: "CARS daily passages",
    note: "Useful for CARS habit; still prioritize AAMC CARS materials later.",
    href: "https://jackwestin.com",
  },
  {
    name: "AAMC Fee Assistance Program",
    type: "Financial aid",
    bestFor: "Registration + study bundle costs",
    note: "Apply early if eligible — covers MCAT fees and official prep materials.",
    href: "https://students-residents.aamc.org/fee-assistance-program",
  },
]

export const mcatReadinessItems = [
  { id: "fl-count", label: "Completed at least 3 AAMC full-length exams under timed conditions" },
  { id: "fl-review", label: "Reviewed every missed question with written explanations" },
  { id: "score-trend", label: "Last 2 FL scores are within ~3 points of your goal score" },
  { id: "cars-pace", label: "CARS timing feels manageable (not rushing the last passage daily)" },
  { id: "gpa-stable", label: "GPA is stable during prep — not sacrificing semesters for cramming" },
  { id: "sleep", label: "Sleeping 7+ hours most nights in the final month" },
  { id: "burnout", label: "Burnout check feels manageable — not dreading every study block" },
  { id: "advisor", label: "Discussed test date and score goals with pre-health advisor" },
]

export const mcatTruths = [
  "It's a marathon, not a sprint — plan months, not weeks.",
  "Your practice-test review is worth more than the raw number of hours studied.",
  "Protect your GPA while studying; a balanced applicant beats a lopsided one.",
  "Rest days are part of the plan, not a betrayal of it. Burnout lowers scores.",
  "A 510+ is competitive for many MD programs; 500+ for DO. Use MSAR for your target schools — fit matters.",
  "Retaking is common and not a red flag when you show meaningful improvement and reflection.",
]
