import { CalendarCandidate } from "src/calendars/calendar-candidate";

export interface CalendarRule {
    validate(calendarCandidate: CalendarCandidate): boolean;
}