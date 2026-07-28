export interface TikTokVideoInfo {
  id: string;
  title: string;
  duration: number;
  thumbnailUrl: string;
}

export interface TikTokUploadParams {
  videoBuffer: Buffer;
  title: string;
  privacy: 'public' | 'private' | 'unlisted';
}

export interface TikTokProvider {
  getVideoInfo(videoId: string): Promise<TikTokVideoInfo>;
  uploadVideo(params: TikTokUploadParams): Promise<{ videoId: string; url: string }>;
}

export class MockTikTokProvider implements TikTokProvider {
  async getVideoInfo(videoId: string): Promise<TikTokVideoInfo> {
    return {
      id: videoId,
      title: 'Mock TikTok Video',
      duration: 60,
      thumbnailUrl: `https://mock.tiktok.com/thumb/${videoId}.jpg`,
    };
  }

  async uploadVideo(params: TikTokUploadParams): Promise<{ videoId: string; url: string }> {
    const videoId = 'mock_tt_' + Math.random().toString(36).substring(7);
    return {
      videoId,
      url: `https://tiktok.com/@user/video/${videoId}`,
    };
  }
}

export function getTikTokProvider(): TikTokProvider {
  return new MockTikTokProvider();
}
