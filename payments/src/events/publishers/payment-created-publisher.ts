import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@robin_project/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
