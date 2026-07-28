import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const storyboardSchema = z.object({
  scriptId: z.string(),
  projectId: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = storyboardSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    // Mock storyboard data
    const mockStoryboard = {
      id: "sb-mock-1",
      scriptId: result.data.scriptId,
      frames: [
        { sceneId: "scene-1", imageUrl: "https://via.placeholder.com/640x360", prompt: "A cinematic shot" },
        { sceneId: "scene-2", imageUrl: "https://via.placeholder.com/640x360", prompt: "A close up" }
      ],
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ storyboard: mockStoryboard }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
