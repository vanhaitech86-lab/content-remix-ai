import { TranscriptSegment } from '@/types';
import { generateId } from '@/lib/utils';

export interface STTProvider {
  transcribe(audioBuffer: Buffer, language?: string): Promise<{ text: string; segments: TranscriptSegment[] }>;
}

export class MockSTTProvider implements STTProvider {
  async transcribe(audioBuffer: Buffer, language?: string): Promise<{ text: string; segments: TranscriptSegment[] }> {
    return {
      text: "Chào mọi người. Hôm nay mình sẽ hướng dẫn các bạn cách dùng AI để làm video tự động. Thật sự rất nhanh và hiệu quả.",
      segments: [
        {
          id: generateId(),
          text: "Chào mọi người.",
          start: 0,
          end: 1.5
        },
        {
          id: generateId(),
          text: "Hôm nay mình sẽ hướng dẫn các bạn cách dùng AI để làm video tự động.",
          start: 1.5,
          end: 5.0
        },
        {
          id: generateId(),
          text: "Thật sự rất nhanh và hiệu quả.",
          start: 5.0,
          end: 7.5
        }
      ]
    };
  }
}

export function getSTTProvider(): STTProvider {
  return new MockSTTProvider();
}
