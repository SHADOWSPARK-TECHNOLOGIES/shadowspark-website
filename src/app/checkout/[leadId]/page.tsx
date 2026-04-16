import CheckoutClient from "./CheckoutClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  
  if (!leadId) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <CheckoutClient leadId={leadId} />
    </div>
  );
}
