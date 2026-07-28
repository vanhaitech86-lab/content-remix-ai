import { AnalysisResult, ScriptConfig, Script, Scene } from '@/types';
import { generateId } from '@/lib/utils';

export interface AITextProvider {
  analyzeContent(transcript: string): Promise<AnalysisResult>;
  generateScript(config: ScriptConfig, analysis: AnalysisResult, transcript: string): Promise<Script>;
  rewriteSection(scene: Scene, instructions: string): Promise<Scene>;
  generateHookVariants(config: ScriptConfig, count: number): Promise<string[]>;
  generateCTAVariants(config: ScriptConfig, count: number): Promise<string[]>;
}

export class MockAITextProvider implements AITextProvider {
  async analyzeContent(transcript: string): Promise<AnalysisResult> {
    return {
      mainTopic: 'Khởi nghiệp với trí tuệ nhân tạo',
      targetAudience: ['Người trẻ khởi nghiệp', 'Lập trình viên', 'Người làm marketing'],
      keyPoints: [
        'AI đang thay đổi cách thức kinh doanh',
        'Tự động hóa quy trình với AI',
        'Tạo nội dung hàng loạt'
      ],
      tone: 'truyền cảm hứng, chuyên gia',
      sentiment: 'tích cực',
      keywords: ['AI', 'khởi nghiệp', 'tự động hóa', 'ChatGPT', 'công cụ AI'],
      summary: 'Video chia sẻ về cách sử dụng AI để tối ưu hóa quy trình làm việc và bắt đầu mô hình kinh doanh mới, giảm chi phí vận hành.'
    };
  }

  async generateScript(config: ScriptConfig, analysis: AnalysisResult, transcript: string): Promise<Script> {
    return {
      id: generateId(),
      projectId: 'temp',
      title: 'Khởi nghiệp AI - Script Tạo Tự Động',
      estimatedTotalDuration: 60,
      scenes: [
        {
          id: generateId(),
          order: 0,
          visualHook: 'Hiển thị đồ thị doanh thu tăng trưởng đột biến với logo AI ở giữa màn hình.',
          narration: 'Bạn có biết AI có thể giúp bạn tiết kiệm đến 80% thời gian làm việc mỗi ngày?',
          estimatedDuration: 5,
          isLocked: false
        },
        {
          id: generateId(),
          order: 1,
          visualHook: 'Người ngồi gõ phím mệt mỏi, chuyển cảnh sang máy tính tự động chạy code.',
          narration: 'Thay vì hì hục làm việc tay chân, đây là 3 công cụ AI giúp bạn tự động hóa hoàn toàn.',
          estimatedDuration: 8,
          isLocked: false
        },
        {
          id: generateId(),
          order: 2,
          visualHook: 'Screen record cách sử dụng ChatGPT và Midjourney nhanh chóng.',
          narration: 'Đầu tiên là ChatGPT để lên kịch bản, thứ hai là Midjourney cho hình ảnh, và thứ ba là công cụ clone giọng nói.',
          estimatedDuration: 15,
          isLocked: false
        }
      ]
    };
  }

  async rewriteSection(scene: Scene, instructions: string): Promise<Scene> {
    return {
      ...scene,
      narration: scene.narration + ' (Đã viết lại theo yêu cầu: ' + instructions + ')'
    };
  }

  async generateHookVariants(config: ScriptConfig, count: number): Promise<string[]> {
    return [
      'Bí mật kiếm tiền với AI mà 99% người chưa biết.',
      'Dừng ngay việc dùng ChatGPT theo cách cũ nếu không muốn tụt hậu!',
      '3 công cụ AI miễn phí sẽ thay đổi hoàn toàn cách bạn làm việc.'
    ].slice(0, count);
  }

  async generateCTAVariants(config: ScriptConfig, count: number): Promise<string[]> {
    return [
      'Bấm follow để xem thêm mẹo AI hữu ích!',
      'Lưu ngay video này lại để áp dụng nhé.',
      'Bạn đang dùng công cụ nào? Bình luận bên dưới nhé!'
    ].slice(0, count);
  }
}

export function getAITextProvider(): AITextProvider {
  // Check env or config to decide which provider to use
  // Currently defaulting to Mock
  return new MockAITextProvider();
}
