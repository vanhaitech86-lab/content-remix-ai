// Simple similarity computation using Levenshtein distance or word overlap
export function computeSimilarity(text1: string, text2: string): number {
  if (!text1 || !text2) return 0;
  
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  let intersection = 0;
  for (const word of set1) {
    if (set2.has(word)) {
      intersection++;
    }
  }
  
  // Jaccard index
  const union = set1.size + set2.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
