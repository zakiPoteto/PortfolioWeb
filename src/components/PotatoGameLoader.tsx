"use client";

import dynamic from "next/dynamic";

// ゲームのコードはトップページのバンドルに載せず、表示するときだけ読み込む
const PotatoGame = dynamic(() => import("./PotatoGame"), {
  ssr: false,
  // 読み込み後のキャンバスと同じ高さにして、表示が動かないようにする(PotatoGame の resize と同じ式)
  loading: () => <div className="w-full h-[max(165px,min(34.375vw,528px,60vh))]" />,
});

export default PotatoGame;
