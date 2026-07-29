'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0B1A] via-[#1A1533] to-[#0F0B1A]">
      <div className="text-center px-6 max-w-lg">
        <div className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue mb-6">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Trang không tồn tại</h1>
        <p className="text-slate-400 mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Về Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Trang chủ
          </Link>
        </div>
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-slate-500 mb-2">Các trang có sẵn:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['/', '/login', '/register', '/dashboard', '/projects', '/settings'].map((path) => (
              <Link
                key={path}
                href={path}
                className="text-xs px-2 py-1 rounded bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30 transition-colors"
              >
                {path}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
