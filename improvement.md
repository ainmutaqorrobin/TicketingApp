# Drawbacks

## 1. Ticket Service - Event Publishing Reliability

### Issue
When saving a record (e.g., Ticket, Transaction) into the database, the service may fail to publish the corresponding event to NATS.  
- If the record is saved but the event is not published, other services relying on that event may remain out of sync.  
- This leads to **data inconsistency** and users may see strange or incorrect data in the application.  

### Proposed Solution
Implement the **Outbox Pattern** combined with **Database Transactions**:  
1. **Save both the record and the event** into the database at the same time.  
   - Record goes into its main collection (e.g., `tickets` or `transactions`).  
   - Event goes into a dedicated `events` collection with a `published` flag (initially set to `false`).  

2. **Background Process**:  
   - A separate worker or process watches the `events` collection.  
   - When a new event is detected, it attempts to publish it to NATS.  
   - Upon successful publishing, the `published` flag is updated to `true`.  

3. **Database Transactions**:  
   - Wrap saving the record and event in a **single database transaction**.  
   - If either operation fails (record or event), the database automatically rolls back both changes.  
   - This ensures atomicity — either both succeed or both fail.  

### Benefits
- Guarantees that data and events stay in sync.  
- If NATS is temporarily unavailable, events are safely stored and published later.  
- Prevents inconsistent states where records exist without corresponding events.  

### Status
Not implemented.
