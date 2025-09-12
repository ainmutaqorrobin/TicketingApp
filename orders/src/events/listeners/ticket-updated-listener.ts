import { Listener, Subjects, TicketUpdatedEvent } from "@robin_project/common";
import { QUEUE_GROUP_NAME } from "./const";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  readonly queueGroupName: string = QUEUE_GROUP_NAME;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, price, title, version } = data;

    /* version - 1 to prevent concurrent issues where incoming
    event could be 2 step ahead from previous one */

    const ticket = await Ticket.findOne({ _id: id, version: version - 1 });

    if (!ticket) throw new Error("Ticket not found");

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
