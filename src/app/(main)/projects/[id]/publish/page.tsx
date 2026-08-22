'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Youtube, Calendar, Clock, Globe, Lock, EyeOff, Share2, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function PublishPage({ params }: { params: { id: string } }) {
  const [platform, setPlatform] = useState('youtube');
  const [scheduled, setScheduled] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsDone(true);
      setTimeout(() => router.push('/dashboard'), 3000);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 pb-10">
      
      {/* Left: Form */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Đăng tải Video</h2>
          <p className="text-gray-400 text-sm mt-1">Đăng trực tiếp lên các nền tảng hoặc lên lịch đăng.</p>
        </div>

        <Tabs value={platform} onValueChange={setPlatform} className="w-full">
          <TabsList className="grid grid-cols-2 bg-[#1A1533] p-1 rounded-xl h-12">
            <TabsTrigger value="youtube" className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg">
              <Youtube className="w-4 h-4 mr-2" /> YouTube Shorts
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-lg border border-transparent data-[state=active]:border-white/20">
              <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              TikTok
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="bg-[#1A1533]/50 border-white/10 p-6 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
            <img src="https://github.com/shadcn.png" className="w-10 h-10 rounded-full border border-white/20" alt="Avatar"/>
            <div>
              <p className="text-sm text-gray-300">Đăng với tư cách</p>
              <p className="font-semibold text-white">DevTips Vietnam (YouTube)</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto text-blue-400 hover:text-blue-300">Đổi tài khoản</Button>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Tiêu đề (Bắt buộc)</Label>
            <Input 
              defaultValue="Lỗi useEffect KHỦNG KHIẾP mà 90% Dev React mắc phải 😱" 
              className="bg-[#0F0B1A] border-white/10 text-white h-12"
            />
            <p className="text-xs text-gray-500 text-right">54/100</p>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Mô tả (Description)</Label>
            <Textarea 
              defaultValue="Bạn có bao giờ gặp lỗi infinite loop khi dùng useEffect chưa? Xem ngay video này để biết nguyên nhân và cách khắc phục cực dễ nhé! 👇\n\n#reactjs #javascript #laptrinh #frontend #coding" 
              className="min-h-[120px] bg-[#0F0B1A] border-white/10 text-white resize-none"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="font-medium text-white">Chế độ hiển thị</h4>
            
            <div className="grid grid-cols-3 gap-3">
              <label className="flex flex-col items-center justify-center p-3 border border-purple-500 bg-purple-500/10 rounded-lg cursor-pointer">
                <input type="radio" name="privacy" value="public" defaultChecked className="hidden" />
                <Globe className="w-5 h-5 text-purple-400 mb-1" />
                <span className="text-sm font-medium text-white">Công khai</span>
              </label>
              <label className="flex flex-col items-center justify-center p-3 border border-white/10 bg-[#0F0B1A] rounded-lg cursor-pointer hover:border-white/30">
                <input type="radio" name="privacy" value="unlisted" className="hidden" />
                <EyeOff className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-sm font-medium text-gray-300">Không công khai</span>
              </label>
              <label className="flex flex-col items-center justify-center p-3 border border-white/10 bg-[#0F0B1A] rounded-lg cursor-pointer hover:border-white/30">
                <input type="radio" name="privacy" value="private" className="hidden" />
                <Lock className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-sm font-medium text-gray-300">Riêng tư</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Lên lịch đăng tải</h4>
                <p className="text-xs text-gray-400">Chọn thời gian để video tự động publish</p>
              </div>
              <Switch checked={scheduled} onCheckedChange={setScheduled} />
            </div>
            
            {scheduled && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs">Ngày</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input type="date" className="pl-9 bg-[#0F0B1A] border-white/10 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs">Giờ</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input type="time" className="pl-9 bg-[#0F0B1A] border-white/10 text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white h-12 text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <Share2 className="w-5 h-5 mr-2" /> {scheduled ? 'Lên lịch (Demo)' : 'Xuất bản ngay (Demo)'}
          </Button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="w-full lg:w-[350px] shrink-0">
        <h3 className="font-medium text-white mb-4 hidden lg:block">Xem trước (Preview)</h3>
        
        {/* Mock Mobile Phone Frame */}
        <div className="w-full max-w-[320px] mx-auto bg-black rounded-[40px] p-3 border-4 border-gray-800 shadow-2xl relative overflow-hidden aspect-[9/19]">
          {/* Top Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-xl w-32 mx-auto"></div>
          
          {/* Screen Content */}
          <div className="bg-gray-900 w-full h-full rounded-[30px] overflow-hidden relative">
            {/* Video Area (Mock) */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-black text-white drop-shadow-lg leading-tight uppercase stroke-black">
                  LỖI USEEFFECT
                </h1>
              </div>
            </div>

            {/* UI Overlay */}
            <div className="absolute right-3 bottom-32 flex flex-col items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur"></div>
              <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur"></div>
              <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur"></div>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-4 left-4 right-16 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                <span className="font-semibold text-sm">@DevTips_VN</span>
              </div>
              <p className="text-xs line-clamp-2">Lỗi useEffect KHỦNG KHIẾP mà 90% Dev React mắc phải 😱 #reactjs #javascript</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-200/80 leading-relaxed">
            Lưu ý: API Upload của YouTube và TikTok có giới hạn hàng ngày. Phiên bản này đang sử dụng Mock API để demo flow chức năng.
          </p>
        </div>

        {/* Publish Action */}
        {isDone ? (
          <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Đăng tải thành công! 🎉</h3>
            <p className="text-green-200/70 text-sm">Video đang được xử lý trên nền tảng. Đang chuyển về Dashboard...</p>
          </div>
        ) : (
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="mt-6 w-full h-14 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 disabled:opacity-70 text-white font-bold text-lg rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
          >
            {isPublishing ? (
              <><svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Đang đăng tải...</>
            ) : (
              <><Share2 className="w-5 h-5" /> Đăng tải ngay lên {platform === 'youtube' ? 'YouTube Shorts' : 'TikTok'}</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
