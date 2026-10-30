"use client";

import dynamic from "next/dynamic";

// ゲームのコードはトップページのバンドルに載せず、表示するときだけ読み込む
const PotatoGame = dynamic(() => import("./PotatoGame"), {
  ssr: false,
  loading: () => <div className="w-full max-w-[600px] aspect-[3/1]" />,
});

export default PotatoGame;
