export type Skill = {
  name: string;
  bar?: string;
  note?: string;
};

export type SkillGroup = {
  label: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Mobile",
    skills: [
      { name: "Flutter (Dart)", bar: "████████████", note: "2年+" },
      { name: "React Native",   bar: "██████░░░░░░", note: "半年" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "TypeScript", bar: "████████░░░░", note: "1年+" },
      { name: "Next.js",    bar: "██████░░░░░░", note: "半年" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Go",       bar: "████░░░░░░░░", note: "インターン5日間" },
      { name: "Firebase", bar: "██████░░░░░░", note: "1年+" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git / GitHub / GitLab / Figma / Riverpod / Supabase" },
      { name: "MySQL / OpenAPI / Docker / Postman" },
    ],
  },
];
