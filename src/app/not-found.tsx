import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold text-blue-400">404</p>
      <h1 className="mt-4 text-xl font-semibold">ページが見つかりません</h1>
      <p className="mt-2 text-sm text-slate-400">
        URLが間違っているか、ページが移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-slate-700 px-6 py-2 text-sm hover:border-blue-400 hover:text-blue-400 transition-colors"
      >
        トップへ戻る
      </Link>
    </main>
  );
}
