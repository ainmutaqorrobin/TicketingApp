import { Types } from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListeners } from "../order-created-listener";
import { OrderCreatedEvent, OrderStatus } from "@robin_project/common";
import { Message } from "node-nats-streaming";

const listenerSetup = async () => {
  //create an instance of listener
  const listener = new OrderCreatedListeners(natsWrapper.client);

  //create and save a ticket
  const ticket = Ticket.build({
    userId: "123",
    price: 100,
    title: "test",
  });
  await ticket.save();

  //create a fake data event
  const data: OrderCreatedEvent["data"] = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "123",
    expiredAt: "asdasd",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("set the orderId of the ticket", async () => {
  const { data, listener, msg, ticket } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acknowledge the message", async () => {
  const { data, listener, msg } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  expect(msg.ack).toHaveBeenCalled();
});
