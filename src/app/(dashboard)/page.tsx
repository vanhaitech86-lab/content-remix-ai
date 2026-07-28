

import Link from 'next/link';
import { Video, Sparkles, Coins, Upload, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const stats = [
    { label: 'Dự án', value: '12', icon: Video, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { label: 'Video đã tạo', value: '34', icon: Sparkles, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { label: 'Đã xuất bản', value: '28', icon: Upload, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Credits còn lại', value: '850', icon: Coins, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  const recentProjects = [
    { id: '1', title: 'Review iPhone 15 Pro Max', status: 'Hoàn thành', date: '2 giờ trước', platform: 'TikTok' },
    { id: '2', title: 'Hướng dẫn Next.js App Router', status: 'Đang xử lý', date: '5 giờ trước', platform: 'YouTube Shorts' },
    { id: '3', title: 'Top 5 công cụ AI 2024', status: 'Bản nháp', date: '1 ngày trước', platform: 'Instagram Reels' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Chào buổi sáng, User 👋</h1>
          <p className="text-slate-400">Sẵn sàng tạo ra những video triệu view hôm nay?</p>
        </div>
        <Link href="/projects/new">
          <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg shadow-brand-purple/20">
            <Plus className="w-4 h-4 mr-2" />
            Tạo dự án mới
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="glass border-white/5 p-6 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Dự án gần đây</h2>
            <Link href="/projects" className="text-sm text-brand-blue hover:text-brand-blue/80 font-medium">
              Xem tất cả
            </Link>
          </div>
          <div className="grid gap-4">
            {recentProjects.map((project) => (
              <Card key={project.id} className="glass border-white/5 p-4 flex items-center gap-4 hover:border-brand-purple/30 transition-all cursor-pointer group">
                <div className="w-24 h-16 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 relative group-hover:ring-2 ring-brand-purple/50 transition-all">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-200 truncate group-hover:text-brand-blue transition-colors">{project.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>{project.platform}</span>
                    <span>•</span>
                    <span>{project.date}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                    project.status === 'Hoàn thành' ? 'bg-green-400/10 text-green-400' :
                    project.status === 'Đang xử lý' ? 'bg-brand-blue/10 text-brand-blue' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* System Status / Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Sử dụng Credit</h2>
          <Card className="glass border-white/5 p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Gói Pro (Tháng 7)</span>
                  <span className="font-medium text-slate-200">150 / 1000</span>
                </div>
                <Progress value={15} className="h-2 bg-slate-800" indicatorClassName="bg-gradient-to-r from-brand-purple to-brand-blue" />
              </div>
              <Button variant="outline" className="w-full glass border-brand-purple/20 hover:bg-brand-purple/10 text-brand-purple">
                Nâng cấp gói
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
