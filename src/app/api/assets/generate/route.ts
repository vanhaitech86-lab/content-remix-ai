import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const generateAssetSchema = z.object({
  prompt: z.string(),
  type: z.enum(["image", "video", "audio"]),
  sceneId: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = generateAssetSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    // Mock asset generation
    const mockAsset = {
      id: "gen-asset-" + Date.now(),
      type: result.data.type,
      url: result.data.type === "image" ? "https://via.placeholder.com/800x600" : "/mock-gen.mp4",
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ asset: mockAsset }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
