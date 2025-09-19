import { ExpirationCompleteEvent, OrderStatus } from "@robin_project/common";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";

const listenerSetup = async () => {
  //create an instance of listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = await Ticket.build({
    id: new Types.ObjectId().toHexString(),
    price: 200,
    title: "test",
  });

  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    ticket: ticket,
    userId: "12312",
    expiresAt: new Date(),
  });

  await order.save();

  //create a fake data event
  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  //create a fake message object
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order, ticket };
};

it("updates the order status to cancelled", async () => {
  const { data, listener, msg, order } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emit an OderCancelled event", async () => {
  const { data, listener, msg, order } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(eventData.id).toEqual(order.id);
});

it("acknowledge the message", async () => {
  const { data, listener, msg } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  expect(msg.ack).toHaveBeenCalled();
});
