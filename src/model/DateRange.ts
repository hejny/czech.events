export class DateRange {
    constructor(public from?: Date, public to?: Date) {}

    private static fromConstants(beginConstant: RangeConstantSimple, endConstant: RangeConstantSimple): DateRange {
        return new DateRange(DateRange.fromConstant(beginConstant).from, DateRange.fromConstant(endConstant).to);
    }

    static fromConstant(constant: RangeConstant): DateRange {
        if (constant.includes('-')) {
            const [from, to] = constant.split('-');
            return DateRange.fromConstants(from as RangeConstantSimple, to as RangeConstantSimple);
        }

        const now = new Date();

        switch (constant) {
            case 'NOW':
                return new DateRange(now, now);

            case 'CURRENT_MONTH':
                return DateRange.forMonth(now);

            case 'NEXT_MONTH':
                return DateRange.forMonth(new Date(now.getFullYear(), now.getMonth() + 1, 1));

            // TODO: Maybe better name for NEXT_NEXT_MONTH
            // TODO: DRY
            case 'NEXT_NEXT_MONTH':
                return DateRange.forMonth(new Date(now.getFullYear(), now.getMonth() + 2, 1));

            case 'INFINITY':
                return new DateRange();

            default:
                throw new Error(
                    `Unknown range constant "${constant}". Please use NOW, CURRENT_MONTH, NEXT_MONTH, NEXT_NEXT_MONTH or INFINITY.`,
                );
        }
    }

    static forMonth(currentDate = new Date()): DateRange {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const from = new Date(year, month, 1);
        const to = new Date(year, month + 1, -1);

        return new DateRange(from, to);
    }

    // TODO: Deprecated due to fromConstants, fromConstant
    static ALL = new DateRange();
    static CURRENT_MONTH = DateRange.forMonth();
    static FROM_CURRENT_MONTH = new DateRange(DateRange.CURRENT_MONTH.from);

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

export type RangeConstantSimple = 'NOW' | 'CURRENT_MONTH' | 'NEXT_MONTH' | 'NEXT_NEXT_MONTH' | 'INFINITY';
export type RangeConstant =
    | 'NOW'
    | 'CURRENT_MONTH'
    | 'NEXT_MONTH'
    | 'NEXT_NEXT_MONTH'
    | 'INFINITY'
    | `${RangeConstantSimple}-${RangeConstantSimple}`;

/*/
for (const constant of ['NOW', 'CURRENT_MONTH', 'NEXT_MONTH', 'NEXT_NEXT_MONTH', 'INFINITY'] as RangeConstant[]) {
    console.log(constant, DateRange.fromConstant(constant));
}
/**/
