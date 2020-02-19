//import { format } from 'date-fns';
import { Model as ObjectionModel } from 'objection';

export class AbstractModel extends ObjectionModel {
    //public static modelPaths = [__dirname];
    protected static dateFields = new Array<string>();
}
