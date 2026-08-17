CREATE TABLE IF NOT EXISTS "passkeys" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "credentialId" TEXT NOT NULL,
  "publicKey" TEXT NOT NULL,
  "counter" BIGINT NOT NULL DEFAULT 0,
  "deviceType" TEXT,
  "transports" TEXT,
  "backedUp" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastUsedAt" TIMESTAMP(3),
  "verifiedAt" TIMESTAMP(3),
  CONSTRAINT "passkeys_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "webauthn_challenges" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "challenge" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "usedAt" TIMESTAMP(3),
  CONSTRAINT "webauthn_challenges_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "passkeys"
  ADD COLUMN IF NOT EXISTS "verifiedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "passkeys_credentialId_key"
  ON "passkeys"("credentialId");
CREATE UNIQUE INDEX IF NOT EXISTS "webauthn_challenges_challenge_key"
  ON "webauthn_challenges"("challenge");
CREATE INDEX IF NOT EXISTS "webauthn_challenges_userId_challenge_idx"
  ON "webauthn_challenges"("userId", "challenge");
CREATE INDEX IF NOT EXISTS "webauthn_challenges_expiresAt_idx"
  ON "webauthn_challenges"("expiresAt");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'passkeys_userId_fkey'
      AND conrelid = '"passkeys"'::regclass
  ) THEN
    ALTER TABLE "passkeys"
      ADD CONSTRAINT "passkeys_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;
