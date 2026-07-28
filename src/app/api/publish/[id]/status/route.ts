import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Simulate progress
    const mockStatus = {
      id,
      status: "completed", // 'queued', 'processing', 'completed', 'failed'
      platformResults: {
        youtube: { status: "success", url: "https://youtube.com/watch?v=mock" },
        tiktok: { status: "success", url: "https://tiktok.com/@user/video/mock" }
      },
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ status: mockStatus }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
