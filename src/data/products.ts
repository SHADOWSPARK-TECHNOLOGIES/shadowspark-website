export type ProductStatus = "live" | "beta" | "in-development";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  href?: string;
  repo?: string;
  tags: string[];
  security: string[];
  cta: string;
};

export const products: Product[] = [
  {
    slug: "lodgist",
    name: "Lodgist",
    tagline:
      "Trust infrastructure that collapses property fraud in Nigerian housing.",
    status: "live",
    href: "/infrastructure-trust",
    tags: ["housing", "verification", "trust"],
    security: ["DMARC p=reject", "CSRF + CAPTCHA", "domain monitoring"],
    cta: "Explore trust stack",
  },
  {
    slug: "property-pal",
    name: "Property Pal",
    tagline:
      "AI copilot for property search, verification and renter support.",
    status: "in-development",
    tags: ["copilot", "search", "renter support"],
    security: [],
    cta: "Join waitlist",
  },
  {
    slug: "siri-bridge-chatgpt",
    name: "Siri Bridge for ChatGPT",
    tagline: "Hands-free ChatGPT through Siri on iOS.",
    status: "beta",
    repo: "ios-siri-chatgpt",
    tags: ["ios", "siri", "chatgpt"],
    security: [],
    cta: "Request beta access",
  },
  {
    slug: "shadowspark-chatbot-engine",
    name: "Shadowspark Chatbot Engine",
    tagline:
      "Production chatbot infrastructure for high-volume Nigerian operations.",
    status: "live",
    href: "/chatbot-products",
    tags: ["chatbot", "operations", "automation"],
    security: ["SPF -all", "hardened admin", "SE-trained team"],
    cta: "See engine capabilities",
  },
];

