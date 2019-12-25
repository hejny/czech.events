export class DateRange {
    constructor(private from?: Date, private to?: Date) {}

    static ALL = new DateRange();
    static CURRENT_MONTH = DateRange.forMonth();

    static forMonth(currentDate = new Date()): DateRange {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const from = new Date(year, month, 1);
        const to = new Date(year, month, 31 /*TODO: Better*/);

        return new DateRange(from, to);
    }

    isIn(date: Date) {
        if (this.from && this.from > date) {
            return false;
        }

        if (this.to && this.to < date) {
            return false;
        }

        return true;
    }
}
