import { OrderCreatedEvent, OrderStatus } from "@robin_project/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";

const listenerSetup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    expiredAt: "test",
    userId: "test",
    status: OrderStatus.Created,
    ticket: {
      id: "testId",
      price: 10,
    },
  };

  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("replicates the order info", async () => {
  const { data, listener, msg } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});
it("acknowledge the message", async () => {
  const { data, listener, msg } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  expect(msg.ack).toHaveBeenCalled();
});
