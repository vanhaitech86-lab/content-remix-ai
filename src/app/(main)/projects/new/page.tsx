'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video, Youtube, Instagram, Wand2, Link as LinkIcon, Upload, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function NewProjectPage() {
  const router = useRouter();
  const [sourceType, setSourceType] = useState<'url' | 'upload' | 'text'>('url');
  const [platform, setPlatform] = useState('tiktok');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Generate a mock project ID and redirect to the source workflow
    const mockProjectId = `proj_${Date.now()}`;
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/projects/${mockProjectId}/source`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Tạo dự án mới</h1>
        <p className="text-slate-400 mt-1">Chọn nguồn nội dung và nền tảng đích để bắt đầu remix</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-slate-200">1. Nguồn nội dung</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className={`glass p-4 cursor-pointer transition-all border ${sourceType === 'url' ? 'border-brand-purple bg-brand-purple/5 shadow-lg shadow-brand-purple/10' : 'border-white/5 hover:border-white/20'}`}
              onClick={() => setSourceType('url')}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${sourceType === 'url' ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-400'}`}>
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-white mb-1">Từ URL</h3>
              <p className="text-xs text-slate-400">YouTube, TikTok, Instagram...</p>
            </Card>
            
            <Card 
              className={`glass p-4 cursor-pointer transition-all border ${sourceType === 'upload' ? 'border-brand-purple bg-brand-purple/5 shadow-lg shadow-brand-purple/10' : 'border-white/5 hover:border-white/20'}`}
              onClick={() => setSourceType('upload')}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${sourceType === 'upload' ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-white mb-1">Tải lên file</h3>
              <p className="text-xs text-slate-400">Video hoặc Audio cục bộ</p>
            </Card>

            <Card 
              className={`glass p-4 cursor-pointer transition-all border ${sourceType === 'text' ? 'border-brand-purple bg-brand-purple/5 shadow-lg shadow-brand-purple/10' : 'border-white/5 hover:border-white/20'}`}
              onClick={() => setSourceType('text')}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${sourceType === 'text' ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-white mb-1">Tạo từ Text</h3>
              <p className="text-xs text-slate-400">AI Script to Video</p>
            </Card>
          </div>

          <Card className="glass border-white/5 p-6 mt-4">
            {sourceType === 'url' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Dán link video nguồn</label>
                <Input placeholder="https://youtube.com/watch?v=..." className="bg-black/20 border-white/10 focus:border-brand-purple" required />
              </div>
            )}
            {sourceType === 'upload' && (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-300">Kéo thả file vào đây hoặc click để chọn</p>
                <p className="text-xs text-slate-500 mt-1">Hỗ trợ MP4, MOV, MP3 (Tối đa 500MB)</p>
              </div>
            )}
            {sourceType === 'text' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nhập chủ đề hoặc script (AI sẽ tối ưu)</label>
                <Textarea placeholder="Ví dụ: Tạo video 60s hướng dẫn làm pancake giảm cân..." className="bg-black/20 border-white/10 focus:border-brand-purple min-h-[120px]" required />
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-slate-200">2. Thông tin dự án</h2>
          <Card className="glass border-white/5 p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Tên dự án</label>
              <Input placeholder="Nhập tên dự án..." className="bg-black/20 border-white/10 focus:border-brand-purple" required />
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-slate-300">Nền tảng đích (Tỷ lệ khung hình)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div 
                  className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${platform === 'tiktok' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
                  onClick={() => setPlatform('tiktok')}
                >
                  <Video className="w-6 h-6" />
                  <span className="text-sm font-medium">TikTok (9:16)</span>
                </div>
                <div 
                  className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${platform === 'shorts' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
                  onClick={() => setPlatform('shorts')}
                >
                  <Youtube className="w-6 h-6" />
                  <span className="text-sm font-medium">Shorts (9:16)</span>
                </div>
                <div 
                  className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${platform === 'reels' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
                  onClick={() => setPlatform('reels')}
                >
                  <Instagram className="w-6 h-6" />
                  <span className="text-sm font-medium">Reels (9:16)</span>
                </div>
                <div 
                  className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${platform === 'youtube' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
                  onClick={() => setPlatform('youtube')}
                >
                  <Youtube className="w-6 h-6" />
                  <span className="text-sm font-medium">YouTube (16:9)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <Button variant="ghost" type="button" onClick={() => router.back()}>Hủy</Button>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 text-white min-w-[150px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Đang tạo...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Tiếp tục
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
