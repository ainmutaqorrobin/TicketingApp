import { OrderCancelledEvent } from "@robin_project/common";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

const listenerSetup = async () => {
  //create an instance of listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = new Types.ObjectId().toHexString();

  //create and save a ticket
  const ticket = Ticket.build({
    userId: "123",
    price: 100,
    title: "test",
  });
  ticket.set({ orderId });
  await ticket.save();

  //create a fake data event
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("update ticket, publish an event and acknowledge the message", async () => {
  const { data, listener, msg, ticket } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
