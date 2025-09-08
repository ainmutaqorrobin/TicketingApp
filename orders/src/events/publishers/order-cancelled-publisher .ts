import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@robin_project/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
