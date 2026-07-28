import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const publishSchema = z.object({
  projectId: z.string(),
  renderId: z.string(),
  platforms: z.array(z.string()),
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = publishSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.errors }, { status: 400 });
    }

    // Mock publishing job
    const mockJob = {
      id: "pub-job-" + Date.now(),
      status: "queued",
      platforms: result.data.platforms,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ job: mockJob }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
