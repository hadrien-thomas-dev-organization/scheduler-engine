import { CalendarCandidate } from "src/calendars/calendar-candidate";
import { EventCandidate } from "src/events/event-candidate";
import { EventRule } from "src/rules/event-rules/event-rule";


export class RuleBook {
    public eventRules: EventRule[] = [];

    addEventRule(rule: EventRule): void {
        this.eventRules.push(rule);
    }

    validateEvent(event: EventCandidate): boolean {
        for (const rule of this.eventRules) {
            if (!rule.validate(event)) {
                return false;
            }
        }

        return true;
    }

    validateCalendar(calendar: CalendarCandidate): boolean {
        for (const event of calendar.events) {
            if (!this.validateEvent(event)) {
                return false;
            }
        }

        return true;
    }
}