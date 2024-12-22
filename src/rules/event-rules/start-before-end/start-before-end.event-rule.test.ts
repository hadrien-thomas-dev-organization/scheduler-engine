import { parse } from "date-fns";
import { EventCandidate } from "src/events/event-candidate";
import { StartBeforeEndEventRule } from "src/rules/event-rules/start-before-end/start-before-end.event-rule";
import { describe, expect, it } from "vitest";

describe("AlwaysPassingRule", () => {
    it("should validate the event if start date is before end date", () => {
        const eventRule = new StartBeforeEndEventRule();
        const eventCandidate = new EventCandidate(
            "name of the event",
            parse("2023-01-01", "yyyy-MM-dd", new Date()),
            parse("2023-01-02", "yyyy-MM-dd", new Date())
        );
        const eventCandidateValidation = eventRule.validate(eventCandidate);
        expect(eventCandidateValidation).toBe(true);
    });

    it("should not validate the event if start date is after end date", () => {
        const eventRule = new StartBeforeEndEventRule();
        const eventCandidate = new EventCandidate(
            "name of the event",
            parse("2023-01-02", "yyyy-MM-dd", new Date()),
            parse("2023-01-01", "yyyy-MM-dd", new Date())
        );
        const eventCandidateValidation = eventRule.validate(eventCandidate);
        expect(eventCandidateValidation).toBe(false);
    });

    it("should not validate the event if start date is equal to end date", () => {
        const eventRule = new StartBeforeEndEventRule();
        const eventCandidate = new EventCandidate(
            "name of the event",
            parse("2023-01-01", "yyyy-MM-dd", new Date()),
            parse("2023-01-01", "yyyy-MM-dd", new Date())
        );
        const eventCandidateValidation = eventRule.validate(eventCandidate);
        expect(eventCandidateValidation).toBe(false);
    });
});