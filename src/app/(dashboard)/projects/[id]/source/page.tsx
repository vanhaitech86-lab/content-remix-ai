'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link2, Upload, FileText, Type, CheckCircle, Youtube, Info, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SourcePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [consent, setConsent] = useState(false);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push(`/projects/${params.id}/transcript`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Nguồn nội dung
        </h2>
        <p className="text-gray-400">Chọn nguồn nội dung để hệ thống AI phân tích và xử lý</p>
      </div>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-4 bg-[#1A1533] p-1 rounded-xl">
          <TabsTrigger value="url" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
            <Link2 className="w-4 h-4 mr-2" /> URL Video
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
            <Upload className="w-4 h-4 mr-2" /> Tải lên
          </TabsTrigger>
          <TabsTrigger value="transcript" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
            <FileText className="w-4 h-4 mr-2" /> File Text
          </TabsTrigger>
          <TabsTrigger value="manual" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all">
            <Type className="w-4 h-4 mr-2" /> Nhập thủ công
          </TabsTrigger>
        </TabsList>

        <Card className="mt-6 border-white/10 bg-[#1A1533]/50 backdrop-blur-md overflow-hidden">
          <div className="p-6">
            <TabsContent value="url" className="mt-0 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Đường dẫn YouTube, TikTok, Facebook</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Youtube className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input 
                    type="url" 
                    placeholder="https://www.youtube.com/watch?v=..." 
                    className="pl-10 bg-[#0F0B1A] border-white/10 text-white focus-visible:ring-purple-500 h-12"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
              
              {url && (
                <div className="p-4 rounded-lg bg-[#2D2545]/50 border border-white/5 flex gap-4">
                  <div className="w-32 h-20 bg-black rounded overflow-hidden relative flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80" className="object-cover w-full h-full opacity-70" alt="Video thumbnail" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Youtube className="text-red-500 w-8 h-8 drop-shadow-md" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-medium text-white line-clamp-1">Hướng dẫn React JS cho người mới bắt đầu 2024</h4>
                    <div className="flex items-center text-xs text-gray-400 mt-1 gap-2">
                      <span className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1"/> Công khai</span>
                      <span>•</span>
                      <span>Tiếng Việt</span>
                      <span>•</span>
                      <span>15:24</span>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-[#0F0B1A]/50 hover:bg-[#0F0B1A] transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Kéo thả file video/audio vào đây</h3>
                <p className="text-sm text-gray-400 mb-6">Hỗ trợ: MP4, MP3, WAV, M4A (Tối đa 500MB)</p>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">Chọn file từ máy tính</Button>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="mt-0">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-[#0F0B1A]/50 hover:bg-[#0F0B1A] transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Tải lên file phụ đề / văn bản</h3>
                <p className="text-sm text-gray-400 mb-6">Hỗ trợ: SRT, VTT, TXT, DOCX</p>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">Chọn file từ máy tính</Button>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="mt-0">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nhập hoặc dán nội dung văn bản</label>
                <Textarea 
                  placeholder="Dán kịch bản hoặc transcript của bạn vào đây..." 
                  className="min-h-[200px] bg-[#0F0B1A] border-white/10 text-white focus-visible:ring-purple-500 resize-y"
                />
              </div>
            </TabsContent>
          </div>
          
          <div className="bg-[#0F0B1A] border-t border-white/5 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5 mt-0.5">
                <input 
                  id="consent" 
                  type="checkbox" 
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-600 focus:ring-offset-gray-800" 
                />
              </div>
              <label htmlFor="consent" className="text-sm text-gray-300 cursor-pointer">
                Tôi xác nhận mình sở hữu hoặc có quyền sử dụng và phân tích nội dung này theo <a href="#" className="text-purple-400 hover:underline">Điều khoản sử dụng</a>.
              </label>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleAnalyze} 
                disabled={!consent || isAnalyzing}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 h-12 shadow-[0_0_20px_rgba(124,58,237,0.3)] w-full sm:w-auto text-lg"
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : 'Phân tích Video'}
              </Button>
            </div>
          </div>
        </Card>
      </Tabs>
    </div>
  );
}
