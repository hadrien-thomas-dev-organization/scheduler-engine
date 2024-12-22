import { SeEvent } from "src/events/se-event";


export class EventCandidate {
    constructor(public name: string, public startDate: Date, public endDate: Date) {
    }

    toEvent(): SeEvent {
        return new SeEvent(this.name, this.startDate, this.endDate);
    }
}
