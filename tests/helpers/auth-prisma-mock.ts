import { vi } from "vitest";

export const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  passkey: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  webAuthnChallenge: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  sessionHandoff: {
    create: vi.fn(),
    updateMany: vi.fn(),
    findUnique: vi.fn(),
  },
  $transaction: vi.fn(async <T>(callback: (tx: typeof mockPrisma) => Promise<T>) =>
    callback(mockPrisma),
  ),
};

export function resetAuthPrismaMock(): void {
  for (const model of Object.values(mockPrisma)) {
    if (typeof model === "function") {
      model.mockReset();
      continue;
    }

    for (const method of Object.values(model)) {
      method.mockReset();
    }
  }

  mockPrisma.$transaction.mockImplementation(
    async <T>(callback: (tx: typeof mockPrisma) => Promise<T>) => callback(mockPrisma),
  );
}
