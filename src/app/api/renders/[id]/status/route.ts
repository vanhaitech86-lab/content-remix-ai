import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Simulate progress
    const mockProgress = Math.floor(Math.random() * 100);
    const isComplete = mockProgress > 90;

    const mockStatus = {
      id,
      status: isComplete ? "completed" : "processing",
      progress: isComplete ? 100 : mockProgress,
      downloadUrl: isComplete ? "/mock-download.mp4" : null,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ status: mockStatus }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
