-- claimOutboundSend sets messages.state to SENDING. The create-table
-- migration only allowed QUEUED, SENT, DELIVERED, READ, FAILED, so that
-- update is rejected wherever this check is still narrow. Replace the check
-- in place. Do not drop the table or delete rows.

ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_state_check";

ALTER TABLE "messages" ADD CONSTRAINT "messages_state_check"
  CHECK ("state" IN ('QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'));
