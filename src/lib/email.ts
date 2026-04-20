import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || 'ShadowSpark <ops@shadowspark-tech.org>';

export async function sendEmail(to: string | string[], subject: string, html: string): Promise<void> {
  const recipients = Array.isArray(to) ? to : [to];
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const client = new Resend(apiKey as string);
      // Resend types may vary; cast to any to keep compatibility in this repo
      await (client as any).emails.send({
        from: FROM,
        to: recipients,
        subject,
        html,
      });
      return;
    } catch (err) {
      console.error('Resend send failed:', err);
      throw err;
    }
  } else {
    console.warn('RESEND_API_KEY not set; sendEmail is a no-op. Subject:', subject, 'to:', recipients);
    return;
  }
}

export async function resend(to: string, content: string): Promise<void> {
  await sendEmail(to, 'Resend Message', content);
}

export async function sendWelcomeEmail(to: string, name?: string): Promise<void> {
  const html = `<div><p>Hi ${name || ''},</p><p>Welcome to ShadowSpark.</p></div>`;
  await sendEmail(to, 'Welcome to ShadowSpark', html);
}

export default { sendEmail, resend, sendWelcomeEmail };
