import { NeverPassingEventRule } from "src/rules/event-rules/never-passing/never-passing.event-rule";
import { describe, expect, it } from "vitest";

describe("NeverPassingRule", () => {
    it("should not validate the event", () => {
        const rule = new NeverPassingEventRule();
        const calendarCandidateValidation = rule.validate();
        expect(calendarCandidateValidation).toBe(false);
    });
});