'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Download, GripHorizontal, Edit3, ArrowRight, Wand2, Play } from 'lucide-react';

const mockScenes = [
  { id: 1, duration: '3s', visual: 'Quay cận mặt, biểu cảm giật mình', dialogue: 'Bạn đã bao giờ làm crash trình duyệt chỉ vì useEffect?', bg: 'from-purple-900/60 to-blue-900/60', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=500' },
  { id: 2, duration: '7s', visual: 'Màn hình code đầy lỗi đỏ', dialogue: '90% anh em dev React đều từng dính chưởng này.', bg: 'from-red-900/50 to-gray-900', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=500' },
  { id: 3, duration: '15s', visual: 'Vẽ sơ đồ đơn giản lên màn hình', dialogue: 'Bí kíp sống còn: Kiểm soát dependency array.', bg: 'from-blue-900/60 to-cyan-900/40', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500' },
  { id: 4, duration: '10s', visual: 'So sánh 2 đoạn code Before/After', dialogue: 'Refactor thành Custom Hook siêu sạch sẽ.', bg: 'from-green-900/50 to-gray-900', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=500' },
  { id: 5, duration: '10s', visual: 'Người nói mỉm cười tự tin', dialogue: 'Nhớ 3 quy tắc vàng này nhé.', bg: 'from-purple-900/60 to-blue-900/60', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=500' },
  { id: 6, duration: '5s', visual: 'Chỉ tay xuống dưới màn hình', dialogue: 'Lưu video và follow mình!', bg: 'from-gray-800 to-gray-900', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=500' },
];

export default function StoryboardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [generatedIds, setGeneratedIds] = useState<number[]>([]);

  const handleGenerateImage = (id: number) => {
    setGeneratingId(id);
    setTimeout(() => {
      setGeneratingId(null);
      setGeneratedIds(prev => [...prev, id]);
    }, 2000);
  };

  const handleGenerateAll = () => {
    mockScenes.forEach((scene, i) => {
      setTimeout(() => {
        setGeneratingId(scene.id);
        setTimeout(() => {
          setGeneratingId(null);
          setGeneratedIds(prev => [...prev, scene.id]);
        }, 1500);
      }, i * 500);
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-4 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Storyboard Trực quan</h2>
          <p className="text-gray-400 text-sm mt-1">Gợi ý hình ảnh cho từng cảnh quay dựa trên kịch bản.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            onClick={handleGenerateAll}
          >
            <Wand2 className="w-4 h-4 mr-2" /> Tạo ảnh AI hàng loạt
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200">
            <Download className="w-4 h-4 mr-2" /> Xuất PDF
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {mockScenes.map((scene, i) => (
            <Card key={scene.id} className="bg-[#1A1533]/50 border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all">
              {/* Thumbnail */}
              <div className={`aspect-video w-full relative bg-gradient-to-br ${scene.bg} border-b border-white/5 flex items-center justify-center`}>
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded font-mono">
                  Cảnh {i + 1} • {scene.duration}
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                  <GripHorizontal className="w-4 h-4 text-gray-300" />
                </div>

                {generatedIds.includes(scene.id) ? (
                  <div className="absolute inset-0 overflow-hidden group/image">
                    <img src={scene.image} alt={scene.visual} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover/image:scale-110" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30 shadow-lg">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                        <span className="text-xs text-white font-medium drop-shadow-md">Xem trước</span>
                      </div>
                    </div>
                    {/* Badge "Đã tạo AI" */}
                    <div className="absolute bottom-2 right-2 bg-green-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur shadow">
                      ĐÃ TẠO AI
                    </div>
                  </div>
                ) : generatingId === scene.id ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center">
                      <svg className="animate-spin w-8 h-8 text-purple-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs text-purple-300">Đang tạo ảnh...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-8 h-8 text-white mb-2" />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-7 text-xs bg-white/20 hover:bg-white/30 text-white border-0"
                      onClick={() => handleGenerateImage(scene.id)}
                    >
                      Tạo ảnh AI
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Góc máy & Hình ảnh</h4>
                  <p className="text-sm text-gray-200">{scene.visual}</p>
                </div>
                <div className="bg-[#0F0B1A] p-3 rounded border border-white/5 relative">
                  <h4 className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider absolute -top-2 left-2 bg-[#1A1533] px-1">Lời thoại</h4>
                  <p className="text-sm text-gray-300 italic">"{scene.dialogue}"</p>
                </div>
                <div className="flex justify-end pt-1">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 text-xs">
                    <Edit3 className="w-3 h-3 mr-1" /> Chỉnh sửa
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10 pt-4 flex justify-between items-center">
        <Button variant="outline" className="border-white/10" onClick={() => router.back()}>← Quay lại</Button>
        <Button
          onClick={() => router.push(`/projects/${params.id}/editor`)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-8"
        >
          Tiếp theo: Biên tập <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
