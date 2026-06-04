import { NextResponse } from "next/server";

const GITHUB_USERNAME = "zakiPoteto";

const QUERY = `
  query GitHubStats($username: String!) {
    user(login: $username) {
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER, first: 1) {
        totalCount
      }
      pullRequests(states: MERGED, first: 1) {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function calcStreak(weeks: { contributionDays: { contributionCount: number; date: string }[] }[]): number {
  const days = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => b.date.localeCompare(a.date));

  // 当日まだ貢献がない場合はスキップして昨日から計算
  const startIdx = days[0]?.contributionCount === 0 ? 1 : 0;
  let streak = 0;
  for (const day of days.slice(startIdx)) {
    if (day.contributionCount > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function toLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 9) return 2;
  return 3;
}

const FALLBACK = {
  totalContributions: 842,
  currentStreak: 12,
  totalPRs: 48,
  publicRepos: 15,
  contributionGrid: Array.from({ length: 28 }, () => ({ level: 0 })),
  lastUpdated: "---",
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(FALLBACK);
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: GITHUB_USERNAME } }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const json = await res.json();
    if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    const user = json.data?.user;
    if (!user) throw new Error("User not found");

    const weeks = user.contributionsCollection.contributionCalendar.weeks;
    const recentDays = weeks.slice(-4).flatMap((w: { contributionDays: { contributionCount: number; date: string }[] }) => w.contributionDays);
    const contributionGrid = recentDays.slice(-28).map((d: { contributionCount: number }) => ({
      level: toLevel(d.contributionCount),
    }));

    const today = new Date();
    const lastUpdated = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

    return NextResponse.json({
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      currentStreak: calcStreak(weeks),
      totalPRs: user.pullRequests.totalCount,
      publicRepos: user.repositories.totalCount,
      contributionGrid,
      lastUpdated,
    });
  } catch (e) {
    console.error("GitHub stats fetch failed:", e);
    return NextResponse.json(FALLBACK);
  }
}
