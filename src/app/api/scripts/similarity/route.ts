import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { computeSimilarity } from "@/lib/similarity";

const similaritySchema = z.object({
  originalText: z.string(),
  generatedText: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = similaritySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    const { originalText, generatedText } = result.data;
    const score = computeSimilarity(originalText, generatedText);
    
    return NextResponse.json({
      score,
      highlightedSegments: [],
      warnings: score < 0.2 ? ["Very low similarity detected"] : []
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
