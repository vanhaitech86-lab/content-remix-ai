'use client';

import { User, Key, Bell, Shield, Moon, Monitor } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/app-store';

export default function SettingsPage() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Cài đặt</h1>
        <p className="text-slate-400 mt-1">Quản lý tài khoản và tùy chọn hệ thống</p>
      </div>

      <div className="grid gap-6">
        {/* Profile */}
        <Card className="glass border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-brand-purple" />
            <h2 className="text-lg font-semibold text-white">Hồ sơ cá nhân</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                U
              </div>
              <Button variant="outline" size="sm" className="glass border-white/10 text-xs">Thay đổi ảnh</Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Tên hiển thị</label>
                  <Input defaultValue="User Name" className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <Input defaultValue="user@example.com" disabled className="bg-black/20 border-white/10 opacity-50" />
                </div>
              </div>
              <Button className="bg-brand-purple hover:bg-brand-purple/90">Lưu thay đổi</Button>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="glass border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="w-5 h-5 text-brand-blue" />
            <h2 className="text-lg font-semibold text-white">Giao diện</h2>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20">
            <div>
              <p className="font-medium text-slate-200">Chế độ nền tối</p>
              <p className="text-sm text-slate-400">Chuyển đổi giao diện sáng/tối</p>
            </div>
            <Button variant="outline" onClick={toggleTheme} className="glass border-white/10">
              {theme === 'dark' ? <Moon className="w-4 h-4 mr-2" /> : <Monitor className="w-4 h-4 mr-2" />}
              {theme === 'dark' ? 'Đang bật' : 'Đang tắt'}
            </Button>
          </div>
        </Card>

        {/* API Keys */}
        <Card className="glass border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Khóa API (Bring Your Own Key)</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">OpenAI API Key (Tùy chọn)</label>
              <div className="flex gap-2">
                <Input type="password" placeholder="sk-..." className="bg-black/20 border-white/10" />
                <Button variant="outline" className="glass border-white/10">Lưu</Button>
              </div>
              <p className="text-xs text-slate-500">Sử dụng key của bạn để không bị trừ credit hệ thống</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">ElevenLabs API Key (Tùy chọn)</label>
              <div className="flex gap-2">
                <Input type="password" placeholder="..." className="bg-black/20 border-white/10" />
                <Button variant="outline" className="glass border-white/10">Lưu</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="glass border-red-500/20 bg-red-500/5 p-6 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">Vùng nguy hiểm</h2>
          </div>
          <p className="text-sm text-slate-400 mb-4">Xóa tài khoản sẽ xóa toàn bộ dữ liệu, video và cấu hình của bạn. Hành động này không thể hoàn tác.</p>
          <Button variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30">
            Xóa tài khoản
          </Button>
        </Card>
      </div>
    </div>
  );
}
