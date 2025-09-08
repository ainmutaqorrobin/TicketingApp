import { OrderCreatedEvent, Publisher, Subjects } from "@robin_project/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
