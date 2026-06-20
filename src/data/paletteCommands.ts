export type PaletteCommand = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  keywords?: string[];
  action: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export const paletteCommands: PaletteCommand[] = [
  {
    id: "scroll-about",
    label: "About",
    description: "プロフィールへ移動",
    icon: "User",
    keywords: ["about", "profile", "プロフィール"],
    action: () => scrollTo("about"),
  },
  {
    id: "scroll-experience",
    label: "Experience",
    description: "経験・実績へ移動",
    icon: "Briefcase",
    keywords: ["experience", "projects", "実績"],
    action: () => scrollTo("experience"),
  },
  {
    id: "open-github",
    label: "GitHub を開く",
    description: "github.com/zakiPoteto",
    icon: "ExternalLink",
    keywords: ["github", "code", "repository"],
    action: () => window.open("https://github.com/zakiPoteto", "_blank", "noopener,noreferrer"),
  },
];
