import { CalendarCandidate } from "src/calendars/calendar-candidate";
import { EventCandidate } from "src/events/event-candidate";
import { CalendarRule } from "src/rules/calendar-rules/calendar-rule";
import { EventRule } from "src/rules/event-rules/event-rule";


export class RuleBook {
    public eventRules: EventRule[] = [];
    public calendarRules: CalendarRule[] = [];

    addEventRule(eventRule: EventRule): void {
        this.eventRules.push(eventRule);
    }

    validateEvent(event: EventCandidate): boolean {
        for (const eventRule of this.eventRules) {
            if (!eventRule.validate(event)) {
                return false;
            }
        }

        return true;
    }

    addCalendarRule(calendarRule: CalendarRule): void {
        this.calendarRules.push(calendarRule);
    }

    validateCalendar(calendar: CalendarCandidate): boolean {
        for (const eventCandidate of calendar.events) {
            if (!this.validateEvent(eventCandidate)) {
                return false;
            }
        }

        for (const calendarRule of this.calendarRules) {
            if (!calendarRule.validate(calendar)) {
                return false;
            }
        }

        return true;
    }
}