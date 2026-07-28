

import Link from 'next/link';
import { ArrowRight, Video, Scissors, AudioLines, Subtitles, LayoutTemplate, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const features = [
    { icon: Video, title: 'Tạo Video AI', desc: 'Sinh video chất lượng cao với script từ AI' },
    { icon: Scissors, title: 'Cắt Ghép Thông Minh', desc: 'Remix từ URL với công cụ cắt ghép tự động' },
    { icon: AudioLines, title: 'Lồng Tiếng AI', desc: 'Chuyển văn bản thành giọng nói tiếng Việt tự nhiên' },
    { icon: Subtitles, title: 'Tự Động Phụ Đề', desc: 'Tạo và căn chỉnh phụ đề chính xác' },
    { icon: LayoutTemplate, title: 'Template Đa Dạng', desc: 'Nhiều khung hình, bố cục phù hợp với mọi nền tảng' },
    { icon: Sparkles, title: 'Hiệu Ứng Bắt Mắt', desc: 'Thêm hiệu ứng, chuyển cảnh và B-roll tự động' },
    { icon: Share2, title: 'Tự Động Đăng Bài', desc: 'Kết nối và đăng thẳng lên YouTube, TikTok, Reels' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-6 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            Content Remix AI
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Đăng nhập</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">Bắt đầu miễn phí</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 max-w-4xl tracking-tight leading-tight">
          Tạo và Remix Video với <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-purple-400 to-brand-blue">
            Sức Mạnh Của AI
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl">
          Nền tảng tất cả trong một để tạo, chỉnh sửa và phân phối nội dung video cho TikTok, YouTube Shorts và Instagram Reels trong nháy mắt.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 text-white border-0 h-14 px-8 text-lg rounded-xl flex items-center gap-2 group">
              Bắt đầu sáng tạo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl glass border-white/10 hover:bg-white/5">
              Tới Dashboard (Demo)
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="glass border border-white/5 p-6 rounded-2xl hover:border-brand-purple/50 transition-colors text-left flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-200">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
