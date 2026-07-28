'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Download, Play, GripHorizontal, Edit3 } from 'lucide-react';

const mockScenes = [
  { id: 1, duration: '3s', visual: 'Quay cận mặt, biểu cảm giật mình', dialogue: 'Bạn đã bao giờ làm crash trình duyệt chỉ vì useEffect?', bg: 'from-purple-900/50 to-blue-900/50' },
  { id: 2, duration: '7s', visual: 'Màn hình code đầy lỗi đỏ', dialogue: '90% anh em dev React đều từng dính chưởng này.', bg: 'from-red-900/40 to-gray-900' },
  { id: 3, duration: '15s', visual: 'Vẽ sơ đồ đơn giản lên màn hình', dialogue: 'Bí kíp sống còn: Kiểm soát dependency array.', bg: 'from-blue-900/50 to-cyan-900/30' },
  { id: 4, duration: '10s', visual: 'So sánh 2 đoạn code Before/After', dialogue: 'Refactor thành Custom Hook siêu sạch.', bg: 'from-green-900/40 to-gray-900' },
  { id: 5, duration: '10s', visual: 'Người nói mỉm cười tự tin', dialogue: 'Nhớ 3 quy tắc vàng này nhé.', bg: 'from-purple-900/50 to-blue-900/50' },
  { id: 6, duration: '5s', visual: 'Chỉ tay xuống dưới màn hình', dialogue: 'Lưu video và follow mình!', bg: 'from-gray-800 to-gray-900' },
];

export default function StoryboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Storyboard Trực quan</h2>
          <p className="text-gray-400 text-sm mt-1">Gợi ý hình ảnh cho từng cảnh quay dựa trên kịch bản.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
            <ImageIcon className="w-4 h-4 mr-2" /> Tạo ảnh AI hàng loạt
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200">
            <Download className="w-4 h-4 mr-2" /> Xuất PDF (Demo)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockScenes.map((scene, i) => (
          <Card key={scene.id} className="bg-[#1A1533]/50 border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all">
            {/* Thumbnail Placeholder */}
            <div className={`aspect-video w-full relative bg-gradient-to-br ${scene.bg} border-b border-white/5 flex items-center justify-center`}>
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded font-mono">
                Cảnh {i + 1} • {scene.duration}
              </div>
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                <GripHorizontal className="w-4 h-4 text-gray-300" />
              </div>
              
              <div className="flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-8 h-8 text-white mb-2" />
                <Button variant="secondary" size="sm" className="h-7 text-xs bg-white/20 hover:bg-white/30 text-white border-0">
                  Tạo ảnh AI
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Góc máy & Hình ảnh</h4>
                <p className="text-sm text-gray-200">{scene.visual}</p>
              </div>
              
              <div className="bg-[#0F0B1A] p-3 rounded border border-white/5 relative">
                <h4 className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider absolute -top-2 left-2 bg-[#1A1533] px-1">Lời thoại</h4>
                <p className="text-sm text-gray-300 italic">"{scene.dialogue}"</p>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 text-xs">
                  <Edit3 className="w-3 h-3 mr-1" /> Chỉnh sửa
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
