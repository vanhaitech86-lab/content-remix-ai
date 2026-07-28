import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { computeSimilarity } from "@/lib/similarity";

const scriptConfigSchema = z.object({
  projectId: z.string(),
  analysisId: z.string(),
  targetPlatform: z.string(),
  targetDuration: z.number().optional(),
  originalText: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = scriptConfigSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    const scenes = [];
    for (let i = 1; i <= 6; i++) {
      scenes.push({
        id: `scene-${i}`,
        sceneNumber: i,
        visuals: `Visual description for scene ${i}`,
        narration: `This is the narration for scene ${i}.`,
        duration: 5,
      });
    }

    let similarityScore = 0;
    if (result.data.originalText) {
      similarityScore = computeSimilarity(result.data.originalText, scenes.map(s => s.narration).join(" "));
    }

    const mockScript = {
      id: "mock-script-1",
      projectId: result.data.projectId,
      title: "Generated Script Title",
      platform: result.data.targetPlatform,
      scenes,
      similarityScore,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ script: mockScript }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
