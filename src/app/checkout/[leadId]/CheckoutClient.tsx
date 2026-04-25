'use client';
import { useState } from "react";
import { PRICING_PACKAGES } from "@/config/pricing";
import { Button } from "@/components/ui/button";

export default function CheckoutClient({ leadId }: { leadId: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [leadVolume, setLeadVolume] = useState("0-50");
  const [painPoint, setPainPoint] = useState("");
  const [packageId, setPackageId] = useState(PRICING_PACKAGES[0].id);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedPackage = PRICING_PACKAGES.find(p => p.id === packageId);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Initialize Paystack Transaction
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: 1500000, // ₦15,000 Semantic System Preview Fee (in kobo)
          leadId: leadId === "new" ? `new_${Date.now()}` : leadId,
          metadata: { companyName, goal, packageId }
        }),
      });

      const data = await response.json();
      
      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message || "Failed to initialize payment");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  if (step === 1) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
        <h2 className="text-2xl font-bold mb-2 text-white">Let's Audit Your Needs</h2>
        <p className="text-zinc-500 mb-6">Tell us about your operations so we can configure your personalized demo environment.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Company Name</label>
            <input required type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full p-3 border border-zinc-700 rounded-md bg-transparent text-white focus:ring-2 focus:ring-cyan-500" placeholder="e.g. Acme Corp" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border border-zinc-700 rounded-md bg-transparent text-white focus:ring-2 focus:ring-cyan-500" placeholder="you@company.com" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Monthly Lead Volume</label>
              <select value={leadVolume} onChange={e => setLeadVolume(e.target.value)} className="w-full p-3 border border-zinc-700 rounded-md bg-transparent text-white">
                <option value="0-50">0 - 50</option>
                <option value="51-200">51 - 200</option>
                <option value="200+">200+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Target Package</label>
              <select value={packageId} onChange={e => setPackageId(e.target.value)} className="w-full p-3 border border-zinc-700 rounded-md bg-transparent text-white">
                {PRICING_PACKAGES.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Biggest Operational Pain Point</label>
            <textarea required value={painPoint} onChange={e => setPainPoint(e.target.value)} className="w-full p-3 border border-zinc-700 rounded-md bg-transparent text-white" rows={2} placeholder="e.g. Slow response times, lost leads..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Main Goal with AI</label>
            <textarea required value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border border-zinc-700 rounded-md bg-transparent text-white" rows={2} placeholder="e.g. Automate qualification, 24/7 support..."></textarea>
          </div>
          
          <Button type="submit" className="w-full bg-cyan-500 text-zinc-950 hover:bg-cyan-400 py-3 mt-4 rounded-md font-medium text-lg">
            Generate Audit & Continue
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Mini-Audit Summary</h2>
      
      <div className="bg-cyan-950/20 p-5 rounded-lg mb-6 border border-cyan-500/20">
        <h3 className="font-semibold text-cyan-400 mb-2">Analysis for {companyName || "Your Company"}</h3>
        <p className="text-sm text-zinc-300 mb-3">
          Handling <strong>{leadVolume} leads/month</strong> with a primary pain point of <em>"{painPoint}"</em> means significant revenue is currently leaking. 
          The <strong>{selectedPackage?.name}</strong> package is positioned to directly resolve this and achieve your goal to <em>"{goal}"</em>.
        </p>
      </div>

      <form onSubmit={handleCheckout} className="space-y-6">
        <div className="bg-zinc-800 p-5 rounded-lg border border-zinc-700">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">Semantic System Preview Fee</span>
            <span className="text-xl font-bold text-white">₦15,000</span>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            This fee secures your environment and is <strong>fully credited toward your final deployment</strong>. This Semantic System Preview replaces $20k+ in traditional custom development.
          </p>
          
          <div className="flex items-start gap-3 mt-4 pt-4 border-t border-zinc-700">
            <input required type="checkbox" id="terms" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-1 w-4 h-4" />
            <label htmlFor="terms" className="text-sm text-zinc-400">
              I accept the Terms and Privacy Policy, and I understand this ₦15,000 fee is a fully-credited deployment fee for the Semantic System Preview.
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" onClick={() => setStep(1)} variant="outline" className="w-1/3">
            Back
          </Button>
          <Button disabled={loading || !termsAccepted} type="submit" className="w-2/3 bg-cyan-500 text-zinc-950 hover:bg-cyan-400">
            {loading ? "Processing..." : "Pay ₦15,000 (Fully Credited)"}
          </Button>
        </div>
      </form>
    </div>
  );
}
