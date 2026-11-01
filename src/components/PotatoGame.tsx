"use client";

import { useEffect, useRef } from "react";

// 論理座標(高さ固定、幅は画面に合わせて変わる)
const H = 220;
const GROUND = 190;
const GRAVITY = 2400;
// ジャンプは押した長さで変わる(本家の恐竜と同じ)。短押しは約50、長押しは約90の高さ
const JUMP_V = -660;
const CUT_V = 320; // キーを離したとき、上昇速度をここまで落とす
const MIN_JUMP_HEIGHT = 30; // この高さまでは、離しても上昇を止めない
const BASE_SPEED = 380;
const MAX_SPEED = 800;
const ACCEL = 6;
const PX = 3; // ドット絵1マスの大きさ
const POTATO = { x: 50, w: 16 * PX, h: 14 * PX };
const FORK_W = 7 * PX;
const FORK_GAP = 2 * PX;
const SMALL_FORK_ROWS = 13; // 小ジャンプでも越えられる高さ
const BIG_FORK_ROWS = 20; // 大ジャンプでないと越えられない高さ
const BIG_FORK_FROM = 1000; // 大きいフォークが出始める走行距離
const RETRY_DELAY_MS = 400;
const HIGH_SCORE_KEY = "potato-jump-high-score";

type Status = "idle" | "running" | "paused" | "over";
type Obstacle = { x: number; w: number; h: number; rows: number };

// ドット絵。1文字=1マス、"." は透明
const PALETTE: Record<string, string> = {
  o: "#6b4a1f",
  b: "#d9a84e",
  l: "#f2d189",
  s: "#b5853a",
  e: "#2b1b08",
  x: "#cbd5e1",
  d: "#8b9bb0",
  c: "#1e293b",
};

const POTATO_BODY = [
  "....oooooooo....",
  "..oollllllbboo..",
  ".oollbbbbbbbbbo.",
  ".olbbbbbbbbbbbo.",
  "obbbbbsbbbbbbbbo",
  "obbbbbbbbbbbbbbo",
  "obbbsbbbbbbsbbbo",
  "obbbbbbbbbbbbbbo",
  ".obbbbbbsbbbbbo.",
  ".obbbbbbbbbbbbo.",
  "..oobbbbbbbboo..",
  "....oooooooo....",
];

// 足: 走り(左上げ・右上げ)とジャンプ中
const POTATO_LEGS = [
  ["....oo....oo....", "....oo.........."],
  ["....oo....oo....", "..........oo...."],
  ["....oo....oo....", "................"],
];

const CLOUD = ["...cccc....", ".ccccccc.cc", "ccccccccccc"];

function makeSprite(rows: string[]): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = rows[0].length;
  c.height = rows.length;
  const g = c.getContext("2d");
  if (!g) return c;
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const color = PALETTE[ch];
      if (!color) return;
      g.fillStyle = color;
      g.fillRect(x, y, 1, 1);
    });
  });
  return c;
}

function setPixel(rows: string[], x: number, y: number, ch: string) {
  rows[y] = rows[y].slice(0, x) + ch + rows[y].slice(x + 1);
}

function makePotato(legs: number, dead: boolean): HTMLCanvasElement {
  const rows = [...POTATO_BODY, ...POTATO_LEGS[legs]];
  if (dead) {
    for (const [x, y] of [[10, 3], [12, 3], [11, 4], [10, 5], [12, 5]]) setPixel(rows, x, y, "e");
  } else {
    setPixel(rows, 11, 3, "e");
    setPixel(rows, 11, 4, "e");
  }
  return makeSprite(rows);
}

// 障害物のフォーク。持ち手の長さだけ段数を変える
function makeFork(rows: number): HTMLCanvasElement {
  const head = ["x..x..x", "x..x..x", "x..x..x", "x..x..x", "ddddddd", ".xxxxx.", "..xxx.."];
  const handle = Array.from({ length: rows - head.length }, () => "...x...");
  return makeSprite([...head, ...handle]);
}

function loadHighScore(): number {
  try {
    const v = Number(localStorage.getItem(HIGH_SCORE_KEY));
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // 保存できなくてもゲームは続ける
  }
}

const pad = (n: number) => String(n).padStart(5, "0");
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function PotatoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const potatoSprites = {
      run: [makePotato(0, false), makePotato(1, false)],
      air: makePotato(2, false),
      dead: makePotato(0, true),
    };
    const cloudSprite = makeSprite(CLOUD);
    const forkSprites = new Map<number, HTMLCanvasElement>();
    const forkSprite = (rows: number) => {
      let sprite = forkSprites.get(rows);
      if (!sprite) {
        sprite = makeFork(rows);
        forkSprites.set(rows, sprite);
      }
      return sprite;
    };

    let W = 600;
    const groundY = GROUND - POTATO.h;
    let status: Status = "idle";
    let y = groundY;
    let vy = 0;
    let speed = BASE_SPEED;
    let distance = 0;
    let spawnIn = 0;
    let obstacles: Obstacle[] = [];
    let highScore = loadHighScore();
    let overAt = 0;
    let holding = false;
    let last = 0;
    let raf = 0;

    const score = () => Math.floor(distance / 10);

    const commitScore = () => {
      if (score() <= highScore) return;
      highScore = score();
      saveHighScore(highScore);
    };

    // ターミナルなど別の要素が上に重なっているときは、キー入力を受けない
    const isCovered = () => {
      const rect = canvas.getBoundingClientRect();
      const top = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return top !== null && top !== canvas;
    };

    const drawPotato = () => {
      const grounded = y >= groundY;
      let sprite = potatoSprites.air;
      if (status === "over") sprite = potatoSprites.dead;
      else if (grounded) {
        const step = status === "running" ? Math.floor(distance / 12) % 2 : 0;
        sprite = potatoSprites.run[step];
      }
      ctx.drawImage(sprite, POTATO.x, Math.round(y), POTATO.w, POTATO.h);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 雲(ゆっくり流す)
      const span = W + 80;
      for (let i = 0; i < 3; i++) {
        const cx = ((((i * 260 - distance * 0.15) % span) + span) % span) - 40;
        ctx.drawImage(cloudSprite, Math.round(cx), 28 + i * 22, 33, 9);
      }

      // 地面と目印(速度感を出す)
      ctx.fillStyle = "#64748b";
      ctx.fillRect(0, GROUND, W, 2);
      ctx.fillStyle = "#334155";
      for (let i = 0; i < Math.ceil(W / 97) + 1; i++) {
        const gx = ((((i * 97 - distance) % span) + span) % span) - 40;
        ctx.fillRect(Math.round(gx / 2) * 2, GROUND + 10, i % 2 ? 6 : 12, 2);
      }

      for (const o of obstacles) {
        const sprite = forkSprite(o.rows);
        for (let i = 0; i * (FORK_W + FORK_GAP) < o.w; i++) {
          ctx.drawImage(sprite, Math.round(o.x + i * (FORK_W + FORK_GAP)), GROUND - o.h, FORK_W, o.h);
        }
      }

      drawPotato();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 14px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`HI ${pad(highScore)}  ${pad(score())}`, W - 16, 24);

      ctx.textAlign = "center";
      ctx.fillStyle = "#e2e8f0";
      if (status === "idle") {
        ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
        ctx.fillText("Space / ↑ / タップでスタート", W / 2, 80);
      } else if (status === "paused") {
        ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
        ctx.fillText("一時停止中 — Space / タップで再開", W / 2, 80);
      } else if (status === "over") {
        ctx.font = "bold 22px ui-monospace, monospace";
        ctx.fillText("GAME OVER", W / 2, 72);
        ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
        ctx.fillText("Space / ↑ / タップでリトライ", W / 2, 98);
      }
    };

    // 画面幅に合わせて描画サイズを決める(大きい画面ほど拡大。幅は論理座標で伸びる)
    const resize = () => {
      const cssW = canvas.clientWidth;
      if (cssW === 0) return;
      const dpr = window.devicePixelRatio || 1;
      const viewScale = Math.max(0.75, Math.min(cssW / 640, 2.4, (window.innerHeight * 0.6) / H));
      const cssH = Math.round(H * viewScale);
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      W = cssW / viewScale;
      ctx.setTransform((canvas.width / cssW) * viewScale, 0, 0, (canvas.height / cssH) * viewScale, 0, 0);
      ctx.imageSmoothingEnabled = false; // ドット絵をぼかさない
      draw();
    };

    const collides = () => {
      const px = POTATO.x + 6;
      const pw = POTATO.w - 12;
      const py = y + 6;
      const ph = POTATO.h - 12;
      return obstacles.some(
        (o) => px < o.x + o.w - 4 && px + pw > o.x + 4 && py + ph > GROUND - o.h
      );
    };

    const update = (dt: number) => {
      speed = Math.min(MAX_SPEED, speed + ACCEL * dt);
      distance += speed * dt;

      vy += GRAVITY * dt;
      y = Math.min(groundY, y + vy * dt);
      if (y >= groundY) vy = 0;
      // 最低限の高さに届いたあとにキーを離していたら、上昇を弱めて小ジャンプにする
      else if (!holding && vy < -CUT_V && groundY - y >= MIN_JUMP_HEIGHT) vy = -CUT_V;

      for (const o of obstacles) o.x -= speed * dt;
      obstacles = obstacles.filter((o) => o.x + o.w > 0);

      spawnIn -= speed * dt;
      if (spawnIn <= 0) {
        const big = distance > BIG_FORK_FROM && Math.random() < 0.4;
        const r = Math.random();
        const count = big ? (r < 0.7 ? 1 : 2) : r < 0.5 ? 1 : r < 0.8 ? 2 : 3;
        const w = FORK_W * count + FORK_GAP * (count - 1);
        const rows = big ? BIG_FORK_ROWS : SMALL_FORK_ROWS;
        obstacles.push({ x: W, w, h: rows * PX, rows });
        spawnIn = w + speed * rand(0.9, 1.6);
      }
    };

    const loop = (now: number) => {
      // 最初のフレームは now が last より前になることがあるので、負にしない
      const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
      last = now;
      update(dt);

      if (collides()) {
        status = "over";
        overAt = now;
        commitScore();
      }
      draw();
      if (status === "running") raf = requestAnimationFrame(loop);
    };

    const run = () => {
      status = "running";
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      y = groundY;
      vy = 0;
      speed = BASE_SPEED;
      distance = 0;
      spawnIn = 400;
      obstacles = [];
      run();
    };

    const jump = () => {
      holding = true;
      if (status === "idle") start();
      else if (status === "over") {
        if (performance.now() - overAt > RETRY_DELAY_MS) start();
      } else if (status === "paused") run();
      else if (y >= groundY) vy = JUMP_V;
    };
    jumpRef.current = jump;

    const release = () => {
      holding = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || (e.code !== "Space" && e.code !== "ArrowUp")) return;
      if (e.target instanceof Element && e.target.closest("a, button, input, textarea, select")) return;
      if (isCovered()) return;
      e.preventDefault();
      jump();
    };

    // タブが非表示の間は止める
    const onVisibilityChange = () => {
      if (document.hidden && status === "running") {
        cancelAnimationFrame(raf);
        status = "paused";
        draw();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") release();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // 自動では始めない。Space / ↑ / タップで始まる(本家の恐竜と同じ)
    resize();

    return () => {
      // プレイ中に離れても、更新したハイスコアは残す
      if (status === "running" || status === "paused") commitScore();
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="ジャンプするポテトのゲーム。Space、上矢印キー、またはタップでジャンプします。"
      onPointerDown={() => jumpRef.current()}
      className="block w-full touch-none select-none border-y border-slate-800 bg-slate-900/50"
    />
  );
}
