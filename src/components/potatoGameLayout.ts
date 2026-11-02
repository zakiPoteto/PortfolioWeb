// ゲームの表示サイズ。PotatoGame(canvas)と PotatoGameLoader(読み込み中の枠)が同じクラスを使い、高さをずらさない。
// 高さは幅の 220/640(論理座標の H / 基準幅)。最小は 0.75 倍(165px)、最大は 2.4 倍(528px)と画面の高さの 60%。
// 最小が最大より優先されるので、小さい画面でも 165px は保たれる。
// % や dvh は親の幅・実際の表示領域から決まるので、スクロールバーやスマホの URL バーの伸縮にも追従する。
export const POTATO_GAME_SIZE = "w-full aspect-[640/220] min-h-[165px] max-h-[min(528px,60dvh)]";
