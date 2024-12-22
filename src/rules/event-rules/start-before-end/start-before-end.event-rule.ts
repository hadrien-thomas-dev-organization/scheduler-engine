import { EventCandidate } from "src/events/event-candidate";
import { EventRule } from "src/rules/event-rules/event-rule";

export class StartBeforeEndEventRule implements EventRule {

    validate(eventCandidate: EventCandidate): boolean {
        if (eventCandidate.startDate < eventCandidate.endDate) {
            return true;
        }

        return false;
    }
}
