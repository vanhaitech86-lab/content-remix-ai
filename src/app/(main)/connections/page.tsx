'use client';

import { Youtube, Instagram, Link2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ConnectionsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Kết nối nền tảng</h1>
        <p className="text-slate-400 mt-1">Liên kết các tài khoản mạng xã hội để đăng tải tự động</p>
      </div>

      <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex gap-3 text-brand-blue">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-1">Cần cấu hình API credentials</p>
          <p className="opacity-90">Để tính năng này hoạt động, admin cần thiết lập Google OAuth Client ID và TikTok App ID trong môi trường.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube */}
        <Card className="glass border-white/5 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Youtube className="w-24 h-24 text-red-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">YouTube</h3>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">Đã kết nối</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Channel Name</p>
                  <p className="text-xs text-slate-400">@channelhandle</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full glass border-white/10 text-slate-300 hover:text-white hover:bg-white/5">
              Ngắt kết nối
            </Button>
          </div>
        </Card>

        {/* TikTok */}
        <Card className="glass border-white/5 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">TikTok</h3>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-400 border-white/10">Chưa kết nối</Badge>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 h-[52px]">Kết nối tài khoản TikTok để đăng video trực tiếp từ nền tảng mà không cần tải xuống.</p>

            <Button className="w-full bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white border-0">
              <Link2 className="w-4 h-4 mr-2" />
              Kết nối với TikTok
            </Button>
          </div>
        </Card>

        {/* Instagram */}
        <Card className="glass border-white/5 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Instagram className="w-24 h-24 text-pink-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Instagram</h3>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-400 border-white/10">Chưa kết nối</Badge>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 h-[52px]">Kết nối tài khoản Instagram Creator/Business để đăng Reels tự động.</p>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white border-0">
              <Link2 className="w-4 h-4 mr-2" />
              Kết nối với Instagram
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
