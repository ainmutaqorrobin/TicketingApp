import { TicketCreatedEvent } from "@robin_project/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const listenerSetup = async () => {
  //create an instance of listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  //create a fake data event
  const data: TicketCreatedEvent["data"] = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    price: 100,
    title: "test",
    userId: new Types.ObjectId().toHexString(),
  };

  //create a fake message object
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a ticket", async () => {
  const { data, listener, msg } = await listenerSetup();

  //call onMessage function with data object + message object
  await listener.onMessage(data, msg as Message);

  //write assertion to ensure a ticket created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("acknowledge the message", async () => {
  const { data, listener, msg } = await listenerSetup();

  //call onMessage function with data object + message object
  await listener.onMessage(data, msg as Message);

  //write assertion to ensure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
