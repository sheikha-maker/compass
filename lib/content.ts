export const lastReviewed = "Summer 2026"

export type NavItem = {
  id: string
  label: string
  group: string
}

export type ExperienceTool = {
  id: string
  title: string
  body: string
  tips: string[]
  moravianHighlight?: {
    title: string
    description: string
    actionItem: string
  }
}

export type YearCompassItem = {
  year: string
  theme: string
  focus: string[]
  avoid: string
  sampleSchedule?: {
    fall: string[]
    spring: string[]
    tips: string
  }
}

export type CourseGuide = {
  course: string
  strategy: string
  survival: string
  moravianTips?: string[]
}

export type UsefulLink = {
  label: string
  href: string
  desc: string
  category: string
}

export const navItems: NavItem[] = [
  { id: "welcome", label: "Welcome", group: "Start" },
  { id: "start-here", label: "How to Use This Guide", group: "Start" },
  { id: "mindfulness", label: "Mindfulness", group: "Mindset" },
  { id: "decision-tools", label: "Decision Tools", group: "Mindset" },
  { id: "comparison", label: "When Comparison Hits", group: "Mindset" },
  { id: "balance", label: "Balance & Sustainability", group: "Mindset" },
  { id: "experience-tools", label: "Experience-Specific Tools", group: "Building Your Path" },
  { id: "year-compass", label: "Year-by-Year Compass", group: "Building Your Path" },
  { id: "course-guides", label: "Course Survival Guides", group: "Building Your Path" },
  { id: "mentorship", label: "Peers & Mentorship", group: "Building Your Path" },
  { id: "mcat", label: "MCAT Deep Dive", group: "The Big Milestones" },
  { id: "timeline", label: "Application Timeline", group: "The Big Milestones" },
  { id: "faq", label: "Pre-Med FAQ", group: "The Big Milestones" },
  { id: "course-planner", label: "Course Planner", group: "Your Tools" },
  { id: "activity-logs", label: "Activity Logs", group: "Your Tools" },
  { id: "wellness-checkin", label: "Weekly Check-in", group: "Your Tools" },
  { id: "burnout-check", label: "Burnout Check", group: "Your Tools" },
  { id: "resources", label: "Resources & Contribute", group: "Your Tools" },
]

export const navGroups = [
  "Start",
  "Mindset",
  "Building Your Path",
  "The Big Milestones",
  "Your Tools",
]

export const startPaths = [
  {
    situation: "You're a freshman or just starting out",
    action: "Go to the Year-by-Year Compass (Freshman Year) and Balance & Sustainability. Ignore everything else for now.",
    targets: ["year-compass", "balance"],
  },
  {
    situation: "You're feeling overwhelmed",
    action: "Start with Mindfulness and Decision Tools, then check your stress with the Weekly Check-in or Burnout Check.",
    targets: ["mindfulness", "decision-tools", "wellness-checkin", "burnout-check"],
  },
  {
    situation: "You're planning your path",
    action: "Go to your year in the Year-by-Year Compass, then Experience-Specific Tools.",
    targets: ["year-compass", "experience-tools"],
  },
  {
    situation: "You're thinking about the MCAT or applications",
    action: "Go to the MCAT Deep Dive and the Application Timeline.",
    targets: ["mcat", "timeline"],
  },
]

export const mindfulnessPractices = [
  {
    title: "Name the feeling, not the failure",
    body: "When a grade or a setback hits, your brain jumps to identity: \"I'm not good enough for this.\" Pause and rename it as a feeling instead: \"I feel disappointed right now.\" Feelings pass. Identity statements stick and quietly steer your decisions for months.",
  },
  {
    title: "The 5-minute reset",
    body: "Before you start studying, sit for five minutes with no phone. Breathe in for four counts, out for six. You are not wasting time. You're telling your nervous system it's safe to focus, which is the difference between three productive hours and six anxious ones.",
  },
  {
    title: "Protect one non-negotiable",
    body: "Pick one thing that is yours and not pre-med: a sport, a friend group, a faith practice, a hobby. When the semester gets loud, this is the last thing you cut, not the first. It's what keeps you a person and not just an applicant.",
  },
  {
    title: "Permission to be a beginner",
    body: "You are allowed to not understand something yet. \"Yet\" is the whole job of being a student. Confusion is not evidence you don't belong; it's evidence you're learning at the edge of what you know.",
  },
]

export const decisionTools = [
  {
    number: 1,
    title: "Should I add this commitment?",
    intro: "Use this before saying yes to a new club, lab, job, or role.",
    questions: [
      "Does this move me toward something I actually care about, or am I doing it because it 'looks good'?",
      "Do I have the hours, honestly, without stealing them from sleep or coursework?",
      "Will I still want to be doing this in three months, or am I excited only by the idea of it?",
      "If a friend described this exact schedule to me, would I tell them it's sustainable?",
    ],
    guidance:
      "If you answered no to two or more, it's a pass, or a 'not right now.' One meaningful commitment you stay with beats five you abandon.",
  },
  {
    number: 2,
    title: "Should I continue this commitment?",
    intro: "Use this when something you're already doing has started to feel heavy.",
    questions: [
      "Is the heaviness temporary (a busy stretch) or structural (it's just too much)?",
      "Am I still learning or contributing, or am I just maintaining a line on a resume?",
      "Has this started to harm my grades, sleep, or relationships consistently?",
      "Would leaving free up energy for something that matters more right now?",
    ],
    guidance:
      "Quitting something that no longer serves you is not failure, it's editing. Admissions committees value depth and growth, not a graveyard of half-commitments.",
  },
  {
    number: 3,
    title: "Should I delete this commitment? (the overwhelm tool)",
    intro: "Use this when you're underwater and everything feels urgent.",
    questions: [
      "If I could only keep three commitments this month, which three are they?",
      "What is the actual worst case if I step back from the rest, and is it survivable?",
      "Which commitment is costing me the most peace for the least return?",
      "Am I holding onto this out of value, or out of fear of what people will think?",
    ],
    guidance:
      "When you're overwhelmed, the goal isn't optimization, it's relief. Cut to the three that matter. You can always add back later from a calmer place.",
  },
]

export const experienceTools = [
  {
    id: "research",
    title: 'Research: "Should I Start Now?"',
    body: "Research is valuable, but it is not a box to check in your first month. Start when you have a stable GPA and genuine curiosity about a question. Quality time in one lab over a year teaches you (and shows schools) more than rotating through three. If you're a freshman drowning in adjustment, research can wait, and waiting is a legitimate strategy, not falling behind.",
    tips: [
      "Email professors whose work you've actually read, and say one specific thing about it.",
      "It's okay to start with lab tasks; understanding comes with time.",
      "One strong, lasting research relationship beats several shallow ones.",
    ],
  },
  {
    id: "clinical",
    title: "Clinical Experience",
    body: "Clinical experience is about being near patients and confirming you actually want this life, not just the idea of it. Scribing, EMT work, CNA roles, hospice volunteering, and medical assisting all count. What matters is sustained, direct exposure to patient care and your reflection on it.",
    tips: [
      "Aim for consistency over a big number of one-time events.",
      "Keep short notes after shifts, they become your application reflections.",
      "Paid clinical roles count just as much as volunteer ones.",
    ],
    moravianHighlight: {
      title: "St. Luke's Observership Program",
      description: "Moravian students have access to the St. Luke's University Health Network observership program. This is a structured way to gain clinical exposure in a real hospital setting. Talk to your pre-health advisor about how to apply, spots can be competitive, so plan ahead.",
      actionItem: "Reach out to Career & Civic Engagement or your pre-health advisor for the current application timeline."
    }
  },
  {
    id: "shadowing",
    title: "Shadowing",
    body: "Shadowing answers a narrow but crucial question: do you understand what a physician's day actually looks like? You don't need hundreds of hours. You need enough across a few specialties (ideally including primary care) to speak honestly about why medicine, not just healthcare.",
    tips: [
      "Shadow a few different specialties, including at least one primary care.",
      "Ask physicians what they'd tell their pre-med selves.",
      "40–50 thoughtful hours is plenty for most applications.",
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    body: "Leadership isn't a title, it's responsibility someone trusted you with. Running a study group, captaining a team, coordinating volunteers, or mentoring younger students all count. Schools care about what changed because you were there, not the name of your position.",
    tips: [
      "Choose initiatives you'd care about even with no title attached.",
      "Track concrete outcomes: what existed or improved because of you.",
      "Depth in one role beats a list of nominal positions.",
    ],
  },
  {
    id: "service",
    title: "Service & Volunteering (Non-Clinical)",
    body: "Non-clinical service shows who you are when no patient and no application is watching. Tutoring, food banks, community organizing, and mentorship all demonstrate that service is a habit, not a sprint before applying. Pick something connected to a community you genuinely care about.",
    tips: [
      "Consistency over months reads as authentic; a final-year sprint doesn't.",
      "Non-clinical service is its own category, don't skip it.",
      "Let it connect to a cause that's real for you.",
    ],
  },
]

export const yearCompass = [
  {
    year: "Freshman Year",
    theme: "Adjust. Build habits. Protect your GPA.",
    focus: [
      "Prioritize adjusting to college and building strong study systems above all else.",
      "Get to know your pre-med advisor early, before you 'need' anything.",
      "Explore one or two clubs that genuinely interest you. Don't over-commit.",
      "Start light, occasional volunteering if you have the bandwidth, no pressure.",
    ],
    avoid: "Don't compare your start to upperclassmen who are years ahead. You are not behind.",
    sampleSchedule: {
      fall: ["General Chemistry I", "Calculus I or Statistics", "First-Year Writing", "Elective/Gen Ed"],
      spring: ["General Chemistry II", "Calculus II or Elective", "Intro Biology I", "Gen Ed"],
      tips: "Keep it at 14-16 credits. Your GPA foundation matters more than speed."
    }
  },
  {
    year: "Sophomore Year",
    theme: "Deepen. Start exploring experiences.",
    focus: [
      "Continue strong academics through the harder prerequisite courses.",
      "Begin clinical exposure or shadowing if you feel ready and stable.",
      "Consider reaching out for a research position if a topic genuinely excites you.",
      "Deepen one or two commitments instead of adding many new ones.",
    ],
    avoid: "Don't pile on activities out of panic. Depth is the goal this year.",
    sampleSchedule: {
      fall: ["Organic Chemistry I", "Intro Biology II", "Physics I", "Gen Ed/Elective"],
      spring: ["Organic Chemistry II", "Physics II", "Psychology or Sociology", "Gen Ed"],
      tips: "This is the 'hard semester' for many. Plan lighter extracurriculars."
    }
  },
  {
    year: "Junior Year",
    theme: "Consolidate. Plan the MCAT and timeline.",
    focus: [
      "Map out your MCAT timeline based on your coursework and energy, not your friends'.",
      "Build relationships with professors for future letters of recommendation.",
      "Keep your strongest clinical and service commitments steady.",
      "Start drafting your story: why medicine, and what shaped that.",
    ],
    avoid: "Don't let MCAT prep blow up your GPA. Both matter; balance them deliberately.",
    sampleSchedule: {
      fall: ["Biochemistry", "Upper-level Biology elective", "Major requirements", "MCAT prep begins"],
      spring: ["Genetics or Molecular Biology", "Major electives", "Continue clinical hours", "MCAT in late spring/early summer"],
      tips: "If taking MCAT in spring, start content review winter break."
    }
  },
  {
    year: "Senior Year / Application Year",
    theme: "Apply. Reflect. Decide on timing honestly.",
    focus: [
      "Submit your primary application early in the cycle if you're truly ready.",
      "Be honest about whether a gap year would make you a stronger, calmer applicant.",
      "Lean on mentors and your advisor through interviews and secondaries.",
      "Keep living your life, your activities don't stop the moment you apply.",
    ],
    avoid: "Don't apply before you're ready just because of the calendar. A gap year is not a setback.",
    sampleSchedule: {
      fall: ["Capstone/Senior seminar", "Remaining major requirements", "Interview prep", "Secondaries if applying"],
      spring: ["Light course load if possible", "Interviews continue", "Decision time", "Plan for gap year activities if needed"],
      tips: "If doing a gap year, use senior spring to line up meaningful work or research."
    }
  },
]

export const courseGuides = [
  {
    course: "General Chemistry I & II",
    strategy:
      "Gen Chem rewards consistent daily practice, not cramming. Work problems by hand until the math and concepts become second nature. Go to office hours with attempted problems, not blank pages.",
    survival:
      "Falling behind compounds fast here. If you slip a week, schedule a catch-up block immediately rather than hoping to absorb it later.",
    moravianTips: [
      "The ALEKS placement can save you time, take it seriously.",
      "Form study groups early; the chem tutoring center is underutilized.",
      "Dr. office hours are gold, bring specific questions, not 'I don't get it.'"
    ]
  },
  {
    course: "Organic Chemistry I & II",
    strategy:
      "Orgo is about pattern recognition, not memorization. Understand the 'why' behind each mechanism. Draw, redraw, and draw again. If you can't explain a mechanism out loud, you don't know it yet.",
    survival:
      "Don't wait until exam week to realize you're lost. Weekly self-tests on mechanisms will save you.",
    moravianTips: [
      "Start each chapter by mapping reaction types before diving into details.",
      "The organic chemistry tutor sessions fill up, go early in the week.",
      "Past exams (if available) are your best practice, ask upperclassmen."
    ]
  },
  {
    course: "Biology Sequence",
    strategy:
      "Volume-heavy. Turn lectures into active recall: close the notes and explain each concept out loud or on paper. Connect facts into systems instead of memorizing lists.",
    survival:
      "Make a one-page concept map per unit. If you can teach the map to a friend, you're ready for the exam.",
    moravianTips: [
      "The bio faculty genuinely want you to succeed, use their office hours.",
      "Integrate with your MCAT prep early; this content comes back.",
      "Study groups for bio work well if everyone comes prepared."
    ]
  },
  {
    course: "Physics I & II",
    strategy:
      "Conceptual understanding first, formulas second. Draw the situation before you reach for an equation. Most errors are setup errors, not math errors.",
    survival:
      "Redo missed problems from scratch a few days later. Re-reading solutions feels productive but doesn't build the skill.",
    moravianTips: [
      "Physics at Moravian moves fast, don't skip homework problems.",
      "The math is less scary than it looks; focus on units and diagrams.",
      "If calc-based feels overwhelming, talk to your advisor about algebra-based options."
    ]
  },
  {
    course: "Biochemistry",
    strategy:
      "The bridge course to the MCAT. Focus on understanding pathways and why they're regulated, not rote memorization of every intermediate.",
    survival:
      "Tie everything back to a real question: what happens to this pathway when something goes wrong? That framing sticks.",
    moravianTips: [
      "This is where Orgo and Bio finally make sense together.",
      "Use Anki or flashcards for amino acids and pathway regulation.",
      "Biochem is heavily tested on the MCAT, treat this as preview."
    ]
  },
  {
    course: "Psychology & Sociology",
    strategy:
      "Often underestimated by pre-meds. These courses cover a huge chunk of the MCAT's Psych/Soc section. Engage with the material; don't just memorize definitions.",
    survival:
      "Create concept maps linking theories to real-world examples. The MCAT tests application, not just recall.",
    moravianTips: [
      "Take these seriously, they're 'easier' GPA boosters but MCAT-heavy.",
      "The 300-page Khan Academy doc is your friend for MCAT P/S prep.",
      "Connect concepts to your clinical experiences for deeper retention."
    ]
  },
]

export const mentorshipPoints = [
  {
    title: "Find peers, not just competitors",
    body: "The students who thrive build a small circle they study with and lean on, people who celebrate each other's wins instead of measuring against them. You need at least one person who knows when you're struggling.",
  },
  {
    title: "Use your advisor early and often",
    body: "Your pre-med advisor is most useful when they know you before a crisis. Schedule a check-in even when nothing is wrong. Bring questions; leave with a plan.",
  },
  {
    title: "Seek mentors a few steps ahead",
    body: "An upperclassman, a recent grad, or a med student can give you grounded, specific advice. Most people are generous if you ask a clear question and respect their time.",
  },
  {
    title: "Mentorship goes both ways",
    body: "As you grow, mentor someone behind you. Teaching reinforces what you know and reminds you how far you've already come.",
  },
]

export const mentorshipCaseStudies = [
  {
    title: "The Study Group That Stuck",
    scenario: "Four freshmen met in Gen Chem and decided to study together weekly. No formal structure, just showing up.",
    outcome: "Three years later, all four had strong GPAs and applied together. Two got into the same med school. The group became accountability partners through MCAT prep.",
    lesson: "Consistency beats intensity. A small group that actually shows up is worth more than a large one that doesn't.",
  },
  {
    title: "The Cold Email That Worked",
    scenario: "A sophomore emailed a medical student she found through LinkedIn, asking one specific question about balancing research and coursework.",
    outcome: "That medical student became an informal mentor, reviewing her personal statement two years later and connecting her with shadowing opportunities.",
    lesson: "One respectful, specific ask can open doors. Most people remember what it was like and want to help.",
  },
  {
    title: "The Advisor Relationship",
    scenario: "A junior started meeting with their pre-health advisor monthly, even when things were going well. They discussed not just requirements, but doubts and competing interests.",
    outcome: "When application time came, the advisor wrote a strong committee letter that reflected genuine knowledge of the student's journey, not just their transcript.",
    lesson: "Advisors can only advocate for you if they know you. Build the relationship before you need it.",
  },
  {
    title: "Paying It Forward",
    scenario: "A senior who struggled through Orgo started tutoring freshmen informally, meeting in the library once a week.",
    outcome: "The senior solidified their own knowledge while building a track record of service. Several mentees credited them in their own applications years later.",
    lesson: "Teaching is learning twice. Mentorship benefits both directions.",
  },
]

export const mcatPhases = [
  {
    phase: "Phase 1, Content Review",
    duration: "Roughly the first third of your prep",
    detail:
      "Rebuild your foundation across all subjects. Don't just re-read, turn each topic into active recall and flashcards. The goal is recognition turning into retrieval.",
  },
  {
    phase: "Phase 2, Practice & Application",
    duration: "The middle stretch",
    detail:
      "Shift to practice passages and question banks. The MCAT tests reasoning, not memorization. Review every wrong answer deeply enough to explain why each option is right or wrong.",
  },
  {
    phase: "Phase 3, Full-Length Tests",
    duration: "The final stretch",
    detail:
      "Take full-length exams under real conditions to build stamina and timing. Your review of each test matters more than the test itself. Track patterns in your mistakes.",
  },
]

export const mcatTruths = [
  "It's a marathon, not a sprint, plan months, not weeks.",
  "Your practice-test review is worth more than the raw number of hours studied.",
  "Protect your GPA while studying; a balanced applicant beats a lopsided one.",
  "Rest days are part of the plan, not a betrayal of it. Burnout lowers scores.",
  "A 510+ is competitive for most MD programs; 500+ for DO. But range matters less than fit, use the MSAR to research your target schools specifically.",
  "Retaking is common and not a red flag. A meaningful score improvement with a clear explanation reads as resilience, not weakness.",
]

export const timelineSteps = [
  {
    window: "Spring before applying",
    items: [
      "Finalize your MCAT timing and register.",
      "Line up letter writers and give them plenty of notice.",
      "Begin drafting your personal statement.",
    ],
  },
  {
    window: "Late spring / early summer",
    items: [
      "Primary applications (AMCAS / AACOMAS) open and can be submitted.",
      "Submit early, the cycle is rolling, so timing genuinely matters.",
      "Polish your activities section with honest, reflective entries.",
    ],
  },
  {
    window: "Summer",
    items: [
      "Secondary applications arrive from schools, return them promptly.",
      "Pre-write common secondary prompts so you're not scrambling.",
      "Keep your experiences going; life doesn't pause for the cycle.",
    ],
  },
  {
    window: "Fall through winter",
    items: [
      "Interview invitations go out; prepare thoughtfully, not anxiously.",
      "Send any update letters where appropriate.",
      "Practice telling your story out loud with a mentor.",
    ],
  },
  {
    window: "Winter into spring",
    items: [
      "Acceptance decisions arrive on a rolling basis.",
      "Compare offers on fit and finances, not just prestige.",
      "Breathe. You made it through one of the hardest parts.",
    ],
  },
]

export const faqs = [
  {
    q: "Am I behind if I haven't started research/clinical hours yet?",
    a: "Almost certainly not. There is no universal clock. A sophomore with strong grades and no hours yet is in great shape. Schools want depth and reflection over the total, not the earliest possible start. Build from where you are.",
  },
  {
    q: "What GPA do I need?",
    a: "Higher is better, but there's no magic cutoff that defines you. Aim to do well in the courses in front of you rather than chasing a number. An upward trend and a genuine recovery from a rough semester can tell a powerful story.",
  },
  {
    q: "Should I take a gap year?",
    a: "Gap years are common and increasingly the norm, not a red flag. If you'd be a stronger, calmer, more rested applicant with another year, take it. Time spent growing is never wasted in this process.",
  },
  {
    q: "How many shadowing hours do I really need?",
    a: "Fewer than the internet implies. Roughly 40–50 thoughtful hours across a couple of specialties is plenty for most applications. What matters is what you understood, not the count.",
  },
  {
    q: "Do my grades from freshman year ruin everything?",
    a: "No. A rough start that turns into a clear upward trend is a story of growth, which schools respect. One semester does not define your trajectory unless you let it.",
  },
  {
    q: "What if I'm not sure medicine is for me?",
    a: "That uncertainty is healthy and worth exploring honestly through shadowing and clinical work. It's far better to find clarity now than to push forward on momentum alone. This guide is here to help you decide intentionally, either way.",
  },
]

export const usefulLinks = [
  {
    label: "AAMC - Aspiring Docs",
    href: "https://students-residents.aamc.org/aspiring-docs",
    desc: "Official resources for exploring a career in medicine.",
    category: "Official Resources"
  },
  {
    label: "AAMC Fee Assistance Program (FAP)",
    href: "https://students-residents.aamc.org/fee-assistance-program",
    desc: "Helps eligible students cover MCAT registration and AMCAS application fees.",
    category: "Applications"
  },
  {
    label: "AAMC Pre-Med Worksheets",
    href: "https://students-residents.aamc.org/pre-med-worksheets",
    desc: "Free worksheets to assess where you are in your pre-med journey and plan next steps.",
    category: "Applications"
  },
  {
    label: "AAMC - The MCAT Exam",
    href: "https://students-residents.aamc.org/taking-mcat-exam/taking-mcat-exam",
    desc: "Everything about registering for and preparing for the MCAT.",
    category: "MCAT Prep"
  },
  {
    label: "AAMC Official MCAT Materials",
    href: "https://students-residents.aamc.org/taking-mcat-exam/practice-materials",
    desc: "The only source that replicates the real exam. Start here with the free diagnostic and practice hub.",
    category: "MCAT Prep"
  },
  {
    label: "AMCAS Application",
    href: "https://students-residents.aamc.org/applying-medical-school-amcas/applying-medical-school-amcas",
    desc: "The centralized MD application service.",
    category: "Applications"
  },
  {
    label: "AACOMAS (DO Schools)",
    href: "https://www.aacom.org/become-a-doctor/applying",
    desc: "Application portal for osteopathic medical schools.",
    category: "Applications"
  },
  {
    label: "MSAR (Medical School Data)",
    href: "https://students-residents.aamc.org/medical-school-admission-requirements/medical-school-admission-requirements",
    desc: "Official database of medical school admissions statistics. Worth the subscription.",
    category: "School Research"
  },
  {
    label: "Student Doctor Network",
    href: "https://www.studentdoctor.net/",
    desc: "School-specific forums and cycle threads. Messy, but essential for real applicant perspectives.",
    category: "School Research"
  },
  {
    label: "Moravian Pre-Health Advising",
    href: "https://www.moravian.edu/advising",
    desc: "Connect with your campus pre-health advisor and committee.",
    category: "Moravian Resources"
  },
  {
    label: "Moravian Career & Civic Engagement",
    href: "https://www.moravian.edu/career-civic-engagement",
    desc: "For clinical volunteering, internships, and community service opportunities.",
    category: "Moravian Resources"
  },
  {
    label: "Moravian Counseling Services",
    href: "https://www.moravian.edu/counseling",
    desc: "Free, confidential counseling for Moravian students. If the pressure becomes too much, this is the right first call.",
    category: "Moravian Resources"
  },
  {
    label: "Active Minds",
    href: "https://www.activeminds.org/",
    desc: "A national student mental health organization with resources for pre-med stress and burnout.",
    category: "Wellbeing"
  },
  {
    label: "The Pre-Med Years Podcast",
    href: "https://medicalschoolhq.net/the-pre-med-years-podcast/",
    desc: "Free episodes on burnout, non-traditional paths, and application strategy for busy students.",
    category: "Wellbeing"
  },
  {
    label: "St. Luke's Volunteer Services",
    href: "https://www.slhn.org/volunteer",
    desc: "Information on hospital volunteering and observership programs with our local health network.",
    category: "Clinical Opportunities"
  },
  {
    label: "AAMC Clinical Care Observership Directory",
    href: "https://students-residents.aamc.org/clinical-care-observership-directory",
    desc: "Search for shadowing and observership opportunities before you cold-email clinical sites.",
    category: "Clinical Opportunities"
  },
  {
    label: "MedSchoolCoach Virtual Shadowing",
    href: "https://www.medschoolcoach.com/virtual-shadowing/",
    desc: "10 hours of virtual clinical observation with real physicians and a certificate for applications.",
    category: "Clinical Opportunities"
  },
  {
    label: "VolunteerMatch",
    href: "https://www.volunteermatch.org/",
    desc: "Find local clinical and non-clinical volunteer opportunities based on your interests.",
    category: "Clinical Opportunities"
  },
  {
    label: "Khan Academy MCAT Prep",
    href: "https://www.khanacademy.org/test-prep/mcat",
    desc: "Free, comprehensive MCAT prep videos and practice. Start here before paid resources.",
    category: "MCAT Prep"
  },
  {
    label: "Jack Westin MCAT",
    href: "https://jackwestin.com/",
    desc: "Free daily CARS passages and practice. Great for building consistent CARS habits.",
    category: "MCAT Prep"
  },
  {
    label: "MileDown Anki Deck",
    href: "https://www.miledownanki.com/",
    desc: "A free spaced repetition flashcard deck for MCAT review. Great for building daily retention habits.",
    category: "Study Tools"
  },
  {
    label: "Blueprint Free MCAT Full-Length",
    href: "https://www.blueprintprep.com/mcat/free-resources/",
    desc: "Free full-length practice exam with analytics plus a baseline half-length diagnostic.",
    category: "MCAT Prep"
  },
  {
    label: "Anki (Flashcard App)",
    href: "https://apps.ankiweb.net/",
    desc: "Spaced repetition flashcards. Download pre-made MCAT decks or make your own.",
    category: "Study Tools"
  },
  {
    label: "r/premed (Reddit)",
    href: "https://www.reddit.com/r/premed/",
    desc: "Large pre-med community. Take with a grain of salt, but useful for application cycle info.",
    category: "Communities"
  },
  {
    label: "r/MCAT (Reddit)",
    href: "https://www.reddit.com/r/Mcat/",
    desc: "MCAT-specific community with study schedules, resource reviews, and score reactions.",
    category: "Communities"
  },
]
