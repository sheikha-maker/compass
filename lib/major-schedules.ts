/**
 * lib/major-schedules.ts
 * Major-specific sample schedules for the three most common pre-health majors at
 * Moravian (per the Biology department's own advising page: "Most students interested
 * in careers in the health professions ... major in Biology, Neuroscience, or
 * Biochemistry" — there is no separate pre-med major).
 *
 * Sourced from Moravian's official program-of-study pages (Aug 2026):
 *   - Biology:      moravian.edu/biology/program
 *   - Biochemistry: moravian.edu/biochemistry/program-of-study  (publishes an
 *                   official suggested semester-by-semester schedule — used directly)
 *   - Neuroscience: moravian.edu/neuroscience/program-of-study  (publishes required
 *                   courses and electives-by-track, but NOT an official semester
 *                   sequence — the schedule below is our own reasonable construction
 *                   from those requirements, not something Moravian publishes)
 *
 * IMPORTANT: Course offerings, prerequisites, and program requirements change.
 * These are *sample* sequences to plan around, not a substitute for meeting with
 * a Biology/Chemistry/Neuroscience advisor or the Health Professions Advisor
 * (Dr. Cecilia Fox) each semester. Always confirm against the current catalog
 * and Amos before registering.
 */

export type MajorScheduleYear = {
  fall: string[]
  spring: string[]
  tips: string
}

export type MajorId = "biology" | "biochemistry" | "neuroscience"

export const majors: { id: MajorId; label: string; blurb: string; official: boolean }[] = [
  {
    id: "biology",
    label: "Biology",
    blurb: "The most flexible pre-health major — 10 Biology courses plus Chem/Math co-requisites.",
    official: false,
  },
  {
    id: "biochemistry",
    label: "Biochemistry",
    blurb: "Chemistry-heavy, MCAT-aligned major. Moravian publishes an official suggested sequence for this one.",
    official: true,
  },
  {
    id: "neuroscience",
    label: "Neuroscience",
    blurb: "Interdisciplinary major with three tracks: Cellular, Behavioral, or Cognitive.",
    official: false,
  },
]

export const majorSampleSchedules: Record<MajorId, MajorScheduleYear[]> = {
  // Built from moravian.edu/biology/program: BIOL111, BIOL210, BIOL266 or 328, one
  // organismal/ecology course, BIOL370, 5 electives; co-reqs CHEM113–114, CHEM211–212,
  // one math course; PHYS109–110 or 111–112 recommended for med-school-bound students.
  biology: [
    {
      fall: ["General Chemistry I (CHEM113)", "Calculus I or Statistics (MATH170 or 107)", "First-Year Writing", "Elective/Gen Ed"],
      spring: ["General Chemistry II (CHEM114)", "Foundations of Biology (BIOL111)", "Gen Ed", "Elective"],
      tips: "BIOL 110.2 (First-Year Bioscience Seminar) is strongly recommended before BIOL111 — take it this fall if it's offered.",
    },
    {
      fall: ["Organic Chemistry I (CHEM211)", "Genetics (BIOL210)", "Gen Ed", "Elective"],
      spring: ["Organic Chemistry II (CHEM212)", "Cell & Molecular Biology (BIOL266) or a Biology elective", "Gen Ed"],
      tips: "This is the heaviest science semester most Biology majors face. Keep electives light in spring.",
    },
    {
      fall: ["Intro Physics for the Life Sciences I (PHYS109) or Biology elective", "Biology elective (200-level+)", "Gen Ed", "MCAT prep begins"],
      spring: ["Intro Physics for the Life Sciences II (PHYS110)", "Biology elective(s)", "MCAT in late spring/early summer"],
      tips: "At least 3 of your Biology electives need a lab/research component — plan those in early, they fill up.",
    },
    {
      fall: ["Biology Seminar (BIOL370)", "Remaining Biology electives", "Major requirements", "Interview prep"],
      spring: ["Light course load if possible", "Remaining electives", "Interviews continue", "Decision time"],
      tips: "At least 4 of your 5 Biology electives must be 200-level or higher — check this with your advisor by junior spring.",
    },
  ],

  // This IS Moravian's official published sequence from moravian.edu/biochemistry/program-of-study.
  // Senior spring wasn't specified on their page — filled in with the standard application-year pattern.
  biochemistry: [
    {
      fall: ["General Chemistry I (CHEM113)", "Calculus I (MATH170)", "First-Year Writing", "Elective/Gen Ed"],
      spring: ["General Chemistry II (CHEM114)", "Calculus II (MATH171)", "Foundations of Biology (BIOL111)", "Gen Ed"],
      tips: "This exact sequence — Chem113/114, Math170/171, Bio111 — is Moravian's own published plan for Biochemistry majors.",
    },
    {
      fall: ["Organic Chemistry I (CHEM211)", "Biochemistry elective", "Methods in Chemical Research (CHEM220.2)"],
      spring: ["Organic Chemistry II (CHEM212)", "Genetics (BIOL210)", "Gen Ed"],
      tips: "CHEM220.2 (Research Methods) shows up here officially — don't skip it or push it later, it's a prerequisite building block for junior-year Biochem.",
    },
    {
      fall: ["Biochemistry I (BIOL/CHEM327)", "Introductory Physics I (PHYS111)", "Gen Ed", "MCAT prep begins"],
      spring: ["Biochemistry II (BIOL/CHEM328)", "Introductory Physics II (PHYS112)", "MCAT in late spring/early summer"],
      tips: "Biochem I & II line up almost exactly with MCAT content review — treat this year as a two-for-one.",
    },
    {
      fall: ["Physical Chemistry I (CHEM331)", "Advanced Genetics (BIOL365)", "Biochemistry Seminar (BIOL/CHEM375.2)", "Interview prep"],
      spring: ["Remaining Gen Ed / elective from the Biochemistry elective group", "Interviews continue", "Decision time"],
      tips: "Moravian's published plan ends after fall of senior year — spring is intentionally light so you can focus on interviews and secondaries.",
    },
  ],

  // Built from moravian.edu/neuroscience/program-of-study's required courses and
  // co-requisites. Moravian does NOT publish an official semester-by-semester plan for
  // this major (unlike Biochemistry) — this is our own reasonable sequencing of their
  // published requirements, assuming the Cellular or Behavioral track (which requires
  // Organic Chemistry). The Cognitive Neuroscience track swaps CHEM211–212 for CS120–121.
  neuroscience: [
    {
      fall: ["General Chemistry I (CHEM113)", "Calculus I (MATH170) or Statistics", "Intro to Psychology (PSYC120)", "First-Year Writing"],
      spring: ["General Chemistry II (CHEM114)", "Foundations of Biology (BIOL111)", "Gen Ed", "Elective"],
      tips: "Pick your track (Cellular, Behavioral, or Cognitive) as early as you can — it changes whether you need Organic Chemistry or Computer Science as a co-requisite.",
    },
    {
      fall: ["Organic Chemistry I (CHEM211) — Cellular/Behavioral track", "Neuroscience (BIOL/NEUR263)", "Psychological Research Methods (PSYC211)"],
      spring: ["Organic Chemistry II (CHEM212) — Cellular/Behavioral track", "Learning from Data (PSYC212)", "Gen Ed"],
      tips: "Cognitive-track students: swap the Organic Chemistry sequence here for Computer Science I & II (CS120–121) instead.",
    },
    {
      fall: ["Intro Physics for the Life Sciences I (PHYS109)", "Neuroscience Methodology (NEUR367)", "Track elective", "MCAT prep begins"],
      spring: ["Intro Physics for the Life Sciences II (PHYS110)", "Track elective(s)", "MCAT in late spring/early summer"],
      tips: "You need 3 electives from your chosen track plus 1 from a different track — don't leave the 'different track' one for senior year.",
    },
    {
      fall: ["Neuroscience Seminar (NEUR373)", "Remaining track electives", "Ethics course (recommended, not required)", "Interview prep"],
      spring: ["Light course load if possible", "Interviews continue", "Decision time"],
      tips: "An ethics course (Philosophy 222, 234, or 259) is recommended given how much neuroscience research touches on cognitive enhancement and stem cells — good personal-statement material too.",
    },
  ],
}
