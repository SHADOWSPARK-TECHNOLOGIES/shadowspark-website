const cards = [
  {
    title: "WhatsApp & Operations Agents",
    body: "Automate customer support and internal ops with AI chatbots that integrate into WhatsApp and web workflows, with controls designed to resist abuse and prompt injection.",
    proof: "Deployment model: secure intake, structured routing, and fast human hand-off.",
  },
  {
    title: "Lodgist Trust Bots",
    body: "Identity-verified conversational flows that reduce property fraud. These bots process sensitive flows with zero-trust architecture and auditable verification steps.",
    proof: "Built for Lodgist: verified landlord journeys mapped to Nigerian trust rails.",
  },
  {
    title: "The Silent Muscle",
    body: "Every chatbot we ship is wrapped in trust infrastructure: anti-spoofing controls, hardened admin boundaries, and continuous monitoring around high-risk channels.",
    proof: "Security posture: DNS trust controls, endpoint hardening, and human firewall training.",
  },
];

export function WhatWeDo() {
  return (
    <section className="bg-[#F8F5F0] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#FF6F3C]">
            Conversational AI
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0B1B2B] leading-[1.15]">
            Uncompromising security.
          </h2>
          <p className="mt-3 text-base text-[#6B7280]">
            We engineer chatbot systems for real operations, then harden them with
            trust controls that quietly protect your users and reputation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 sm:p-8 border border-[#E5E7EB] flex flex-col gap-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B2B]">{card.title}</h3>
              <p className="text-base text-[#6B7280] leading-relaxed flex-1">{card.body}</p>
              <p className="text-sm text-[#1ABC9C] font-medium border-t border-[#E5E7EB] pt-4">
                {card.proof}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
