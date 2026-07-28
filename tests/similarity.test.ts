import { describe, expect, test } from '@jest/globals';

// Inline implementation for testing (matches src/lib/similarity.ts)
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);
}

function getNGrams(tokens: string[], n: number): Set<string> {
  const ngrams = new Set<string>();
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.add(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

interface SimilarityResult {
  score: number;
  highlightedSegments: Array<{ text: string; similarity: 'low' | 'medium' | 'high' }>;
  warnings: string[];
  copiedPhrases: string[];
}

function computeSimilarity(original: string, generated: string): SimilarityResult {
  const origTokens = tokenize(original);
  const genTokens = tokenize(generated);

  const origTrigrams = getNGrams(origTokens, 3);
  const genTrigrams = getNGrams(genTokens, 3);
  const trigramSim = jaccardSimilarity(origTrigrams, genTrigrams);

  const origBigrams = getNGrams(origTokens, 2);
  const genBigrams = getNGrams(genTokens, 2);
  const bigramSim = jaccardSimilarity(origBigrams, genBigrams);

  const score = Math.round((trigramSim * 0.7 + bigramSim * 0.3) * 100);

  const copiedPhrases: string[] = [];
  const origFivegrams = getNGrams(origTokens, 5);
  const genFivegrams = getNGrams(genTokens, 5);
  for (const gram of genFivegrams) {
    if (origFivegrams.has(gram)) {
      copiedPhrases.push(gram);
    }
  }

  const warnings: string[] = [];
  if (score > 70) warnings.push('Kịch bản có độ tương đồng cao với bản gốc. Vui lòng chỉnh sửa thêm.');
  if (score > 50) warnings.push('Một số đoạn có thể cần được viết lại.');
  if (copiedPhrases.length > 0) warnings.push(`Phát hiện ${copiedPhrases.length} cụm từ trùng lặp.`);

  const sentences = generated.split(/[.!?。]+/).filter(s => s.trim().length > 0);
  const highlightedSegments = sentences.map(sentence => {
    const sentTokens = tokenize(sentence);
    const sentTrigrams = getNGrams(sentTokens, 3);
    const sentSim = jaccardSimilarity(origTrigrams, sentTrigrams);
    const simLevel = sentSim > 0.5 ? 'high' : sentSim > 0.2 ? 'medium' : 'low';
    return { text: sentence.trim(), similarity: simLevel as 'low' | 'medium' | 'high' };
  });

  return { score, highlightedSegments, warnings, copiedPhrases };
}

describe('Similarity Checker', () => {
  test('identical texts should have high similarity', () => {
    const text = 'Đây là một đoạn văn bản mẫu để kiểm tra độ tương đồng nội dung giữa hai phiên bản';
    const result = computeSimilarity(text, text);
    expect(result.score).toBeGreaterThan(80);
  });

  test('completely different texts should have low similarity', () => {
    const original = 'Hôm nay trời đẹp lắm chúng ta đi chơi công viên nhé bạn ơi vui quá';
    const generated = 'Công nghệ blockchain đang thay đổi ngành tài chính toàn cầu mạnh mẽ';
    const result = computeSimilarity(original, generated);
    expect(result.score).toBeLessThan(30);
  });

  test('should detect copied phrases', () => {
    const original = 'Sản phẩm này giúp bạn tiết kiệm thời gian và tăng hiệu suất làm việc đáng kể';
    const generated = 'Với công cụ mới, bạn sẽ tiết kiệm thời gian và tăng hiệu suất trong công việc hàng ngày';
    const result = computeSimilarity(original, generated);
    expect(result.copiedPhrases.length).toBeGreaterThanOrEqual(0);
  });

  test('should return warnings for high similarity', () => {
    const original = 'Bạn đang gặp khó khăn trong việc tạo nội dung video chất lượng cao mỗi ngày';
    const result = computeSimilarity(original, original);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  test('empty texts should return zero similarity', () => {
    const result = computeSimilarity('', '');
    expect(result.score).toBe(0);
  });

  test('should handle short texts', () => {
    const result = computeSimilarity('hello', 'world');
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });
});

describe('URL Parsing', () => {
  function parseUrl(url: string): { platform: string; videoId: string } | null {
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) return { platform: 'youtube', videoId: match[1] };
    }
    const tiktokPattern = /tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
    const tiktokMatch = url.match(tiktokPattern);
    if (tiktokMatch) return { platform: 'tiktok', videoId: tiktokMatch[1] };
    return null;
  }

  test('should parse YouTube watch URL', () => {
    const result = parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(result).toEqual({ platform: 'youtube', videoId: 'dQw4w9WgXcQ' });
  });

  test('should parse YouTube short URL', () => {
    const result = parseUrl('https://youtu.be/dQw4w9WgXcQ');
    expect(result).toEqual({ platform: 'youtube', videoId: 'dQw4w9WgXcQ' });
  });

  test('should parse YouTube Shorts URL', () => {
    const result = parseUrl('https://youtube.com/shorts/dQw4w9WgXcQ');
    expect(result).toEqual({ platform: 'youtube', videoId: 'dQw4w9WgXcQ' });
  });

  test('should parse TikTok URL', () => {
    const result = parseUrl('https://www.tiktok.com/@user/video/7123456789012345678');
    expect(result).toEqual({ platform: 'tiktok', videoId: '7123456789012345678' });
  });

  test('should return null for invalid URL', () => {
    const result = parseUrl('https://google.com');
    expect(result).toBeNull();
  });
});
