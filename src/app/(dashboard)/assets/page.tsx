'use client';

import { Upload, FileAudio, FileVideo, Image as ImageIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AssetsPage() {
  const assets = [
    { id: 1, name: 'Intro_Music.mp3', type: 'audio', size: '2.4 MB', date: '10/07/2026' },
    { id: 2, name: 'Logo_Animation.mp4', type: 'video', size: '15.6 MB', date: '09/07/2026' },
    { id: 3, name: 'Watermark.png', type: 'image', size: '0.8 MB', date: '08/07/2026' },
    { id: 4, name: 'Background_Beat.mp3', type: 'audio', size: '4.1 MB', date: '05/07/2026' },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'audio': return <FileAudio className="w-8 h-8 text-amber-400" />;
      case 'video': return <FileVideo className="w-8 h-8 text-brand-blue" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-green-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Quản lý Asset</h1>
          <p className="text-slate-400 mt-1">Lưu trữ video, âm thanh và hình ảnh của bạn</p>
        </div>
        <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg shadow-brand-purple/20">
          <Upload className="w-4 h-4 mr-2" />
          Tải lên file
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center glass p-4 rounded-xl border border-white/5">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input 
            placeholder="Tìm kiếm file..." 
            className="pl-9 bg-black/20 border-white/10 focus:border-brand-purple"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Badge variant="secondary" className="bg-brand-purple/20 text-brand-purple border-brand-purple/30 cursor-pointer shrink-0">Tất cả</Badge>
          <Badge variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 cursor-pointer shrink-0">Video</Badge>
          <Badge variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 cursor-pointer shrink-0">Âm thanh</Badge>
          <Badge variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 cursor-pointer shrink-0">Hình ảnh</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="glass border-white/5 hover:border-brand-purple/30 transition-all cursor-pointer group p-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-black/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {getIcon(asset.type)}
            </div>
            <h3 className="font-medium text-sm text-slate-200 truncate w-full mb-1">{asset.name}</h3>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>{asset.size}</span>
              <span>•</span>
              <span>{asset.date}</span>
            </div>
          </Card>
        ))}
        
        <Card className="glass border-white/5 border-dashed hover:border-brand-purple/30 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] text-slate-400 hover:text-brand-purple group bg-black/10">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:bg-brand-purple/10 transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">Kéo thả file vào đây</span>
        </Card>
      </div>
    </div>
  );
}
