"use client";

import dynamic from "next/dynamic";

// ゲームのコードはトップページのバンドルに載せず、表示するときだけ読み込む
const PotatoGame = dynamic(() => import("./PotatoGame"), {
  ssr: false,
  loading: () => <div className="w-full h-[150px]" />,
});

export default PotatoGame;
