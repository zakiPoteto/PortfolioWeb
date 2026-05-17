export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center space-y-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} zakiPoteto. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
