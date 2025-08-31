# Drawbacks

## 1. Ticket Service - Event Publishing Reliability
- **Issue**: After successfully updating the Tickets Database, the service may fail to publish the "ticket updated" event (e.g., due to NATS connection loss).  
- **Impact**: Other services relying on the event may not stay in sync.  
- **Proposed Solution**: Use **database transactions** or an **outbox pattern** to ensure event publishing is atomic with database updates.  
- **Status**: Not implemented.
