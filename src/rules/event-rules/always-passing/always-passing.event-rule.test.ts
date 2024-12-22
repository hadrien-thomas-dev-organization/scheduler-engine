import { AlwaysPassingEventRule } from "src/rules/event-rules/always-passing/always-passing.event-rule";
import { describe, expect, it } from "vitest";

describe("AlwaysPassingRule", () => {
    it("should validate the event", () => {
        const eventRule = new AlwaysPassingEventRule();
        const calendarCandidateValidation = eventRule.validate();
        expect(calendarCandidateValidation).toBe(true);
    });
});