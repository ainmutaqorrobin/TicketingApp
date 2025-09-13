import { TicketUpdatedEvent } from "@robin_project/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const listenerSetup = async () => {
  //create an instance of listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  //create and save a ticket
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    price: 100,
    title: "test",
  });
  await ticket.save();

  //create a fake data event
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "test updated",
    price: 10,
    userId: "asdasd",
  };

  //create a fake message object
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

it("find, update, and save a ticket", async () => {
  const { data, listener, msg, ticket } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acknowledge the message", async () => {
  const { data, listener, msg } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not acknowledge if the event has a 2 or more step version ahead", async () => {
  const { data, listener, msg } = await listenerSetup();

  //simulating other version
  data.version = 10;

  try {
    await listener.onMessage(data, msg as Message);
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
