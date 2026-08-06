import { NextResponse, type NextRequest } from "next/server";
import { createThreadsPost } from "@/lib/threads-api";

type PublishRequestBody = {
  text?: string;
  media_url?: string;
  media_type?: "TEXT" | "IMAGE" | "VIDEO" | "CAROUSEL";
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PublishRequestBody;

    if (!body.text && !body.media_url) {
      return NextResponse.json(
        { success: false, error: "Either text or media_url is required" },
        { status: 400 }
      );
    }

    const result = await createThreadsPost({
      text: body.text,
      mediaUrl: body.media_url,
      mediaType: body.media_type,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post_id: result.postId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[threads/publish] Request failed:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
