import { Listener, OrderCreatedEvent, Subjects } from "@robin_project/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "./const";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListeners extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;

  readonly queueGroupName: string = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiredAt).getTime() - new Date().getTime();

    console.log("Waiting milisecond to process the job", delay);

    await expirationQueue.add(
      { orderId: data.id },
      {
        delay,
      }
    );
    msg.ack();
  }
}
