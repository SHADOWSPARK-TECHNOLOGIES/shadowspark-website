"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadOperatorStatus(id: string, status: string) {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/operator");
}

export async function generateLeadPaymentLink(id: string, amount: number, planName: string) {
  // Original dummy logic replaced by Checkout flow in V1, kept for compatibility if needed elsewhere
}

export async function approveDemo(id: string) {
  await prisma.lead.update({
    where: { id },
    data: { demoApproved: true, status: "WON" }
  });
  revalidatePath("/operator");
}
