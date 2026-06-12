import { Brain, Scale, GitCompare, Sparkles } from "lucide-react"

export const mindsetPillars = [
  {
    id: "mindfulness",
    title: "Mindfulness",
    description: "Practices to steady your nervous system before the workload wins.",
    icon: Sparkles,
  },
  {
    id: "decision-tools",
    title: "Decision Tools",
    description: "Interactive prompts for adding, continuing, or letting go of commitments.",
    icon: Brain,
  },
  {
    id: "comparison",
    title: "When Comparison Hits",
    description: "Reframe pre-med culture so someone else's timeline isn't your verdict.",
    icon: GitCompare,
  },
  {
    id: "balance",
    title: "Balance & Sustainability",
    description: "Build a week you can repeat without burning out by junior year.",
    icon: Scale,
  },
] as const

export const comparisonInsights = [
  {
    title: "Comparison is data about them, not about you",
    body: "Someone else's timeline reflects their circumstances, resources, and choices, not a rule you broke. Use their success as proof it's possible, not evidence that you're failing.",
  },
  {
    title: "Compare yourself to last semester",
    body: "The only honest comparison is to where you were before. Are you steadier, more capable, and more clear than you were six months ago? That's the trajectory both you and schools should care about.",
  },
  {
    title: "Curate your inputs",
    body: "If a group chat or feed consistently leaves you anxious, mute it during high-stress stretches. Protecting your focus is not weakness; it's strategy.",
  },
]

export const weeklyRhythmHabits = [
  { id: "sleep", label: "Averaged 7+ hours of sleep most nights" },
  { id: "move", label: "Moved your body intentionally at least twice" },
  { id: "connect", label: "Spent real time with someone outside pre-med" },
  { id: "study", label: "Had focused study blocks without phone multitasking" },
  { id: "pause", label: "Used one mindfulness or reset practice from this guide" },
  { id: "honest", label: "Checked in honestly when stress spiked (weekly check-in or burnout tool)" },
]

export const breathingExercise = {
  title: "Try this before your next study block",
  steps: [
    "Sit with both feet on the floor. Set a 5-minute timer.",
    "Breathe in through your nose for 4 counts.",
    "Hold gently for 1 count.",
    "Exhale slowly for 6 counts.",
    "Repeat. When your mind wanders, name it ('planning,' 'worrying') and return to the breath.",
  ],
}

export const comparisonReframePrompts = [
  {
    prompt: "What's one thing I've built or learned this semester that someone else doesn't have?",
    why: "Shifts focus from what you lack to what's genuinely yours.",
  },
  {
    prompt: "If I removed all comparison from my decision-making, what would I actually do next?",
    why: "Reveals whether your current plan is yours or borrowed from anxiety.",
  },
  {
    prompt: "What does my own version of success look like — not a ranking, not a score, but a life?",
    why: "Reconnects you to your original motivation for medicine.",
  },
]
