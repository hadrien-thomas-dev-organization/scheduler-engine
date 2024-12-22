import { CalendarCandidate } from "src/calendars/calendar-candidate";
import { EventCandidate } from "src/events/event-candidate";
import { CalendarRule } from "src/rules/calendar-rules/calendar-rule";

export class EventsMustNotOverlapCalendarRule implements CalendarRule {

    validate(calendarCandidate: CalendarCandidate): boolean {
        calendarCandidate.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        for (let i = 1; i < calendarCandidate.events.length; i++) {
            if (this.isPreviousEventAndNextEventOverlapping(calendarCandidate.events[i - 1], calendarCandidate.events[i])) {
                return false;
            }
        }

        return true;
    }

    isPreviousEventAndNextEventOverlapping(previousEvent: EventCandidate, nextEvent: EventCandidate): boolean {
        return nextEvent.startDate < previousEvent.endDate;
    }
}
