export default function ErrorView({
  digest,
  onRetry,
}: {
  digest?: string;
  onRetry: () => void;
}) {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold text-blue-400">Error</p>
      <h1 className="mt-4 text-xl font-semibold">問題が発生しました</h1>
      <p className="mt-2 text-sm text-slate-400">
        一時的なエラーかもしれません。もう一度お試しください。
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-8 rounded-full border border-slate-700 px-6 py-2 text-sm hover:border-blue-400 hover:text-blue-400 transition-colors"
      >
        再読み込み
      </button>
      {digest && (
        <p className="mt-6 text-xs text-slate-500">エラーID: {digest}</p>
      )}
    </main>
  );
}
