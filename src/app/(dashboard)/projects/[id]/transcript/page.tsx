'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, Download, Play, Save, Settings2, Trash2, Edit3, Plus, AlertTriangle } from 'lucide-react';

const mockSegments = [
  { id: 1, start: '00:00', end: '00:05', speaker: 'Speaker 1', text: 'Chào mừng các bạn đã quay trở lại với kênh của mình.', confidence: 0.98 },
  { id: 2, start: '00:05', end: '00:12', speaker: 'Speaker 1', text: 'Hôm nay chúng ta sẽ cùng tìm hiểu về cách sử dụng React Hooks trong thực tế.', confidence: 0.95 },
  { id: 3, start: '00:12', end: '00:18', speaker: 'Speaker 1', text: 'Như các bạn đã biết, React Hooks đã thay đổi hoàn toàn cách chúng ta viết component.', confidence: 0.82 },
  { id: 4, start: '00:18', end: '00:25', speaker: 'Speaker 1', text: 'Tuy nhiên phần này hơi khó nghe nên có thể AI nhận dạng sai một chút.', confidence: 0.65 },
  { id: 5, start: '00:25', end: '00:30', speaker: 'Speaker 1', text: 'Vậy thì hãy cùng bắt đầu ngay thôi nào.', confidence: 0.99 },
];

export default function TranscriptPage() {
  const [segments, setSegments] = useState(mockSegments);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Chỉnh sửa Transcript</h2>
          <p className="text-gray-400 text-sm mt-1">125 từ • 00:30</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 bg-[#1A1533] hover:bg-white/5">
            <Download className="w-4 h-4 mr-2" /> Xuất File (SRT/VTT)
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-500 text-white">
            <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-yellow-200 font-medium">Một số đoạn có độ chính xác thấp</p>
          <p className="text-yellow-400/80">AI phát hiện một số đoạn có thể bị sai lệch do tạp âm. Vui lòng kiểm tra lại các đoạn được đánh dấu màu vàng.</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto pr-2 space-y-4 custom-scrollbar pb-10">
        {segments.map((seg) => (
          <div 
            key={seg.id} 
            className={`p-4 rounded-xl border transition-all ${
              seg.confidence < 0.7 
                ? 'bg-yellow-500/5 border-yellow-500/20' 
                : 'bg-[#1A1533]/50 border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-[#0F0B1A] border-white/10 font-mono text-xs text-blue-400">
                  {seg.start} - {seg.end}
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-none">
                  {seg.speaker}
                </Badge>
                {seg.confidence < 0.7 && (
                  <span className="text-xs text-yellow-500 flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded">
                    Độ chính xác: {Math.round(seg.confidence * 100)}%
                  </span>
                )}
              </div>
              <div className="flex gap-1 opacity-50 hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10" onClick={() => setEditingId(seg.id)}>
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-400/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {editingId === seg.id ? (
              <div className="space-y-3">
                <Textarea 
                  defaultValue={seg.text}
                  className="min-h-[80px] bg-[#0F0B1A] border-white/20 text-white focus-visible:ring-purple-500 text-base"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="text-gray-400">Hủy</Button>
                  <Button size="sm" onClick={() => setEditingId(null)} className="bg-purple-600 hover:bg-purple-500 text-white">Xong</Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-200 text-lg leading-relaxed">{seg.text}</p>
            )}
          </div>
        ))}
        
        <div className="flex justify-center mt-4 pt-4 border-t border-white/5">
           <Button variant="outline" className="border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 bg-transparent h-12 rounded-xl w-full">
             <Plus className="w-4 h-4 mr-2" /> Thêm đoạn thoại mới
           </Button>
        </div>
      </div>
    </div>
  );
}
