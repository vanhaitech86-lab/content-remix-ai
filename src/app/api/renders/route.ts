import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const renderSchema = z.object({
  projectId: z.string(),
  scriptId: z.string(),
  format: z.string().default("mp4"),
  resolution: z.string().default("1080p"),
  fps: z.number().default(30),
  quality: z.string().default("high")
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = renderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    const mockJob = {
      id: "render-job-" + Date.now(),
      status: "processing",
      progress: 0,
      projectId: result.data.projectId,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ job: mockJob }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
