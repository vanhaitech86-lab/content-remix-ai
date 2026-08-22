'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MonitorPlay, Smartphone, Square, Settings, Download, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExportPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [format, setFormat] = useState('vertical');

  const handleRender = () => {
    setIsRendering(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setIsDone(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleDownloadVideo = () => {
    // Tải về file mp4 mẫu thực sự từ thư mục public
    const a = document.createElement('a');
    a.href = '/demo_video.mp4';
    a.download = `video_render_${params.id}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSubtitles = () => {
    const srtContent = `1\n00:00:00,000 --> 00:00:03,000\nChào mừng bạn đến với Content Remix AI\n\n2\n00:00:03,000 --> 00:00:05,000\nĐây là file phụ đề tự động.`;
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCaptions = () => {
    const captionContent = `🔥 Khám phá bí kíp làm video siêu tốc cùng Content Remix AI!\n\n#ContentRemixAI #VideoCreator #AutoGenerate #Shorts`;
    const blob = new Blob([captionContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions_and_hashtags.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Xuất Video</h2>
        <p className="text-gray-400">Chọn định dạng và cấu hình để render video của bạn</p>
      </div>

      {!isRendering && !isDone && (
        <div className="space-y-8 animate-in fade-in">
          {/* Khung hình */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Định dạng khung hình</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className={`p-6 cursor-pointer border-2 transition-all flex flex-col items-center justify-center gap-3 ${format === 'vertical' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-[#1A1533] hover:border-white/30'}`}
                onClick={() => setFormat('vertical')}
              >
                <div className="w-10 h-16 border-2 border-current rounded bg-current/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">TikTok / Shorts</p>
                  <p className="text-xs text-gray-400 mt-1">9:16 • 1080x1920</p>
                </div>
              </Card>
              
              <Card 
                className={`p-6 cursor-pointer border-2 transition-all flex flex-col items-center justify-center gap-3 ${format === 'horizontal' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-[#1A1533] hover:border-white/30'}`}
                onClick={() => setFormat('horizontal')}
              >
                <div className="w-16 h-10 border-2 border-current rounded bg-current/20 flex items-center justify-center">
                  <MonitorPlay className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">YouTube Video</p>
                  <p className="text-xs text-gray-400 mt-1">16:9 • 1920x1080</p>
                </div>
              </Card>

              <Card 
                className={`p-6 cursor-pointer border-2 transition-all flex flex-col items-center justify-center gap-3 ${format === 'square' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-[#1A1533] hover:border-white/30'}`}
                onClick={() => setFormat('square')}
              >
                <div className="w-12 h-12 border-2 border-current rounded bg-current/20 flex items-center justify-center">
                  <Square className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">Facebook / Insta</p>
                  <p className="text-xs text-gray-400 mt-1">1:1 • 1080x1080</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Settings */}
          <Card className="bg-[#1A1533]/50 border-white/10 p-6">
             <div className="flex items-center gap-2 mb-4">
               <Settings className="w-5 h-5 text-gray-400" />
               <h3 className="text-lg font-medium text-white">Cài đặt nâng cao</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-4">
                 <div>
                   <label className="text-sm text-gray-400 block mb-1">Độ phân giải</label>
                   <select className="w-full bg-[#0F0B1A] border border-white/10 rounded-md h-10 px-3 text-white">
                     <option>1080p (FHD)</option>
                     <option>720p (HD)</option>
                     <option>4K (UHD)</option>
                   </select>
                 </div>
                 <div>
                   <label className="text-sm text-gray-400 block mb-1">Khung hình (FPS)</label>
                   <select className="w-full bg-[#0F0B1A] border border-white/10 rounded-md h-10 px-3 text-white">
                     <option>30 FPS</option>
                     <option>60 FPS</option>
                   </select>
                 </div>
               </div>
               
               <div className="space-y-3">
                  <label className="text-sm text-gray-400 block mb-1">Tùy chọn phụ</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-600 text-purple-600 bg-[#0F0B1A]" />
                    <span className="text-sm text-white">Gắn phụ đề cứng (Hardcode Subs)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 text-purple-600 bg-[#0F0B1A]" />
                    <span className="text-sm text-white">Thêm watermark</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-600 text-purple-600 bg-[#0F0B1A]" />
                    <span className="text-sm text-white">Cải thiện âm thanh AI</span>
                  </label>
               </div>
             </div>
          </Card>

          <div className="flex justify-end pt-4">
             <Button onClick={handleRender} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 h-12 text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)]">
               Bắt đầu Render Video
             </Button>
          </div>
        </div>
      )}

      {isRendering && (
        <Card className="bg-[#1A1533]/80 border-purple-500/30 p-10 text-center space-y-6 max-w-xl mx-auto animate-in zoom-in-95">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="animate-spin w-full h-full text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
              {progress}%
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Đang xử lý Video...</h3>
            <p className="text-gray-400">Vui lòng không đóng trình duyệt. Quá trình này có thể mất vài phút.</p>
          </div>
          
          <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500" />
        </Card>
      )}

      {isDone && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
          <Card className="bg-green-500/10 border-green-500/30 p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Render Thành Công!</h3>
            <p className="text-green-200/70 mb-6">Video của bạn đã sẵn sàng để tải xuống và đăng tải.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleDownloadVideo} className="h-12 bg-purple-600 hover:bg-purple-500 text-white">
                <Download className="w-5 h-5 mr-2" /> Tải Video MP4
              </Button>
              <Button variant="outline" className="h-12 border-white/20 bg-white/5 hover:bg-white/10" onClick={() => router.push(`/projects/${params.id}/publish`)}>
                Đăng tải ngay <MonitorPlay className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          <div className="max-w-2xl mx-auto">
            <h4 className="text-gray-400 font-medium mb-4">Tài nguyên đính kèm</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button onClick={handleDownloadSubtitles} variant="outline" className="justify-start h-auto py-3 border-white/10 bg-[#1A1533] hover:bg-[#2D2545]">
                <FileText className="w-5 h-5 text-blue-400 mr-3" />
                <div className="text-left">
                  <div className="text-white font-medium">File Phụ đề (SRT/VTT)</div>
                  <div className="text-xs text-gray-400">Cho YouTube/Facebook</div>
                </div>
              </Button>
              <Button onClick={handleDownloadCaptions} variant="outline" className="justify-start h-auto py-3 border-white/10 bg-[#1A1533] hover:bg-[#2D2545]">
                <FileText className="w-5 h-5 text-purple-400 mr-3" />
                <div className="text-left">
                  <div className="text-white font-medium">Caption & Hashtags</div>
                  <div className="text-xs text-gray-400">Đã tối ưu SEO</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
