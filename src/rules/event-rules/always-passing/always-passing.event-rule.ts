import { EventRule } from "src/rules/event-rules/event-rule";

export class AlwaysPassingEventRule implements EventRule {

    validate(): boolean {
        return true;
    }
}
