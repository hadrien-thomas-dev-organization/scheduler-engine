import { EventRule } from "src/rules/event-rules/event-rule";

export class NeverPassingEventRule implements EventRule {

    validate(): boolean {
        return false;
    }
}