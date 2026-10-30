"use client";

import { useEffect, useRef } from "react";

const W = 600;
const H = 200;
const GROUND = 170;
const GRAVITY = 2400;
const JUMP_V = -750;
const BASE_SPEED = 380;
const MAX_SPEED = 800;
const ACCEL = 8;
const POTATO = { x: 50, w: 34, h: 30 };
const FORK_W = 18;
const RETRY_DELAY_MS = 400;
const HIGH_SCORE_KEY = "potato-jump-high-score";

type Status = "idle" | "running" | "paused" | "over";
type Obstacle = { x: number; w: number; h: number };

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

export default function PotatoGame({ autoStart = false }: { autoStart?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

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
    let last = 0;
    let raf = 0;

    const score = () => Math.floor(distance / 10);

    const drawPotato = () => {
      const { x, w, h } = POTATO;
      const cx = x + w / 2;
      const cy = y + (h - 6) / 2;
      const grounded = y >= groundY;

      // 足(走っている間だけ交互に動かす)
      ctx.strokeStyle = "#8a6a2f";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      const step = status === "running" && grounded && Math.floor(distance / 12) % 2 === 0;
      const legs: [number, number][] = grounded ? (step ? [[-6, 4], [6, 0]] : [[-6, 0], [6, 4]]) : [[-6, 2], [6, 2]];
      for (const [dx, lift] of legs) {
        ctx.beginPath();
        ctx.moveTo(cx + dx, y + h - 6);
        ctx.lineTo(cx + dx, y + h - lift);
        ctx.stroke();
      }

      // 体
      ctx.fillStyle = "#d4a85f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, w / 2, (h - 6) / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 斑点
      ctx.fillStyle = "#b08a45";
      ctx.beginPath();
      ctx.arc(cx - 7, cy + 3, 2, 0, Math.PI * 2);
      ctx.arc(cx + 1, cy + 6, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 目(ゲームオーバー時は×)
      ctx.strokeStyle = "#3b2a12";
      ctx.fillStyle = "#3b2a12";
      ctx.lineWidth = 1.5;
      if (status === "over") {
        ctx.beginPath();
        ctx.moveTo(cx + 3, cy - 6);
        ctx.lineTo(cx + 9, cy - 1);
        ctx.moveTo(cx + 9, cy - 6);
        ctx.lineTo(cx + 3, cy - 1);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(cx + 6, cy - 3, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // 障害物はフォーク(ポテトの天敵)
    const drawFork = (fx: number, h: number) => {
      const top = GROUND - h;
      ctx.beginPath();
      ctx.moveTo(fx + 3, top);
      ctx.lineTo(fx + 3, top + 14);
      ctx.moveTo(fx + 9, top);
      ctx.lineTo(fx + 9, GROUND);
      ctx.moveTo(fx + 15, top);
      ctx.lineTo(fx + 15, top + 14);
      ctx.moveTo(fx + 3, top + 14);
      ctx.lineTo(fx + 15, top + 14);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 1);
      ctx.lineTo(W, GROUND + 1);
      ctx.stroke();

      // 地面の目印(速度感を出す)
      ctx.fillStyle = "#334155";
      for (let i = 0; i < 8; i++) {
        const gx = (((i * 97 - distance) % W) + W) % W;
        ctx.fillRect(gx, GROUND + 10, 10, 2);
      }

      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 3;
      ctx.lineCap = "butt";
      for (const o of obstacles) {
        for (let i = 0; i * (FORK_W + 4) < o.w; i++) drawFork(o.x + i * (FORK_W + 4), o.h);
      }

      drawPotato();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "14px ui-monospace, monospace";
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
        ctx.font = "bold 22px ui-sans-serif, system-ui, sans-serif";
        ctx.fillText("GAME OVER", W / 2, 72);
        ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
        ctx.fillText("Space / ↑ / タップでリトライ", W / 2, 98);
      }
    };

    const collides = () => {
      const px = POTATO.x + 4;
      const pw = POTATO.w - 8;
      const py = y + 4;
      const ph = POTATO.h - 8;
      return obstacles.some(
        (o) => px < o.x + o.w - 3 && px + pw > o.x + 3 && py + ph > GROUND - o.h
      );
    };

    const update = (dt: number) => {
      speed = Math.min(MAX_SPEED, speed + ACCEL * dt);
      distance += speed * dt;

      vy += GRAVITY * dt;
      y = Math.min(groundY, y + vy * dt);
      if (y >= groundY) vy = 0;

      for (const o of obstacles) o.x -= speed * dt;
      obstacles = obstacles.filter((o) => o.x + o.w > 0);

      spawnIn -= speed * dt;
      if (spawnIn <= 0) {
        const count = Math.random() < 0.3 ? 2 : 1;
        const w = FORK_W * count + 4 * (count - 1);
        obstacles.push({ x: W, w, h: rand(34, 46) });
        spawnIn = w + speed * rand(0.9, 1.6);
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);

      if (collides()) {
        status = "over";
        overAt = now;
        if (score() > highScore) {
          highScore = score();
          saveHighScore(highScore);
        }
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
      if (status === "idle") start();
      else if (status === "over") {
        if (performance.now() - overAt > RETRY_DELAY_MS) start();
      } else if (status === "paused") run();
      else if (y >= groundY) vy = JUMP_V;
    };
    jumpRef.current = jump;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || (e.code !== "Space" && e.code !== "ArrowUp")) return;
      if (e.target instanceof Element && e.target.closest("a, button, input, textarea, select")) return;
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

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);

    draw();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (autoStart && !reducedMotion && !document.hidden) start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [autoStart]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="ジャンプするポテトのゲーム。Space、上矢印キー、またはタップでジャンプします。"
      onPointerDown={() => jumpRef.current()}
      className="w-full max-w-[600px] aspect-[3/1] touch-none select-none rounded-xl border border-slate-800 bg-slate-900/50"
    />
  );
}
