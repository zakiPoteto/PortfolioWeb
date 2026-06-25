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
    case "about":
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

    case "open": {
      const project = PROJECT_LINKS[sub ?? ""];
      if (project) {
        return {
          lines: [`Opening ${project.label} on GitHub...`],
          action: "open",
          openUrl: project.url,
        };
      }
      if (!sub) return { lines: ["open: missing argument"] };
      const projectNames = Object.keys(PROJECT_LINKS).join("  ");
      return { lines: [`open: ${sub}: not found`, `  Available: ${projectNames}`] };
    }

    case "date": {
      const now = new Date();
      return { lines: [now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })] };
    }

    case "echo":
      return { lines: [parts.slice(1).join(" ")] };

    case "clear":
      return { lines: [], action: "clear" };

    case "exit":
      return { lines: [], action: "exit" };

    case "help":
      return {
        lines: [
          "",
          "  about            自己紹介 + ASCII art",
          "  ls projects      プロジェクト一覧",
          "  cat skills.txt   技術スタック",
          "  cat awards.txt   受賞歴",
          "  open <project>   プロジェクトの GitHub を開く",
          "  date             現在日時を表示",
          "  echo <text>      テキストをそのまま返す",
          "  clear            画面クリア",
          "  exit             ターミナルを閉じる",
          "  help             このヘルプ",
          "",
          "  Tip: ↑ / ↓ で入力履歴を辿れます",
          "",
        ],
      };

    default: {
      const similar = findSimilarCommand(cmd);
      const hint = similar ? `\n  Did you mean: ${similar}?` : "";
      return { lines: [`zsh: command not found: ${cmd}${hint}`] };
    }
  }
}

const PROJECT_LINKS: Record<string, { label: string; url: string }> = {
  dotto:     { label: "Dotto",     url: "https://github.com/fun-dotto/app" },
  callaco:   { label: "Callaco",   url: "https://github.com/p2hacks2024/pre-17" },
  kiratto:   { label: "Kiratto",   url: "https://github.com/p2hacks2025/pre-12" },
  "touch-new": { label: "Touch new", url: "https://github.com/tornado2025-05-momentum/Touch-new" },
};

const KNOWN_COMMANDS = ["about", "ls", "cat", "open", "date", "echo", "clear", "exit", "help"];

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function findSimilarCommand(cmd: string): string | null {
  const threshold = 3;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const known of KNOWN_COMMANDS) {
    const dist = levenshtein(cmd, known);
    if (dist < bestDist) {
      bestDist = dist;
      best = known;
    }
  }
  return bestDist <= threshold ? best : null;
}
