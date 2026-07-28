import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  platform: z.enum(["youtube", "tiktok", "instagram", "other"]).default("other"),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Mock data return
    const mockProjects = [
      { id: "1", title: "Project Alpha", description: "Test project", platform: "youtube", createdAt: new Date().toISOString() },
      { id: "2", title: "Beta Video", description: "Short form content", platform: "tiktok", createdAt: new Date().toISOString() },
    ];

    return NextResponse.json({
      projects: mockProjects,
      pagination: {
        page,
        limit,
        total: 2,
        totalPages: 1
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.errors }, { status: 400 });
    }

    const newProject = {
      id: "mock-new-project-id",
      ...result.data,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
