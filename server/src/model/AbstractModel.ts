import { format } from 'date-fns';
import { Model as ObjectionModel } from 'objection';

export class AbstractModel extends ObjectionModel {
    public static modelPaths = [__dirname];
    protected static dateFields = new Array<string>();

    $beforeInsert() {
        const thisAny = this as any;
        const constructor = this.constructor as any;

        constructor.dateFields.forEach((dateField: string) => {
            const date = this[dateField];

            if (date) {
                if (dateField.match(/^Time.*$/g)) {
                    thisAny[dateField] = format(date, 'HH:mm:ss');
                } else {
                    thisAny[dateField] = format(date, 'yyyy-MM-dd HH:mm:ss');
                }
            }
        });
    }
}
