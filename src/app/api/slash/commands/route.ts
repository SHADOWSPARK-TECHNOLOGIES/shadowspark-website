import { NextResponse, type NextRequest } from "next/server";
import { dispatchSlashCommand, listSlashCommands } from "@/lib/slash-commands";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      command?: string;
      text?: string;
      user_id?: string;
      channel_id?: string;
    };

    if (!body.command) {
      return NextResponse.json(
        { success: false, error: "command is required" },
        { status: 400 }
      );
    }

    const result = await dispatchSlashCommand({
      command: body.command,
      text: body.text,
      userId: body.user_id,
      channelId: body.channel_id,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[slash/commands] Request failed:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    commands: listSlashCommands(),
  });
}
