'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, SkipBack, SkipForward, Volume2, Type, Music, Image as ImageIcon, Layers, Scissors, Mic, ArrowRight, MousePointer2, Video } from 'lucide-react';

export default function EditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-[#0F0B1A] rounded-xl border border-white/10 overflow-hidden">
      
      {/* Top Half: Layout */}
      <div className="flex-1 flex overflow-hidden border-b border-white/10">
        
        {/* Left Panel: Assets */}
        <div className="w-64 border-r border-white/10 bg-[#1A1533]/50 flex flex-col hidden md:flex">
          <div className="p-2 border-b border-white/10">
            <Tabs defaultValue="stock" className="w-full">
              <TabsList className="grid grid-cols-3 bg-[#0F0B1A] h-9">
                <TabsTrigger value="stock" className="text-xs px-1">Kho</TabsTrigger>
                <TabsTrigger value="ai" className="text-xs px-1">AI</TabsTrigger>
                <TabsTrigger value="mine" className="text-xs px-1">Của tôi</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-2">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-video bg-gray-800 rounded border border-white/5 hover:border-purple-500 cursor-pointer relative group">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                  <PlusIcon />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Preview */}
        <div className="flex-1 flex flex-col bg-black relative">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="bg-black/60 backdrop-blur rounded px-2 py-1 text-xs text-white border border-white/10">1080x1920 (9:16)</div>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            {/* The Video Canvas */}
            <div className="aspect-[9/16] h-full max-h-[500px] bg-gradient-to-br from-purple-900 to-gray-900 rounded-lg shadow-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
              <div className="text-center p-6 relative z-10">
                <h1 className="text-3xl font-black text-white drop-shadow-lg leading-tight uppercase text-center stroke-black stroke-2" style={{textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'}}>
                  LỖI USEEFFECT<br/>ÁM ẢNH
                </h1>
              </div>
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <span className="bg-yellow-400 text-black font-bold px-3 py-1 text-sm rounded">Subtitle Preview Here</span>
              </div>
            </div>
          </div>
          
          {/* Playback Controls */}
          <div className="h-12 border-t border-white/10 bg-[#0F0B1A] flex items-center justify-center gap-4 px-4">
            <span className="text-xs font-mono text-gray-400 absolute left-4">00:00:15 / 00:00:50</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white"><SkipBack className="w-4 h-4" /></Button>
            <Button size="icon" className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white"><Play className="w-4 h-4 ml-1" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white"><SkipForward className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white absolute right-4"><Volume2 className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Right Panel: Properties */}
        <div className="w-64 border-l border-white/10 bg-[#1A1533]/50 hidden lg:block">
          <div className="p-3 border-b border-white/10">
            <h3 className="font-semibold text-sm text-white">Giọng đọc AI (Voice-over)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
               <label className="text-xs text-gray-400">Giọng đọc</label>
               <Button variant="outline" className="w-full justify-between bg-[#0F0B1A] border-white/10 text-white text-sm h-9">
                 <span>Nam Khánh (Hà Nội)</span>
               </Button>
            </div>
            <div className="space-y-2">
               <label className="text-xs text-gray-400">Cảm xúc</label>
               <Button variant="outline" className="w-full justify-between bg-[#0F0B1A] border-white/10 text-white text-sm h-9">
                 <span>Tự tin, chuyên nghiệp</span>
               </Button>
            </div>
            <div className="space-y-2">
               <label className="text-xs text-gray-400">Tốc độ (1.1x)</label>
               <div className="h-2 bg-gray-700 rounded-full w-full mt-2">
                 <div className="h-full bg-purple-500 rounded-full w-[60%] relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                 </div>
               </div>
            </div>
            
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-xs h-9">
              <Mic className="w-3 h-3 mr-2" /> Tạo Voice-over
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Half: Timeline */}
      <div className="h-64 bg-[#0F0B1A] flex flex-col">
        {/* Timeline Tools */}
        <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#1A1533]">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-300 bg-white/10"><MousePointer2 className="w-3.5 h-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white"><Scissors className="w-3.5 h-3.5" /></Button>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white"><Type className="w-3 h-3 mr-1" /> Thêm Text</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white"><Music className="w-3 h-3 mr-1" /> Thêm Nhạc</Button>
        </div>

        {/* Tracks Area */}
        <div className="flex-1 overflow-auto relative custom-scrollbar">
          {/* Time Ruler */}
          <div className="h-6 border-b border-white/5 sticky top-0 bg-[#0F0B1A] z-10 flex ml-[120px]">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="w-20 border-l border-white/10 text-[10px] text-gray-500 pl-1 pt-1">
                00:{String(i * 5).padStart(2, '0')}
              </div>
            ))}
          </div>
          
          {/* Playhead */}
          <div className="absolute top-0 bottom-0 w-px bg-red-500 z-20 left-[320px] pointer-events-none">
            <div className="absolute -top-1 -left-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-red-500"></div>
          </div>

          <div className="flex flex-col">
            <Track name="Video" icon={<Video className="w-3 h-3"/>}>
              <Clip start={0} width={60} color="bg-blue-600" label="Scene 1" />
              <Clip start={60} width={140} color="bg-blue-600/80" label="Scene 2" />
              <Clip start={200} width={300} color="bg-blue-600" label="Scene 3" />
            </Track>
            <Track name="Text/Effect" icon={<Layers className="w-3 h-3"/>}>
              <Clip start={10} width={40} color="bg-pink-600" label="Title Pop" />
              <Clip start={220} width={100} color="bg-pink-600" label="Code Box" />
            </Track>
            <Track name="Subtitle" icon={<Type className="w-3 h-3"/>}>
              <Clip start={0} width={60} color="bg-yellow-600" label="Bạn đã bao giờ..." />
              <Clip start={60} width={140} color="bg-yellow-600" label="Đừng lo, 90%..." />
              <Clip start={200} width={300} color="bg-yellow-600" label="Bí kíp số 1..." />
            </Track>
            <Track name="Voice" icon={<Mic className="w-3 h-3"/>}>
              <Clip start={0} width={55} color="bg-green-600" label="Voice 1" />
              <Clip start={60} width={135} color="bg-green-600" label="Voice 2" />
              <Clip start={200} width={290} color="bg-green-600" label="Voice 3" />
            </Track>
            <Track name="Audio" icon={<Music className="w-3 h-3"/>}>
              <Clip start={0} width={800} color="bg-purple-600" label="Lofi Chill Beat.mp3" />
            </Track>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 px-6 py-3 flex justify-between items-center bg-[#0F0B1A] shrink-0">
        <Button variant="outline" className="border-white/10" onClick={() => router.back()}>← Quay lại</Button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Chỉnh sửa xong?</span>
          <Button
            onClick={() => router.push(`/projects/${params.id}/export`)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-8"
          >
            Tiếp theo: Xuất video <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Track({ name, icon, children }: { name: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="flex h-12 border-b border-white/5">
      <div className="w-[120px] bg-[#1A1533] border-r border-white/10 flex items-center px-2 gap-2 text-xs text-gray-400 sticky left-0 z-10 shrink-0">
        {icon}
        <span className="truncate">{name}</span>
      </div>
      <div className="flex-1 relative bg-[#0F0B1A]">
        {children}
      </div>
    </div>
  );
}

function Clip({ start, width, color, label }: { start: number, width: number, color: string, label: string }) {
  return (
    <div 
      className={`absolute top-1 bottom-1 rounded border border-white/20 ${color} px-2 py-1 overflow-hidden cursor-pointer hover:brightness-110`}
      style={{ left: `${start}px`, width: `${width}px` }}
    >
      <span className="text-[10px] text-white whitespace-nowrap drop-shadow-md font-medium leading-none">{label}</span>
    </div>
  );
}

function PlusIcon() {
  return <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><span className="text-xl leading-none -mt-1">+</span></div>;
}
