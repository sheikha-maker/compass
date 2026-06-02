import { FlaskConical, Stethoscope, Eye, Users, HandHeart, Calendar, BookOpen, GraduationCap } from "lucide-react"

export const pathPillars = [
  {
    id: "experience-tools",
    title: "Experiences",
    description: "Research, clinical, shadowing, leadership, and service without checklist panic.",
    icon: Stethoscope,
  },
  {
    id: "year-compass",
    title: "Year-by-Year",
    description: "What to prioritize each year at Moravian, with sample schedules.",
    icon: Calendar,
  },
  {
    id: "course-guides",
    title: "Course Survival",
    description: "Strategies for the hard prerequisites, plus campus-specific tips.",
    icon: BookOpen,
  },
  {
    id: "mentorship",
    title: "Peers & Mentorship",
    description: "Relationships that protect your GPA and your sanity.",
    icon: GraduationCap,
  },
] as const

export const experienceTypeCards = [
  { id: "research", title: "Research", icon: FlaskConical, color: "bg-violet-500/15 text-violet-700 dark:text-violet-300" },
  { id: "clinical", title: "Clinical", icon: Stethoscope, color: "bg-blue-500/15 text-blue-700 dark:text-blue-300" },
  { id: "shadowing", title: "Shadowing", icon: Eye, color: "bg-teal-500/15 text-teal-700 dark:text-teal-300" },
  { id: "leadership", title: "Leadership", icon: Users, color: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  { id: "service", title: "Service", icon: HandHeart, color: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
] as const

export const pathDepthChecklistItems = [
  { id: "depth-one", label: "At least one experience I've stayed with for 6+ months" },
  { id: "depth-reflect", label: "I can explain what I learned, not just what I did" },
  { id: "depth-gpa", label: "My GPA trend is stable or improving" },
  { id: "depth-advisor", label: "I've met with my pre-health advisor this semester" },
  { id: "depth-prereq", label: "I know which prerequisites I still need (see Prereq Tracker)" },
  { id: "depth-story", label: "I can name one moment that confirmed medicine still fits for me" },
]
