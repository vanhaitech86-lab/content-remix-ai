'use client';

import { ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HistoryPage() {
  const history = [
    { id: 1, title: 'Review iPhone 15 Pro Max', platform: 'TikTok', date: '10/07/2026 14:30', status: 'success', views: '1.2K' },
    { id: 2, title: 'Top 5 AI Tools', platform: 'YouTube', date: '09/07/2026 09:15', status: 'success', views: '345' },
    { id: 3, title: 'Hướng dẫn Next.js', platform: 'YouTube', date: '08/07/2026 16:45', status: 'pending', views: '-' },
    { id: 4, title: 'Nấu ăn cơ bản', platform: 'Instagram', date: '07/07/2026 20:00', status: 'failed', views: '-' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Lịch sử đăng bài</h1>
        <p className="text-slate-400 mt-1">Theo dõi trạng thái xuất bản video lên các nền tảng</p>
      </div>

      <Card className="glass border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 bg-white/5 uppercase border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Video</th>
                <th className="px-6 py-4 font-medium">Nền tảng</th>
                <th className="px-6 py-4 font-medium">Thời gian</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Lượt xem</th>
                <th className="px-6 py-4 font-medium text-right">Link</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{item.title}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-white/10 text-slate-300">
                      {item.platform}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{item.date}</td>
                  <td className="px-6 py-4">
                    {item.status === 'success' && <span className="flex items-center gap-1.5 text-green-400"><CheckCircle className="w-4 h-4"/> Thành công</span>}
                    {item.status === 'pending' && <span className="flex items-center gap-1.5 text-brand-blue"><Clock className="w-4 h-4"/> Chờ duyệt</span>}
                    {item.status === 'failed' && <span className="flex items-center gap-1.5 text-red-400"><XCircle className="w-4 h-4"/> Thất bại</span>}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-300">{item.views}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="inline-flex text-slate-500 hover:text-brand-purple transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
