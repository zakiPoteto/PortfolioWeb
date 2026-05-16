import Image from "next/image";
import { GitHubIcon } from "./Icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20" />
            <Image
              src="/icon.jpg"
              alt="zakiPoteto"
              width={36}
              height={36}
              className="rounded-full object-cover relative z-10 border border-white/10"
            />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">zakiPoteto</span>
        </div>
        <a
          href="https://github.com/zakiPoteto"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
        >
          <GitHubIcon size={20} />
          GitHub
        </a>
      </div>
    </header>
  );
}
