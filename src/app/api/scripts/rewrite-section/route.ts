import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rewriteSchema = z.object({
  sceneId: z.string(),
  currentText: z.string(),
  instructions: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = rewriteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    // Mock rewrite
    const updatedScene = {
      id: result.data.sceneId,
      narration: `[Rewritten] ${result.data.currentText} (Instructions: ${result.data.instructions})`
    };

    return NextResponse.json({ scene: updatedScene }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
