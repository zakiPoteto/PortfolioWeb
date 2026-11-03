import assert from "node:assert/strict";
import { test } from "node:test";
import { entries, experiences, formatPeriod, toStartDate } from "./experiences.ts";

const isRealDate = (year: number, month: number, day: number) => {
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day;
};

test("期間が実在する日付で、終了が開始より前になっていない", () => {
  for (const { title, period } of entries) {
    const { start, end } = period;
    assert.ok(isRealDate(start.year, start.month, start.day ?? 1), `${title}: 開始日が存在しない`);
    if (!end || end === "ongoing") continue;
    assert.ok(isRealDate(start.year, end.month, end.day ?? 1), `${title}: 終了日が存在しない`);
    const from = start.month * 100 + (start.day ?? 1);
    const to = end.month * 100 + (end.day ?? 1);
    assert.ok(from <= to, `${title}: 終了が開始より前`);
  }
});

test("slug が重複していない", () => {
  const slugs = entries.flatMap((e) => (e.slug ? [e.slug] : []));
  assert.equal(new Set(slugs).size, slugs.length);
});

test("表示用の文字列を period から作る", () => {
  assert.equal(formatPeriod({ start: { year: 2026, month: 10 } }), "2026年10月");
  assert.equal(formatPeriod({ start: { year: 2025, month: 8 }, end: { month: 9 } }), "2025年8〜9月");
  assert.equal(
    formatPeriod({ start: { year: 2026, month: 8, day: 31 }, end: { month: 9, day: 4 } }),
    "2026年8月31日〜9月4日",
  );
  assert.equal(formatPeriod({ start: { year: 2024, month: 4 }, end: "ongoing" }), "2024年4月〜現在");
});

test("開始日を YYYY-MM-DD にする", () => {
  assert.equal(toStartDate({ year: 2025, month: 8 }), "2025-08-01");
  assert.equal(toStartDate({ year: 2026, month: 8, day: 31 }), "2026-08-31");
});

test("開始日の降順に並ぶ", () => {
  const dates = experiences.map((e) => e.startDate);
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test("継続中は period の end が ongoing のものだけ", () => {
  assert.deepEqual(
    experiences.filter((e) => e.ongoing).map((e) => e.slug),
    ["dotto"],
  );
});
