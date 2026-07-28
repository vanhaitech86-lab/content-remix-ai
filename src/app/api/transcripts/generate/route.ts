import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const generateTranscriptSchema = z.object({
  projectId: z.string(),
  audioRef: z.string().min(1, "Audio reference is required"),
  language: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = generateTranscriptSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    const { projectId, audioRef } = result.data;

    // Mock transcript generation
    const mockTranscript = {
      id: "gen-transcript-id",
      projectId,
      fullText: "This is a mock transcribed text from the audio reference provided.",
      segments: [
        { id: "s1", startTime: 0, endTime: 2.5, text: "This is a mock" },
        { id: "s2", startTime: 2.5, endTime: 5.0, text: "transcribed text from the audio reference provided." }
      ],
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ transcript: mockTranscript }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
