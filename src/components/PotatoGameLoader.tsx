"use client";

import dynamic from "next/dynamic";
import { POTATO_GAME_SIZE } from "./potatoGameLayout";

// ゲームのコードはトップページのバンドルに載せず、表示するときだけ読み込む
const PotatoGame = dynamic(() => import("./PotatoGame"), {
  ssr: false,
  // 読み込み後のキャンバスと同じサイズにして、表示が動かないようにする
  loading: () => <div className={POTATO_GAME_SIZE} />,
});

// 枠線は canvas ではなくここに付ける(canvas に付けると描画領域が枠の分だけ縮む)
export default function PotatoGameLoader() {
  return (
    <div className="border-y border-slate-800 bg-slate-900/50">
      <PotatoGame />
    </div>
  );
}
