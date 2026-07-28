export const ProjectStatus = {
  DRAFT: 'draft',
  PROCESSING: 'processing',
  READY: 'ready',
  RENDERED: 'rendered',
  PUBLISHED: 'published',
  FAILED: 'failed'
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export const TaskStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export type Platform = 'youtube' | 'tiktok' | 'youtube_shorts';
export type SourceType = 'url' | 'upload' | 'manual';
export type TranscriptSource = 'api' | 'stt' | 'manual' | 'file';
export type ScriptTone = 'expert' | 'friendly' | 'humorous' | 'dramatic' | 'neutral_review' | 'hard_sell';
export type ScriptFormula = 'aida' | 'pas' | 'problem_solution' | 'storytelling' | 'hook_value_cta';
export type CreativityLevel = 'safe' | 'balanced' | 'breakthrough';
export type ExportFormat = 'tiktok' | 'youtube_shorts' | 'youtube' | 'square';
export type VideoQuality = 'low' | 'medium' | 'high';
export type VoiceGender = 'male' | 'female' | 'neutral';

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: 'user' | 'admin';
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  sourceMediaId?: string;
  transcriptId?: string;
  analysisId?: string;
  scriptId?: string;
}

export interface SourceMedia {
  id: string;
  projectId: string;
  type: SourceType;
  url?: string;
  platform?: Platform;
  videoId?: string;
  originalName?: string;
  duration?: number;
  fileSize?: number;
}

export interface TranscriptSegment {
  id: string;
  text: string;
  start: number;
  end: number;
}

export interface Transcript {
  id: string;
  projectId: string;
  source: TranscriptSource;
  text: string;
  segments: TranscriptSegment[];
}

export interface ContentAnalysis {
  id: string;
  projectId: string;
  mainTopic: string;
  targetAudience: string[];
  keyPoints: string[];
  tone: string;
  sentiment: string;
  keywords: string[];
  summary: string;
}

export interface AnalysisResult extends Omit<ContentAnalysis, 'id' | 'projectId'> {}

export interface Scene {
  id: string;
  order: number;
  visualHook: string;
  narration: string;
  estimatedDuration: number;
  isLocked: boolean;
}

export interface Script {
  id: string;
  projectId: string;
  title: string;
  scenes: Scene[];
  estimatedTotalDuration: number;
  similarityScore?: number;
}

export interface ScriptConfig {
  topic: string;
  productName?: string;
  productInfo?: string;
  targetCustomer: string;
  goal: string;
  platform: Platform;
  duration: number;
  language: string;
  tone: ScriptTone;
  formula: ScriptFormula;
  creativityLevel: CreativityLevel;
  cta?: string;
  requiredKeywords?: string;
  excludedContent?: string;
}

export interface Asset {
  id: string;
  projectId: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  name: string;
}

export interface RenderJob {
  id: string;
  projectId: string;
  status: TaskStatus;
  format: ExportFormat;
  resolution: string;
  fps: number;
  quality: VideoQuality;
  embedSubs: boolean;
  watermark: boolean;
  progress: number;
  outputUrl?: string;
}

export interface RenderedVideo {
  id: string;
  projectId: string;
  renderJobId: string;
  url: string;
  format: ExportFormat;
  duration: number;
  fileSize: number;
}

export interface PlatformConnection {
  id: string;
  userId: string;
  platform: Platform;
  accountId: string;
  accountName: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface PublishingJob {
  id: string;
  projectId: string;
  platform: Platform;
  status: TaskStatus;
  title: string;
  description: string;
  tags: string[];
  privacy: 'public' | 'private' | 'unlisted';
  publishedUrl?: string;
}

export interface SimilarityResult {
  score: number;
  highlightedSegments: { start: number; end: number; text: string }[];
  warnings: string[];
}
