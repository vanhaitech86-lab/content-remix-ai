'use client';

import Link from 'next/link';
import { Search, Plus, Filter, MoreVertical, Play, Clock, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';

export default function ProjectsPage() {
  const projects = [
    { id: '1', title: 'Review iPhone 15 Pro Max', status: 'completed', date: '10/07/2026', duration: '0:59', platform: 'TikTok' },
    { id: '2', title: 'Hướng dẫn Next.js App Router', status: 'processing', date: '09/07/2026', duration: '--:--', platform: 'YouTube Shorts' },
    { id: '3', title: 'Top 5 công cụ AI 2024', status: 'draft', date: '08/07/2026', duration: '1:15', platform: 'Instagram Reels' },
    { id: '4', title: 'Cách nấu phở bò chuẩn vị', status: 'completed', date: '05/07/2026', duration: '2:30', platform: 'TikTok' },
    { id: '5', title: 'Du lịch Đà Lạt 3 ngày 2 đêm', status: 'failed', date: '02/07/2026', duration: '--:--', platform: 'YouTube Shorts' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dự án của tôi</h1>
          <p className="text-slate-400 mt-1">Quản lý và chỉnh sửa các video bạn đã tạo</p>
        </div>
        <Link href="/projects/new">
          <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg shadow-brand-purple/20">
            <Plus className="w-4 h-4 mr-2" />
            Dự án mới
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass p-4 rounded-xl border border-white/5">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input 
            placeholder="Tìm kiếm dự án..." 
            className="pl-9 bg-black/20 border-white/10 focus:border-brand-purple focus:ring-brand-purple/20 text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="glass border-white/10 text-slate-300 w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="glass border-white/5 overflow-hidden group hover:border-brand-purple/40 transition-all flex flex-col h-full">
              <div className="aspect-video bg-slate-800 relative group-hover:brightness-110 transition-all cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-10 h-10 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white font-medium">
                  {project.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-black/50 backdrop-blur-md border-white/10 text-white font-normal">
                    {project.platform}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-slate-200 line-clamp-2 cursor-pointer hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <Button variant="ghost" size="icon" className="w-6 h-6 text-slate-500 hover:text-white shrink-0 -mt-1 -mr-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {project.date}
                  </div>
                  
                  {project.status === 'completed' && <span className="text-green-400 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5"/> Hoàn thành</span>}
                  {project.status === 'processing' && <span className="text-brand-blue flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"/> Đang xử lý</span>}
                  {project.status === 'draft' && <span className="text-slate-400">Bản nháp</span>}
                  {project.status === 'failed' && <span className="text-red-400">Lỗi</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState 
          title="Chưa có dự án nào" 
          description="Bắt đầu sáng tạo video đầu tiên của bạn bằng cách tạo một dự án mới."
          action={<Button className="bg-brand-purple hover:bg-brand-purple/90"><Plus className="w-4 h-4 mr-2"/> Tạo dự án đầu tiên</Button>}
        />
      )}
    </div>
  );
}
