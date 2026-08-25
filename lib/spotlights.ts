/**
 * lib/spotlights.ts
 * "Where are they now" — short profiles of past Moravian pre-meds.
 *
 * Only add real, consented people here — no composite/illustrative placeholder
 * profiles. This file used to ship with three fictional ones and nothing in
 * the UI disclosed that, which read as real alumni outcomes. <StudentSpotlight />
 * returns null when this array is empty, so it's safe by default if it's ever
 * cleared out again.
 *
 * Every entry needs the person's actual consent to be featured. `quote` and
 * `advice` are optional on purpose — only fill them in with something the
 * person actually said for this purpose. If you didn't get a quote, leave it
 * out rather than writing one for them.
 */


export type StudentSpotlight = {
  /** Display name or initials */
  name: string
  /** Moravian grad year, e.g. "Class of 2023" */
  gradYear: string
  /** Major(s) at Moravian */
  major: string
  /** Where they are now — the headline outcome */
  now: string
  /** A real quote, only if the person actually gave one for this purpose. Omit rather than invent. */
  quote?: string
  /** A real, attributable piece of advice from them. Omit rather than invent. */
  advice?: string
  /** Optional path tag for color accenting */
  track?: "MD" | "DO" | "Gap Year" | "Research" | "Other"
  /** Optional link to their public LinkedIn, only with their consent to be linked */
  linkedin?: string
  /** Optional headshot, only with their consent to be pictured. Path under /public. */
  photo?: string
  /** Optional chronological list of steps for a nontraditional/multi-stop path.
   *  Leave unset for a straightforward single-school-to-med-school path — this
   *  is for when the "different timelines, different routes" framing actually
   *  needs showing, not just saying. */
  path?: string[]
}

export const studentSpotlights: StudentSpotlight[] = [
  {
    name: "Ankita Bassi",
    gradYear: "Class of 2019 (graduated a semester early)",
    major: "Biology",
    now: "MD, Lewis Katz School of Medicine at Temple University (Temple/St. Luke's campus), 2024",
    track: "MD",
    linkedin: "https://www.linkedin.com/in/ankitabassi/",
    photo: "/spotlights/ankita-bassi.jpg",
  },
  {
    name: "Grant Pellitteri",
    gradYear: "Class of 2013",
    major: "Environmental Policy & Economics (Environmental Science minor)",
    now: "MD, St. George's University School of Medicine, 2024",
    track: "MD",
    linkedin: "https://www.linkedin.com/in/grant-pellitteri/",
    photo: "/spotlights/grant-pellitteri.jpg",
    path: [
      "Moravian University — B.A., Environmental Policy & Economics (2009–13)",
      "Luzerne County Community College — prerequisite coursework, incl. Organic Chemistry (2013–15)",
      "Edward Via College of Osteopathic Medicine — Grad. Certificate, Medical Clinical Sciences (2016–17)",
      "Lake Erie College of Osteopathic Medicine — Post-Bacc Biomedical Certificate (2018–19)",
      "St. George's University — Doctor of Medicine (2020–24)",
    ],
  },
]

