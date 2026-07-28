export interface YouTubeVideoInfo {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
}

export interface YouTubeUploadParams {
  videoBuffer: Buffer;
  title: string;
  description: string;
  tags: string[];
  privacy: 'public' | 'private' | 'unlisted';
}

export interface YouTubeProvider {
  getVideoInfo(videoId: string): Promise<YouTubeVideoInfo>;
  getTranscript(videoId: string): Promise<string>;
  uploadVideo(params: YouTubeUploadParams): Promise<{ videoId: string; url: string }>;
  getChannels(): Promise<{ id: string; title: string }[]>;
}

export class MockYouTubeProvider implements YouTubeProvider {
  async getVideoInfo(videoId: string): Promise<YouTubeVideoInfo> {
    return {
      id: videoId,
      title: 'Mock YouTube Video',
      description: 'This is a mocked video description.',
      duration: 360,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }

  async getTranscript(videoId: string): Promise<string> {
    return 'Mock YouTube transcript: Hôm nay chúng ta sẽ làm video về AI.';
  }

  async uploadVideo(params: YouTubeUploadParams): Promise<{ videoId: string; url: string }> {
    const videoId = 'mock_yt_' + Math.random().toString(36).substring(7);
    return {
      videoId,
      url: `https://youtube.com/watch?v=${videoId}`,
    };
  }

  async getChannels(): Promise<{ id: string; title: string }[]> {
    return [
      { id: 'channel_1', title: 'Kênh Chính Thức' },
      { id: 'channel_2', title: 'Kênh Phụ' },
    ];
  }
}

export function getYouTubeProvider(): YouTubeProvider {
  return new MockYouTubeProvider();
}
