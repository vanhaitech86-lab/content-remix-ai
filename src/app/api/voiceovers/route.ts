import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const voiceoverSchema = z.object({
  text: z.string().min(1),
  voice: z.string(),
  language: z.string().default("vi-VN"),
  speed: z.number().default(1.0),
  emotion: z.string().optional(),
  gender: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = voiceoverSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    // Mock voiceover generation
    const mockVoiceover = {
      id: "vo-" + Date.now(),
      audioUrl: "/mock-voiceover.mp3",
      duration: result.data.text.length * 0.1, // mock duration
      ...result.data,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ voiceover: mockVoiceover }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
