import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketUpdatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = "payments-service";

  onMessage(data: TicketUpdatedEvent["data"], msg: Message): void {
    console.log("Event data!", data);

    msg.ack();
  }
}
