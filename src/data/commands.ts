import { experiences } from "./experiences";
import { skillGroups } from "./skills";
import { ASCII_ART } from "./asciiArt";

export type CommandResult = {
  lines: string[];
  action?: "clear" | "exit" | "open";
  openUrl?: string;
};

export function executeCommand(raw: string): CommandResult {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();

  const flags = new Set<string>();
  const args: string[] = [];
  for (const p of parts.slice(1)) {
    if (p.startsWith("--")) {
      flags.add(p.slice(2));
    } else if (p.startsWith("-") && p.length > 1) {
      for (const ch of p.slice(1)) flags.add(ch);
    } else {
      args.push(p.toLowerCase());
    }
  }
  const sub = args[0];
  const f = (flag: string) => flags.has(flag);

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

    case "ls": {
      const long = f("l");
      const all  = f("a");
      const one  = f("1");
      const date = new Date().toLocaleDateString("ja-JP");

      if (sub === "projects") {
        if (long) {
          return {
            lines: [
              "",
              `total ${experiences.length}`,
              ...experiences.map(
                (e) => `drwxr-xr-x  zaki  ${e.date.padEnd(16)}  ${e.title}`
              ),
              "",
            ],
          };
        }
        if (one) {
          return { lines: ["", ...experiences.map((e) => e.title), ""] };
        }
        return {
          lines: ["", ...experiences.map((e, i) => `  [${i + 1}] ${e.title}`), ""],
        };
      }

      const visibleFiles = ["skills.txt", "awards.txt", "projects/"];
      const hiddenFiles  = [".", "..", ".profile"];
      const files = all ? [...hiddenFiles, ...visibleFiles] : visibleFiles;

      if (long) {
        return {
          lines: [
            "",
            `total ${files.length}`,
            ...(all
              ? [
                  `drwxr-xr-x  zaki  ${date}  .`,
                  `drwxr-xr-x  zaki  ${date}  ..`,
                  `-rw-------  zaki  ${date}  .profile`,
                ]
              : []),
            `-rw-r--r--  zaki  ${date}  skills.txt`,
            `-rw-r--r--  zaki  ${date}  awards.txt`,
            `drwxr-xr-x  zaki  ${date}  projects/`,
            "",
          ],
        };
      }
      if (one) {
        return { lines: files };
      }
      return { lines: [files.join("  ")] };
    }

    case "cat": {
      const numbered = f("n");

      const withLineNums = (lines: string[]) =>
        numbered
          ? lines.map((l, i) => (l === "" ? "" : `${String(i + 1).padStart(4)}  ${l}`))
          : lines;

      if (sub === "skills.txt") {
        const lines: string[] = ["", "=== Tech Stack ==="];
        for (const group of skillGroups) {
          lines.push("");
          const [first, ...rest] = group.skills;
          const label = `${group.label}:`.padEnd(10);
          if (first.bar) {
            lines.push(`${label}  ${first.name.padEnd(20)}  ${first.bar} ${first.note}`);
          } else {
            lines.push(`${label}  ${first.name}`);
          }
          for (const s of rest) {
            lines.push(s.bar
              ? `          ${s.name.padEnd(20)}  ${s.bar} ${s.note}`
              : `          ${s.name}`
            );
          }
        }
        lines.push("");
        return { lines: withLineNums(lines) };
      }
      if (sub === "awards.txt") {
        const awarded = experiences.filter((e) => e.award);
        return {
          lines: withLineNums([
            "",
            "=== Awards ===",
            "",
            ...awarded.map((e) => `  ${e.award}  — ${e.title}`),
            "",
          ]),
        };
      }
      if (sub === ".profile") {
        return {
          lines: withLineNums([
            "",
            'export NAME="山﨑壮馬"',
            'export GITHUB="https://github.com/zakiPoteto"',
            'export UNIVERSITY="公立はこだて未来大学"',
            'export LANG="Flutter > TypeScript > Go"',
            'export COFFEE="essential"',
            "",
          ]),
        };
      }
      return {
        lines: [`cat: ${sub ?? "(missing argument)"}: No such file or directory`],
      };
    }

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
      return { lines: [args.join(" ")] };

    case "clear":
      return { lines: [], action: "clear" };

    case "exit":
      return { lines: [], action: "exit" };

    case "help":
      return {
        lines: [
          "",
          "  about              自己紹介 + ASCII art",
          "  ls [-la1] [dir]    ファイル一覧（-l 詳細 / -a 隠しファイル / -1 縦並び）",
          "  cat [-n] <file>    ファイル表示（-n 行番号付き）",
          "  open <project>     プロジェクトの GitHub を開く",
          "  date               現在日時を表示",
          "  echo <text>        テキストをそのまま返す",
          "  clear              画面クリア",
          "  exit               ターミナルを閉じる",
          "  help               このヘルプ",
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

const PROJECT_LINKS = Object.fromEntries(
  experiences
    .filter((e) => e.slug && e.githubUrl)
    .map((e) => [e.slug!, { label: e.title, url: e.githubUrl! }])
);

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
