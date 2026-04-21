import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const hasResendKey = Boolean(process.env.RESEND_API_KEY);
const resend = hasResendKey ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendOutreachParams {
  leadId: string;
  subject: string;
  body: string;
}

export async function sendOutreach({ leadId, subject, body }: SendOutreachParams) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead || !lead.email) throw new Error('Lead not found or missing email');

  if (!resend) {
    // No Resend API key configured in environment — simulate sending for local tests
    await prisma.emailEvent.create({
      data: {
        leadId,
        type: 'sent',
        metadata: { simulated: true },
      },
    });

    return { success: true, simulated: true };
  }

  const { data, error } = await resend.emails.send({
    from: 'ShadowSpark <architect@shadowspark-tech.org>',
    to: [lead.email],
    subject,
    html: body,
    headers: {
      'X-Lead-Id': leadId,
    },
    tags: [{ name: 'category', value: 'outreach' }],
  });

  if (error) throw error;

  await prisma.emailEvent.create({
    data: {
      leadId,
      type: 'sent',
      metadata: { messageId: data?.id },
    },
  });

  return { success: true, messageId: data?.id };
}

