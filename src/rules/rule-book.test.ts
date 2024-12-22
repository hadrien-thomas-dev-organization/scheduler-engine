import { CalendarCandidate } from "src/calendars/calendar-candidate";
import { EventCandidate } from "src/events/event-candidate";
import { AlwaysPassingEventRule } from "src/rules/event-rules/always-passing/always-passing.event-rule";
import { NeverPassingEventRule } from "src/rules/event-rules/never-passing/never-passing.event-rule";
import { RuleBook } from "src/rules/rule-book";
import { describe, it, expect } from "vitest";


describe("RuleBook", () => {
    describe("addEventRule", () => {
        it("should add an event rule", () => {
            const rulebook = new RuleBook();
            const eventRule = new AlwaysPassingEventRule();
            rulebook.addEventRule(eventRule);
            expect(rulebook.eventRules.length).toBe(1);
        });
    });

    describe("validate", () => {

        it("should validate a calendar with all passing rules", () => {
            const rulebook = new RuleBook();
            rulebook.addEventRule(new AlwaysPassingEventRule());
            rulebook.addEventRule(new AlwaysPassingEventRule());
            const calendarCandidate = new CalendarCandidate([]);
            const eventCandidate = new EventCandidate("name of the event", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate);
            const eventCandidate2 = new EventCandidate("name of the event 2", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate2);
            const calendarCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(calendarCandidateValidation).toBe(true);
        });

        it("should not validate a calendar with a rule not passing", () => {
            const rulebook = new RuleBook();
            rulebook.addEventRule(new AlwaysPassingEventRule());
            rulebook.addEventRule(new NeverPassingEventRule());
            const calendarCandidate = new CalendarCandidate([]);
            const eventCandidate = new EventCandidate("name of the event", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate);
            const eventCandidate2 = new EventCandidate("name of the event 2", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate2);
            const calendarCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(calendarCandidateValidation).toBe(false);
        });

        it("should validate a calendar with no rule and no events", () => {
            const rulebook = new RuleBook();
            const calendarCandidate = new CalendarCandidate([]);
            const eventCandidate = new EventCandidate("name of the event", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate);
            const eventCandidate2 = new EventCandidate("name of the event 2", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate2);
            const calendarCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(calendarCandidateValidation).toBe(true);
        });

        it("should validate a calendar with no rule", () => {
            const rulebook = new RuleBook();
            const calendarCandidate = new CalendarCandidate([]);
            const eventCandidate = new EventCandidate("name of the event", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate);
            const eventCandidate2 = new EventCandidate("name of the event 2", new Date(), new Date());
            calendarCandidate.addEvent(eventCandidate2);
            const calendarCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(calendarCandidateValidation).toBe(true);
        });

        it("should validate a calendar with no event", () => {
            const rulebook = new RuleBook();
            rulebook.addEventRule(new NeverPassingEventRule());
            const calendarCandidate = new CalendarCandidate([]);
            const calendarCandidateValidation = rulebook.validateCalendar(calendarCandidate);
            expect(calendarCandidateValidation).toBe(true);
        });
    });
});