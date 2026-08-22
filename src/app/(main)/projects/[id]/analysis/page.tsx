'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, Zap, Search, MessageSquare, Lightbulb, RefreshCw, BarChart2, Heart, Crosshair } from 'lucide-react';
import Link from 'next/link';
import { useProjectStore } from '@/store/project-store';

export default function AnalysisPage({ params }: { params: { id: string } }) {
  const { transcript } = useProjectStore();
  
  const mainTopic = transcript?.text ? transcript.text.substring(0, 50) + "..." : "Cách sử dụng React Hooks hiệu quả cho người mới";

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Phân tích nội dung AI</h2>
          <p className="text-gray-400 text-sm mt-1">Đã trích xuất thông tin chính từ video gốc để làm nền tảng cho kịch bản mới.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 bg-[#1A1533] hover:bg-white/5">
            <RefreshCw className="w-4 h-4 mr-2" /> Phân tích lại
          </Button>
          <Link href={`/projects/${params.id}/script`}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20">
              Tiếp tục tạo kịch bản <Zap className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1 */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/40 to-[#1A1533] border-purple-500/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-2 mb-4 text-purple-300">
              <Crosshair className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Chủ đề chính</h3>
            </div>
            <p className="text-xl font-bold text-white leading-tight mb-2">{mainTopic}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-purple-500/20 text-purple-200">Tự động hóa</Badge>
              <Badge className="bg-purple-500/20 text-purple-200">AI</Badge>
              <Badge className="bg-purple-500/20 text-purple-200">Sáng tạo</Badge>
            </div>
          </Card>

          <Card className="bg-[#1A1533]/50 border-white/5 p-6">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold">Đối tượng khán giả</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>Sinh viên IT, người mới học lập trình web</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>Lập trình viên muốn chuyển sang dùng React</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span>Độ tuổi: 18 - 30</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-[#1A1533]/50 border-white/5 p-6">
            <div className="flex items-center gap-2 mb-4 text-green-400">
              <Heart className="w-5 h-5" />
              <h3 className="font-semibold">Nỗi đau khán giả (Pain points)</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="bg-[#0F0B1A] p-3 rounded-lg border border-white/5">Khó hiểu vòng đời của component khi mới tiếp cận</li>
              <li className="bg-[#0F0B1A] p-3 rounded-lg border border-white/5">Gặp lỗi vô tận (infinite loop) với useEffect</li>
              <li className="bg-[#0F0B1A] p-3 rounded-lg border border-white/5">Code bị rối khi state quá phức tạp</li>
            </ul>
          </Card>
        </div>

        {/* Cột 2 */}
        <div className="space-y-6">
          <Card className="bg-[#1A1533]/50 border-white/5 p-6">
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <Zap className="w-5 h-5" />
              <h3 className="font-semibold">Hook mở đầu nổi bật</h3>
            </div>
            <p className="text-gray-300 italic text-lg leading-relaxed border-l-2 border-yellow-500/50 pl-4 py-1">
              "Bạn đã bao giờ làm crash trình duyệt chỉ vì một cái useEffect viết sai chưa? Đừng lo, 90% lập trình viên React đều từng như vậy..."
            </p>
          </Card>

          <Card className="bg-[#1A1533]/50 border-white/5 p-6">
            <div className="flex items-center gap-2 mb-4 text-pink-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-semibold">Luận điểm chính</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-pink-500/20 text-pink-400 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h4 className="font-medium text-gray-200">useState không cập nhật ngay lập tức</h4>
                  <p className="text-sm text-gray-400 mt-1">Giải thích cơ chế batching của React.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-pink-500/20 text-pink-400 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h4 className="font-medium text-gray-200">useEffect dependency array là cạm bẫy</h4>
                  <p className="text-sm text-gray-400 mt-1">Cách xử lý stale closures và dependencies.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-pink-500/20 text-pink-400 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h4 className="font-medium text-gray-200">Custom Hooks là vũ khí tối thượng</h4>
                  <p className="text-sm text-gray-400 mt-1">Cách tái sử dụng logic hiệu quả.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Cột 3 */}
        <div className="space-y-6">
           <Card className="bg-[#1A1533]/50 border-white/5 p-6 h-full">
            <div className="flex items-center gap-2 mb-6 text-cyan-400">
              <BarChart2 className="w-5 h-5" />
              <h3 className="font-semibold">Cấu trúc nội dung đề xuất</h3>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>
              
              <div className="relative pl-10 pb-6">
                <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1.5 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                <h4 className="text-white font-medium">Hook (0-5s)</h4>
                <p className="text-sm text-gray-400 mt-1">Gây sốc với lỗi useEffect phổ biến</p>
              </div>
              
              <div className="relative pl-10 pb-6">
                <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5"></div>
                <h4 className="text-white font-medium">Vấn đề (5-15s)</h4>
                <p className="text-sm text-gray-400 mt-1">Đồng cảm với khó khăn của người mới</p>
              </div>
              
              <div className="relative pl-10 pb-6">
                <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5"></div>
                <h4 className="text-white font-medium">Giải pháp (15-45s)</h4>
                <p className="text-sm text-gray-400 mt-1">Giải thích 3 rules cốt lõi của Hooks</p>
              </div>
              
              <div className="relative pl-10 pb-6">
                <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-pink-500 mt-1.5"></div>
                <h4 className="text-white font-medium">Ví dụ (45-55s)</h4>
                <p className="text-sm text-gray-400 mt-1">So sánh code Before/After</p>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-3 w-2.5 h-2.5 rounded-full bg-yellow-400 mt-1.5"></div>
                <h4 className="text-white font-medium">Call to Action (55-60s)</h4>
                <p className="text-sm text-gray-400 mt-1">Kêu gọi lưu video và follow</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
