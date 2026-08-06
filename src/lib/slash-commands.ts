export type SlashCommandContext = {
  command: string;
  text?: string;
  userId?: string;
  channelId?: string;
};

export type SlashCommandResult = {
  response_type?: "ephemeral" | "in_channel";
  text: string;
  attachments?: Array<{
    text: string;
    color?: string;
  }>;
};

export type SlashCommandHandler = (context: SlashCommandContext) => SlashCommandResult | Promise<SlashCommandResult>;

const CALENDLY_DEMO_URL = "https://calendly.com/wonderstevie702/30min";

const commands: Record<string, SlashCommandHandler> = {
  demo: () => ({
    response_type: "ephemeral",
    text: `Book a live ShadowSpark demo: ${CALENDLY_DEMO_URL}`,
  }),

  status: () => ({
    response_type: "in_channel",
    text: "ShadowSpark system status",
    attachments: [
      { text: "Website: Operational", color: "#22c55e" },
      { text: "Conversions API: Operational", color: "#22c55e" },
      { text: "Calendly booking: Operational", color: "#22c55e" },
    ],
  }),

  help: () => ({
    response_type: "ephemeral",
    text: "Available ShadowSpark slash commands:",
    attachments: [
      { text: "/demo — Get the Calendly demo booking link" },
      { text: "/status — Check ShadowSpark system status" },
      { text: "/help — Show this help message" },
    ],
  }),
};

export function listSlashCommands(): string[] {
  return Object.keys(commands);
}

export async function dispatchSlashCommand(
  context: SlashCommandContext
): Promise<SlashCommandResult> {
  const handler = commands[context.command.toLowerCase()];

  if (!handler) {
    return {
      response_type: "ephemeral",
      text: `Unknown command \`/${context.command}\`. Try \`/help\` for available commands.`,
    };
  }

  try {
    return await handler(context);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[slash-commands] Handler failed:", message);
    return {
      response_type: "ephemeral",
      text: "Something went wrong processing that command. Please try again.",
    };
  }
}
