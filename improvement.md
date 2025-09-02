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

## 2. Order Service - Ticket ID Validation Coupling

### Issue

When creating an order, the user must provide a `ticketId` in the request body.

- It is reasonable to validate that the `ticketId` is present and not empty.
- A stricter check would be to validate that the `ticketId` has the structure of a **MongoDB ObjectId**.

While this check prevents invalid IDs like `123`, it introduces **tight coupling** between the **Order Service** and the **Ticket Service’s database implementation**.

- Today, the Ticket Service uses MongoDB, so ObjectId is valid.
- In the future, the Ticket Service might change its database (e.g., PostgreSQL, UUIDs, or something else).
- If that happens, the Order Service would unnecessarily break because it assumes the Ticket Service uses MongoDB ObjectIds.

This contradicts the microservices principle of **loose coupling** — services should rely only on **events and contracts**, not internal database details.

### Proposed Solution

- Keep basic validation: ensure `ticketId` is provided and not empty.
- Avoid enforcing database-specific formats (e.g., MongoDB ObjectId).
- Rely on the **Ticket Service events** for authoritative data about valid tickets.
- If stronger validation is necessary, consider:
  1. Allowing the Order Service to call the Ticket Service API (synchronous check), or
  2. Relying solely on replicated ticket data/events (preferred in event-driven systems).

### Benefits

- Preserves **service independence** and **flexibility** to change databases in the future.
- Reduces coupling between Order Service and Ticket Service.
- Still ensures requests contain a `ticketId`, without assuming its structure.

### Status

Currently validating as a MongoDB ObjectId for learning/demo purposes.  
In production, should avoid hard-coupling to a specific database implementation.
