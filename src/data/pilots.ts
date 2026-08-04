export type PilotStatus = "applied" | "screening" | "approved" | "live" | "completed" | "declined";

export type Pilot = {
  id: string;
  name: string;
  email: string;
  organization: string;
  productInterest: string;
  status: PilotStatus;
  appliedAt: string;
  region: string;
  notes?: string;
};

export const pilots: Pilot[] = [
  {
    id: "pilot-001",
    name: "Adebola Shittu",
    email: "adebola@lagosprop.ng",
    organization: "Lagos Property Partners",
    productInterest: "Lodgist",
    status: "live",
    appliedAt: "2026-07-15T09:00:00.000Z",
    region: "Lagos, NG",
    notes: "50-agent rollout; fraud-flagging dashboard in trial.",
  },
  {
    id: "pilot-002",
    name: "Fatima Bello",
    email: "fatima@ministry.gov.ng",
    organization: "Ministry of Lands",
    productInterest: "Public Sector AI",
    status: "screening",
    appliedAt: "2026-07-22T11:30:00.000Z",
    region: "Abuja, NG",
    notes: "Awaiting compliance sign-off.",
  },
  {
    id: "pilot-003",
    name: "James Okafor",
    email: "james@flexhomes.com",
    organization: "Flex Homes",
    productInterest: "Shadowspark Chatbot Engine",
    status: "approved",
    appliedAt: "2026-07-28T14:15:00.000Z",
    region: "Port Harcourt, NG",
    notes: "Kickoff scheduled for August.",
  },
  {
    id: "pilot-004",
    name: "Ngozi Eze",
    email: "ngoizi@edu.ng",
    organization: "Federal Polytechnic Oko",
    productInterest: "Custom AI agent",
    status: "applied",
    appliedAt: "2026-08-02T08:45:00.000Z",
    region: "Anambra, NG",
    notes: "Student admissions chatbot.",
  },
];

const statusOrder: Record<PilotStatus, number> = {
  live: 0,
  approved: 1,
  screening: 2,
  applied: 3,
  completed: 4,
  declined: 5,
};

export function sortPilotsByStatus(list: Pilot[]): Pilot[] {
  return [...list].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}

export function countByStatus(list: Pilot[]): Record<PilotStatus, number> {
  return list.reduce(
    (acc, pilot) => {
      acc[pilot.status] = (acc[pilot.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<PilotStatus, number>,
  );
}
