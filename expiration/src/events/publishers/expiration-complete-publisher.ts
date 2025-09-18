import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@robin_project/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
