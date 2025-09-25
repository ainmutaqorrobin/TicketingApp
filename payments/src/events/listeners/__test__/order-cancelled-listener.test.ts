import { OrderCancelledEvent, OrderStatus } from "@robin_project/common";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/order";

const listenerSetup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: "test",
    version: 0,
  });
  await order.save();

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: "testId",
    },
  };

  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it("updates the status of order", async () => {
  const { data, listener, msg, order } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  const updateOrder = await Order.findById(order.id);

  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
});
it("acknowledge the message", async () => {
  const { data, listener, msg } = await listenerSetup();

  await listener.onMessage(data, msg as Message);

  expect(msg.ack).toHaveBeenCalled();
});
