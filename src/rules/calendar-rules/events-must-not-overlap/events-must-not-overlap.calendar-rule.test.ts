import { parse } from "date-fns";
import { CalendarCandidate } from "src/calendars/calendar-candidate";
import { EventCandidate } from "src/events/event-candidate";
import { EventsMustNotOverlapCalendarRule } from "src/rules/calendar-rules/events-must-not-overlap/events-must-not-overlap.calendar-rule.";
import { RuleBook } from "src/rules/rule-book";
import { describe, expect, it } from "vitest";

describe("EventsMustNotOverlapCalendarRule", () => {
    describe("validate", () => {
        it("should validate with 2 events not overlapping", () => {

            const rulebook = new RuleBook();
            rulebook.addCalendarRule(new EventsMustNotOverlapCalendarRule());

            const calendarCandidate = new CalendarCandidate([]);

            const eventCandidate1 = new EventCandidate(
                "name of the event",
                parse("2023-01-01", "yyyy-MM-dd", new Date()),
                parse("2023-01-02", "yyyy-MM-dd", new Date())
            );
            calendarCandidate.addEvent(eventCandidate1);

            const eventCandidate2 = new EventCandidate(
                "name of the event 2",
                parse("2023-01-02", "yyyy-MM-dd", new Date()),
                parse("2023-01-03", "yyyy-MM-dd", new Date())
            );
            calendarCandidate.addEvent(eventCandidate2);

            const eventCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(eventCandidateValidation).toBe(true);
        });

        it("should not validate with 2 events overlapping", () => {

            const rulebook = new RuleBook();
            rulebook.addCalendarRule(new EventsMustNotOverlapCalendarRule());

            const calendarCandidate = new CalendarCandidate([]);

            const eventCandidate1 = new EventCandidate(
                "name of the event",
                parse("2023-01-01", "yyyy-MM-dd", new Date()),
                parse("2023-01-03", "yyyy-MM-dd", new Date())
            );
            calendarCandidate.addEvent(eventCandidate1);

            const eventCandidate2 = new EventCandidate(
                "name of the event 2",
                parse("2023-01-02", "yyyy-MM-dd", new Date()),
                parse("2023-01-03", "yyyy-MM-dd", new Date())
            );
            calendarCandidate.addEvent(eventCandidate2);


            const eventCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(eventCandidateValidation).toBe(false);
        });

        it("should sort events by start date", () => {

            const rulebook = new RuleBook();
            rulebook.addCalendarRule(new EventsMustNotOverlapCalendarRule());

            const calendarCandidate = new CalendarCandidate([]);


            const nextEventCandidate = new EventCandidate(
                "name of the event 2",
                parse("2023-01-02", "yyyy-MM-dd", new Date()),
                parse("2023-01-03", "yyyy-MM-dd", new Date())
            );
            calendarCandidate.addEvent(nextEventCandidate);

            const previousEventCandidate = new EventCandidate(
                "name of the event",
                parse("2023-01-01", "yyyy-MM-dd", new Date()),
                parse("2023-01-03", "yyyy-MM-dd", new Date())
            );
            calendarCandidate.addEvent(previousEventCandidate);


            rulebook.validateCalendar(calendarCandidate);

            expect(calendarCandidate.events[0]).toBe(previousEventCandidate);
            expect(calendarCandidate.events[1]).toBe(nextEventCandidate);
        });
    });

    describe("isPreviousEventAndNextEventOverlapping", () => {
        it("should return true if next event start date is before previous event end date", () => {

            const eventsMustNotOverlapCalendarRule = new EventsMustNotOverlapCalendarRule();

            const previousEventCandidate = new EventCandidate(
                "previous event",
                parse("2023-01-01-12-00", "yyyy-MM-dd-HH-mm", new Date()),
                parse("2023-01-03-12-00", "yyyy-MM-dd-HH-mm", new Date())
            );

            const nextEventCandidate = new EventCandidate(
                "next event",
                parse("2023-01-02-12-00", "yyyy-MM-dd-HH-mm", new Date()),
                parse("2023-01-03-12-00", "yyyy-MM-dd-HH-mm", new Date())
            );

            const eventCandidateValidation = eventsMustNotOverlapCalendarRule.isPreviousEventAndNextEventOverlapping(previousEventCandidate, nextEventCandidate);
            expect(eventCandidateValidation).toBe(true);
        });

        it("should return false if next event start date is after previous event end date", () => {

            const eventsMustNotOverlapCalendarRule = new EventsMustNotOverlapCalendarRule();

            const eventCandidate1 = new EventCandidate(
                "name of the event",
                parse("2023-01-01-12-00", "yyyy-MM-dd-HH-mm", new Date()),
                parse("2023-01-02-12-00", "yyyy-MM-dd-HH-mm", new Date())
            );

            const eventCandidate2 = new EventCandidate(
                "name of the event",
                parse("2023-01-03-12-00", "yyyy-MM-dd-HH-mm", new Date()),
                parse("2023-01-04-12-00", "yyyy-MM-dd-HH-mm", new Date())
            );

            const eventCandidateValidation = eventsMustNotOverlapCalendarRule.isPreviousEventAndNextEventOverlapping(eventCandidate1, eventCandidate2);
            expect(eventCandidateValidation).toBe(false);
        });
    });
});