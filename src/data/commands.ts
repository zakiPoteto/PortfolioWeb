import { experiences } from "./experiences";
import { ASCII_ART } from "./asciiArt";

export type CommandResult = {
  lines: string[];
  action?: "clear" | "exit" | "open";
  openUrl?: string;
};

export function executeCommand(raw: string): CommandResult {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const sub = parts[1]?.toLowerCase();

  switch (cmd) {
    case "whoami":
      return {
        lines: [
          ASCII_ART,
          "",
          "山﨑壮馬 (zakiPoteto)",
          "公立はこだて未来大学 システム情報科学部 3年 | 28卒",
          "Mobile & Frontend Engineer",
          "",
          "Flutter / Dart / TypeScript / React Native / Firebase",
        ],
      };

    case "ls":
      if (sub === "projects") {
        return {
          lines: [
            "",
            ...experiences.map((e, i) => `  [${i + 1}] ${e.title}`),
            "",
          ],
        };
      }
      return { lines: ["projects/  skills.txt  awards.txt"] };

    case "cat":
      if (sub === "skills.txt") {
        return {
          lines: [
            "",
            "=== Tech Stack ===",
            "",
            "Mobile:   Flutter (Dart)     ████████████ 2年+",
            "          React Native        ██████░░░░░░ 半年",
            "",
            "Frontend: TypeScript          ████████░░░░ 1年+",
            "          Next.js             ██████░░░░░░ 半年",
            "",
            "Backend:  Go                  ████░░░░░░░░ 勉強中",
            "          Firebase            ██████░░░░░░ 1年+",
            "",
            "Tools:    Git / GitHub / Figma / Riverpod / Supabase",
            "",
          ],
        };
      }
      if (sub === "awards.txt") {
        return {
          lines: [
            "",
            "=== Awards ===",
            "",
            "  KDDIアジャイル賞  — Callaco  (P2HACKS 2024, 13チーム中)",
            "  優秀賞           — Touch new (TORNADO 2025)",
            "",
          ],
        };
      }
      return { lines: [`cat: ${sub ?? "(missing argument)"}: No such file or directory`] };

    case "open":
      if (sub === "dotto") {
        return {
          lines: ["Opening Dotto on GitHub..."],
          action: "open",
          openUrl: "https://github.com/fun-dotto/app",
        };
      }
      return { lines: [`open: ${sub ?? "(missing argument)"}: not found`] };

    case "clear":
      return { lines: [], action: "clear" };

    case "exit":
      return { lines: [], action: "exit" };

    case "help":
      return {
        lines: [
          "",
          "  whoami           自己紹介 + ASCII art",
          "  ls projects      プロジェクト一覧",
          "  cat skills.txt   技術スタック",
          "  cat awards.txt   受賞歴",
          "  open dotto       Dotto の GitHub を開く",
          "  clear            画面クリア",
          "  exit             ターミナルを閉じる",
          "  help             このヘルプ",
          "",
          "  Tip: ↑ / ↓ で入力履歴を辿れます",
          "",
        ],
      };

    default:
      return { lines: [`zsh: command not found: ${cmd}`] };
  }
}
