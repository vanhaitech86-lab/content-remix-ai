export interface TTSVoice {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  language: string;
  previewUrl?: string;
}

export interface TTSOptions {
  voice: string;
  language?: string;
  speed?: number;
  emotion?: string;
  gender?: 'male' | 'female' | 'neutral';
}

export interface TTSProvider {
  getVoices(): Promise<TTSVoice[]>;
  synthesize(text: string, options: TTSOptions): Promise<Buffer>;
}

export class MockTTSProvider implements TTSProvider {
  async getVoices(): Promise<TTSVoice[]> {
    return [
      { id: 'vi-male-1', name: 'Nam Phương', gender: 'male', language: 'vi-VN' },
      { id: 'vi-female-1', name: 'Ngọc Lan', gender: 'female', language: 'vi-VN' },
      { id: 'en-male-1', name: 'John Doe', gender: 'male', language: 'en-US' },
    ];
  }

  async synthesize(text: string, options: TTSOptions): Promise<Buffer> {
    // Return an empty buffer to mock audio data
    return Buffer.from('Mock audio data ' + text);
  }
}

export function getTTSProvider(): TTSProvider {
  return new MockTTSProvider();
}
