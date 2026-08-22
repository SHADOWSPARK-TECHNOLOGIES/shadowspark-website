import { vi } from "vitest";

type MockFunction = ReturnType<typeof vi.fn>;

type AuthPrismaMock = {
  user: Record<string, MockFunction>;
  passkey: Record<string, MockFunction>;
  webAuthnChallenge: Record<string, MockFunction>;
  $transaction: MockFunction;
};

export const mockPrisma: AuthPrismaMock = {
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
  $transaction: vi.fn(),
};

type TransactionCallback = (tx: AuthPrismaMock) => Promise<unknown>;

mockPrisma.$transaction.mockImplementation((callback: TransactionCallback) =>
  callback(mockPrisma),
);

export function resetAuthPrismaMock(): void {
  for (const model of [
    mockPrisma.user,
    mockPrisma.passkey,
    mockPrisma.webAuthnChallenge,
  ]) {
    for (const method of Object.values(model)) {
      method.mockReset();
    }
  }

  mockPrisma.$transaction.mockReset();
  mockPrisma.$transaction.mockImplementation(
    (callback: TransactionCallback) => callback(mockPrisma),
  );
}
