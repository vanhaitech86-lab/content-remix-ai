import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const importTranscriptSchema = z.object({
  projectId: z.string(),
  content: z.string().min(1, "Content cannot be empty"),
  format: z.enum(["srt", "vtt", "txt", "manual"]).default("manual")
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = importTranscriptSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    const { content, format, projectId } = result.data;

    // Simple mock parser for SRT/VTT -> segments
    const segments = [
      { id: "1", startTime: 0, endTime: 5, text: content.substring(0, 50) + "..." },
      { id: "2", startTime: 5, endTime: 10, text: content.substring(50, 100) + "..." }
    ];

    const mockTranscript = {
      id: "mock-transcript-id",
      projectId,
      format,
      fullText: content,
      segments,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ transcript: mockTranscript }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
