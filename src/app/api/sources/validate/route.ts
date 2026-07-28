import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateSourceSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  sourceType: z.enum(["video", "audio", "text"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateSourceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid URL format", details: result.error.errors }, { status: 400 });
    }

    const { url } = result.data;
    let platform = "unknown";
    let videoId = "";
    let details = {};

    // Basic URL pattern matching
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      platform = "youtube";
      const ytMatch = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
      videoId = ytMatch ? ytMatch[1] : "unknown_yt_id";
      
      // Mock fetch oEmbed data
      try {
        const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        const res = await fetch(oEmbedUrl);
        if (res.ok) {
          details = await res.json();
        } else {
          details = { title: "YouTube Video (Title Unavailable)" };
        }
      } catch (e) {
        details = { title: "YouTube Video" };
      }
    } else if (url.includes("tiktok.com")) {
      platform = "tiktok";
      const tkMatch = url.match(/\/video\/(\d+)/);
      videoId = tkMatch ? tkMatch[1] : "unknown_tk_id";
      details = { title: "TikTok Video" };
    }

    return NextResponse.json({
      valid: platform !== "unknown",
      platform,
      videoId,
      details,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
