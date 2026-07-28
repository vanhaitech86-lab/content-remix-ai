import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Tên dự án không được để trống'),
});

export const validateSourceSchema = z.object({
  url: z.string().url('URL không hợp lệ'),
  sourceType: z.enum(['url', 'upload', 'manual']),
  consentGiven: z.boolean().refine(val => val === true, {
    message: 'Bạn phải xác nhận quyền sở hữu hoặc sự cho phép đối với nội dung này'
  }),
});

export const importTranscriptSchema = z.object({
  text: z.string().min(1, 'Transcript không được để trống'),
  source: z.enum(['api', 'stt', 'manual', 'file']),
});

export const generateTranscriptSchema = z.object({
  sourceMediaId: z.string().uuid('ID media không hợp lệ'),
});

export const createAnalysisSchema = z.object({
  transcriptId: z.string().uuid('ID transcript không hợp lệ'),
});

export const scriptConfigSchema = z.object({
  topic: z.string().min(1, 'Chủ đề không được để trống'),
  productName: z.string().optional(),
  productInfo: z.string().optional(),
  targetCustomer: z.string().min(1, 'Khách hàng mục tiêu không được để trống'),
  goal: z.string().min(1, 'Mục tiêu không được để trống'),
  platform: z.enum(['youtube', 'tiktok', 'youtube_shorts']),
  duration: z.number().min(15).max(3600),
  language: z.string(),
  tone: z.enum(['expert', 'friendly', 'humorous', 'dramatic', 'neutral_review', 'hard_sell']),
  formula: z.enum(['aida', 'pas', 'problem_solution', 'storytelling', 'hook_value_cta']),
  creativityLevel: z.enum(['safe', 'balanced', 'breakthrough']),
  cta: z.string().optional(),
  requiredKeywords: z.string().optional(),
  excludedContent: z.string().optional(),
});

export const rewriteSectionSchema = z.object({
  sceneId: z.string().uuid('ID scene không hợp lệ'),
  instructions: z.string().min(1, 'Hướng dẫn không được để trống'),
});

export const renderJobSchema = z.object({
  format: z.enum(['tiktok', 'youtube_shorts', 'youtube', 'square']),
  resolution: z.string(),
  fps: z.number().min(24).max(60),
  quality: z.enum(['low', 'medium', 'high']),
  embedSubs: z.boolean(),
  watermark: z.boolean(),
});

export const publishJobSchema = z.object({
  platform: z.enum(['youtube', 'tiktok', 'youtube_shorts']),
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string(),
  tags: z.array(z.string()),
  privacy: z.enum(['public', 'private', 'unlisted']),
});

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});
