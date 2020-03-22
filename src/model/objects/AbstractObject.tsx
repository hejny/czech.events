import uuid from 'uuid';
import { Vector2 } from 'touchcontroller';
import { idstring } from '../../utils/idstring';
import { Freehand } from './Freehand';
import { Serializer, ISerialized } from '../../api/Serializer';

export const IS_NEAR_DISTANCE = 20;

export enum AttributeType {
    Color,
    Weight,
}

// TODO: refactoring: maybe better naming
export abstract class AbstractObject {
    uuid: string;
    shift: Vector2;
    version: idstring;

    constructor() {
        this.uuid = uuid.v4();
        this.shift = new Vector2(0, 0);
    }

    abstract render(selected: boolean): JSX.Element;

    abstract get topLeftCorner(): Vector2;
    abstract get bottomRightCorner(): Vector2;

    abstract isNear(point: Vector2): boolean;

    abstract get acceptedAttributes(): AttributeType[];

    move(shift: Vector2) {
        this.shift = this.shift.add(shift);
    }
    public updateTick() {
        // TODO: optimize
        this.version = uuid.v4();
    }

    serialize(): ISerialized {
        // TODO: Cache
        const objectSerializer = new Serializer([
            { name: 'Vector2', class: Vector2 },
            { name: 'Freehand', class: Freehand },
        ]);
        return objectSerializer.serialize(this);
    }
}
