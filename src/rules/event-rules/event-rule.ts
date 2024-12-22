import { EventCandidate } from "src/events/event-candidate";

export interface EventRule {
  validate(eventCandidate: EventCandidate): boolean;
}