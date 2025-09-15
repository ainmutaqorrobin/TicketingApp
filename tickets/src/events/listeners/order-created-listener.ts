import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@robin_project/common";
import { QUEUE_GROUP_NAME } from "./const";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListeners extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;

  readonly queueGroupName: string = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById({ ticketId: data.ticket.id });

    if (!ticket) throw new Error("Ticket not found");

    ticket.set({ orderId: data.id });

    await ticket.save();

    msg.ack();
  }
}
