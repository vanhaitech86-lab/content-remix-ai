'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings2, Layout as LayoutIcon, Clock, History, Save, Check, ArrowRight, Sparkles, MessageSquare, Plus, Trash2, ChevronUp, ChevronDown, Unlock, RefreshCw } from 'lucide-react';

const mockScenes = [
  { id: 1, time: '0:00 - 0:03', visual: 'Quay cận mặt, biểu cảm giật mình hoảng hốt.', dialogue: 'Bạn đã bao giờ làm crash trình duyệt chỉ vì một cái useEffect viết sai chưa?', text: 'Lỗi useEffect ám ảnh', effect: 'Zoom in nhanh, rung lắc nhẹ', sound: 'Hiệu ứng "Whoosh"' },
  { id: 2, time: '0:03 - 0:10', visual: 'Chuyển cảnh nhanh sang màn hình code đầy lỗi đỏ.', dialogue: 'Đừng lo, 90% anh em dev React đều từng dính chưởng này khi mới học Hooks.', text: '90% Dev đều mắc phải', effect: 'Hiệu ứng Glitch chuyển cảnh', sound: 'Nhạc nền lofi beat' },
  { id: 3, time: '0:10 - 0:25', visual: 'Vẽ sơ đồ đơn giản lên màn hình, chỉ tay giải thích.', dialogue: 'Bí kíp số 1: Luôn kiểm soát dependency array. Để trống = chạy 1 lần. Không có [] = infinite loop!', text: '[ ] = 1 Lần / No [ ] = Infinity', effect: 'Text pop up theo nhịp nói', sound: 'Tiếng pop khi chữ hiện' },
  { id: 4, time: '0:25 - 0:35', visual: 'So sánh 2 đoạn code bên trái và phải màn hình.', dialogue: 'Hãy xem cách refactor đoạn code lộn xộn thành Custom Hook siêu sạch sẽ.', text: 'Before & After', effect: 'Chia đôi màn hình', sound: 'Tiếng ting thành công' },
  { id: 5, time: '0:35 - 0:45', visual: 'Quay trở lại người nói, mỉm cười tự tin.', dialogue: 'Chỉ cần nhớ 3 quy tắc vàng này, bạn sẽ làm chủ React Hooks trong 1 nốt nhạc.', text: 'Làm chủ React Hooks', effect: 'Màu sắc tươi sáng hơn', sound: '' },
  { id: 6, time: '0:45 - 0:50', visual: 'Chỉ tay xuống dưới màn hình.', dialogue: 'Lưu ngay video này lại và follow mình để học thêm về React!', text: 'Lưu & Follow!', effect: 'Hiệu ứng mũi tên chỉ xuống', sound: 'Tiếng chuông notification' },
];

export default function ScriptPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenes] = useState(mockScenes);
  const [saved, setSaved] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2500);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleNext = () => {
    router.push(`/projects/${params.id}/storyboard`);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* CỘT TRÁI: CONFIG */}
      <div className={`flex-shrink-0 flex flex-col bg-[#1A1533]/50 border border-white/5 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${isGenerated ? 'w-full md:w-80' : 'w-full max-w-2xl mx-auto'}`}>
        <div className="p-4 border-b border-white/5 bg-[#0F0B1A]/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-white">Cấu hình kịch bản</h3>
          </div>
          {isGenerated && <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setIsGenerated(false)}>Cài lại</Button>}
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Nền tảng đích</label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="bg-purple-600/20 border-purple-500 text-white hover:bg-purple-600/30">TikTok / Shorts</Button>
              <Button variant="outline" className="bg-[#0F0B1A] border-white/10 text-gray-400 hover:border-white/20">YouTube Dài</Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Mục tiêu video</label>
            <Select defaultValue="edu">
              <SelectTrigger className="bg-[#0F0B1A] border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1533] border-white/10 text-white">
                <SelectItem value="edu">Giáo dục / Chia sẻ kiến thức</SelectItem>
                <SelectItem value="sale">Bán hàng / Chuyển đổi</SelectItem>
                <SelectItem value="brand">Xây dựng thương hiệu</SelectItem>
                <SelectItem value="entertain">Giải trí</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Giọng điệu</label>
            <Select defaultValue="expert">
              <SelectTrigger className="bg-[#0F0B1A] border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1533] border-white/10 text-white">
                <SelectItem value="expert">Chuyên gia, đáng tin cậy</SelectItem>
                <SelectItem value="funny">Hài hước, Gen Z</SelectItem>
                <SelectItem value="story">Kể chuyện, truyền cảm hứng</SelectItem>
                <SelectItem value="dramatic">Kịch tính, gây tò mò</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Công thức kịch bản</label>
            <Select defaultValue="pas">
              <SelectTrigger className="bg-[#0F0B1A] border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1533] border-white/10 text-white">
                <SelectItem value="pas">PAS (Problem → Agitate → Solution)</SelectItem>
                <SelectItem value="aida">AIDA (Attention → Interest → Desire → Action)</SelectItem>
                <SelectItem value="hss">Hook → Story → Solution → CTA</SelectItem>
                <SelectItem value="list">Listicle (Top X lý do, cách làm...)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400">Góc nhìn / Ý tưởng thêm</label>
            <Textarea
              placeholder="Ví dụ: Thêm ví dụ thực tế về dự án e-commerce bị lỗi hook..."
              className="min-h-[80px] bg-[#0F0B1A] border-white/10 text-white resize-none text-sm"
            />
          </div>

          <div className="pt-2 space-y-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg h-11"
            >
              {isGenerating ? (
                <span className="flex items-center"><RefreshCw className="animate-spin w-4 h-4 mr-2" /> Đang tạo AI...</span>
              ) : (
                <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2" /> {isGenerated ? 'Tạo lại kịch bản' : 'Tạo kịch bản AI'}</span>
              )}
            </Button>
            {isGenerated && (
              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg h-11"
              >
                <span className="flex items-center">Tiếp theo: Storyboard <ArrowRight className="w-4 h-4 ml-2" /></span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: KẾT QUẢ & EDITOR */}
      {isGenerated && (
        <div className="flex-1 flex flex-col bg-[#0F0B1A] rounded-xl border border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1A1533]/80">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-3">
                Kịch bản video
                <Badge className="bg-green-500/20 text-green-400 border-none">✓ Độc bản (12% tương đồng)</Badge>
              </h2>
              <div className="flex gap-4 text-xs text-gray-400 mt-1">
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> ~50 giây</span>
                <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> 145 từ</span>
                <span className="flex items-center"><LayoutIcon className="w-3 h-3 mr-1" /> 6 Cảnh</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/10 bg-transparent hover:bg-white/5">
                <History className="w-4 h-4 mr-2" /> Lịch sử
              </Button>
              <Button
                size="sm"
                className={saved ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'}
                onClick={handleSave}
              >
                {saved ? <><Check className="w-4 h-4 mr-1" /> Đã lưu!</> : <><Save className="w-4 h-4 mr-1" /> Lưu</>}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-0">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[80px_1fr_2fr_1fr_1fr_40px] gap-2 p-3 border-b border-white/10 bg-[#1A1533]/50 text-xs font-semibold text-gray-400 sticky top-0 z-10 backdrop-blur-md">
                <div>THỜI GIAN</div>
                <div>CẢNH QUAY</div>
                <div>LỜI THOẠI</div>
                <div>TEXT MÀN HÌNH</div>
                <div>HIỆU ỨNG / SFX</div>
                <div></div>
              </div>
              <div className="p-2 space-y-2">
                {scenes.map((scene, index) => (
                  <div key={scene.id} className="grid grid-cols-[80px_1fr_2fr_1fr_1fr_40px] gap-2 p-3 bg-[#1A1533]/30 rounded-lg border border-white/5 hover:border-purple-500/30 transition-colors group">
                    <div className="text-xs text-blue-400 font-mono mt-2">{scene.time}</div>
                    <div>
                      <Textarea defaultValue={scene.visual} className="min-h-[80px] bg-[#0F0B1A] border-white/10 text-white text-xs resize-none focus:border-purple-500" />
                    </div>
                    <div className="relative">
                      <Textarea defaultValue={scene.dialogue} className="min-h-[80px] bg-[#0F0B1A] border-white/10 text-white text-sm resize-none focus:border-purple-500" />
                      {index === 0 && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Badge className="cursor-pointer bg-purple-600/50 hover:bg-purple-600 text-[10px]">Đổi Hook AI</Badge>
                        </div>
                      )}
                    </div>
                    <div>
                      <Textarea defaultValue={scene.text} className="min-h-[80px] bg-[#0F0B1A] border-white/10 text-yellow-100 text-xs resize-none font-medium focus:border-purple-500" />
                    </div>
                    <div className="space-y-2">
                      <Input defaultValue={scene.effect} className="h-8 bg-[#0F0B1A] border-white/10 text-pink-300 text-xs" />
                      <Input defaultValue={scene.sound} className="h-8 bg-[#0F0B1A] border-white/10 text-cyan-300 text-xs" />
                    </div>
                    <div className="flex flex-col gap-1 items-center opacity-50 group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronUp className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Unlock className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-red-400"><Trash2 className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronDown className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-dashed border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-transparent h-10 mt-2">
                  <Plus className="w-4 h-4 mr-2" /> Thêm cảnh mới
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-4 flex justify-between items-center bg-[#0F0B1A]">
            <Button variant="outline" className="border-white/10" onClick={() => router.back()}>← Quay lại</Button>
            <Button onClick={handleNext} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-8">
              Tiếp theo: Storyboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
