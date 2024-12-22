import { Calendar } from "src/calendars/calendar";
import { EventCandidate } from "src/events/event-candidate";

export class CalendarCandidate {
    constructor(public events: EventCandidate[]) {
    }

    addEvent(eventCandidate: EventCandidate): void {
        this.events.push(eventCandidate);
    }

    toCalendar(): Calendar {
        return new Calendar(this.events.map(event => event.toEvent()));
    }
}
