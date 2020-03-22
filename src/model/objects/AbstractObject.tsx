import uuid from 'uuid';
import { Vector2 } from 'touchcontroller';
import { idstring } from '../../utils/idstring';
//import { Freehand } from './Freehand';
//import { Serializer, ISerialized } from '../../api/Serializer';

export const IS_NEAR_DISTANCE = 20;

// TODO: refactoring: maybe better naming
export abstract class AbstractObject {
    uuid: string;
    shift: Vector2;
    version: idstring;

    constructor() {
        this.uuid = uuid.v4();
        this.shift = new Vector2(0, 0);
    }

    abstract render(): JSX.Element;

    abstract get topLeftCorner(): Vector2;
    abstract get bottomRightCorner(): Vector2;

    abstract isNear(point: Vector2): boolean;

    move(shift: Vector2) {
        this.shift = this.shift.add(shift);
    }
    public updateTick() {
        // TODO: optimize
        this.version = uuid.v4();
    }

    /*
    private static get serializer(): Serializer {
        if (!objectSerializer) {
            objectSerializer = new Serializer([
                { name: 'Vector2', class: Vector2 },
                { name: 'Freehand', class: Freehand },
            ]);
        }
        return objectSerializer;
    }

    serialize(): ISerialized {
        return AbstractObject.serialize(this);
    }

    static serialize(instance: AbstractObject): ISerialized {
        return AbstractObject.serializer.serialize(instance);
    }

    static deserialize(serialized: ISerialized): AbstractObject {
        return AbstractObject.serializer.deserialize(serialized);
    }
    */
}

//let objectSerializer: Serializer;

/*
{
    "__class": "Freehand",
    "uuid": "a5529d8d-c7e8-47cb-b2d6-542eaa7c6312",
    "shift": {
        "__class": "Vector2",
        "x": 0,
        "y": 0
    },
    "version": "b928466b-4d73-4345-8274-cef9b79333f3",
    "__test": {
        "a": 1,
        "b": 2
    },
    "points": [
        {
            "__class": "Vector2",
            "x": 270,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 270,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 280,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 284,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 288,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 291,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 297,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 300,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 305,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 308,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 312,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 317,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 321,
            "y": 336
        },
        {
            "__class": "Vector2",
            "x": 328,
            "y": 334
        },
        {
            "__class": "Vector2",
            "x": 334,
            "y": 333
        },
        {
            "__class": "Vector2",
            "x": 339,
            "y": 331
        },
        {
            "__class": "Vector2",
            "x": 346,
            "y": 329
        },
        {
            "__class": "Vector2",
            "x": 351,
            "y": 327
        },
        {
            "__class": "Vector2",
            "x": 357,
            "y": 324
        },
        {
            "__class": "Vector2",
            "x": 359,
            "y": 321
        },
        {
            "__class": "Vector2",
            "x": 364,
            "y": 318
        },
        {
            "__class": "Vector2",
            "x": 367,
            "y": 316
        },
        {
            "__class": "Vector2",
            "x": 370,
            "y": 311
        },
        {
            "__class": "Vector2",
            "x": 374,
            "y": 307
        },
        {
            "__class": "Vector2",
            "x": 378,
            "y": 302
        },
        {
            "__class": "Vector2",
            "x": 381,
            "y": 297
        },
        {
            "__class": "Vector2",
            "x": 385,
            "y": 292
        },
        {
            "__class": "Vector2",
            "x": 388,
            "y": 288
        },
        {
            "__class": "Vector2",
            "x": 391,
            "y": 280
        },
        {
            "__class": "Vector2",
            "x": 394,
            "y": 275
        },
        {
            "__class": "Vector2",
            "x": 396,
            "y": 270
        },
        {
            "__class": "Vector2",
            "x": 398,
            "y": 264
        },
        {
            "__class": "Vector2",
            "x": 399,
            "y": 258
        },
        {
            "__class": "Vector2",
            "x": 399,
            "y": 251
        },
        {
            "__class": "Vector2",
            "x": 399,
            "y": 245
        },
        {
            "__class": "Vector2",
            "x": 399,
            "y": 240
        },
        {
            "__class": "Vector2",
            "x": 399,
            "y": 235
        },
        {
            "__class": "Vector2",
            "x": 398,
            "y": 231
        },
        {
            "__class": "Vector2",
            "x": 396,
            "y": 226
        },
        {
            "__class": "Vector2",
            "x": 394,
            "y": 221
        },
        {
            "__class": "Vector2",
            "x": 392,
            "y": 219
        },
        {
            "__class": "Vector2",
            "x": 390,
            "y": 216
        },
        {
            "__class": "Vector2",
            "x": 386,
            "y": 212
        },
        {
            "__class": "Vector2",
            "x": 383,
            "y": 210
        },
        {
            "__class": "Vector2",
            "x": 379,
            "y": 207
        },
        {
            "__class": "Vector2",
            "x": 374,
            "y": 205
        },
        {
            "__class": "Vector2",
            "x": 369,
            "y": 203
        },
        {
            "__class": "Vector2",
            "x": 363,
            "y": 202
        },
        {
            "__class": "Vector2",
            "x": 357,
            "y": 202
        },
        {
            "__class": "Vector2",
            "x": 350,
            "y": 202
        },
        {
            "__class": "Vector2",
            "x": 344,
            "y": 202
        },
        {
            "__class": "Vector2",
            "x": 337,
            "y": 202
        },
        {
            "__class": "Vector2",
            "x": 330,
            "y": 203
        },
        {
            "__class": "Vector2",
            "x": 326,
            "y": 204
        },
        {
            "__class": "Vector2",
            "x": 320,
            "y": 206
        },
        {
            "__class": "Vector2",
            "x": 313,
            "y": 207
        },
        {
            "__class": "Vector2",
            "x": 308,
            "y": 208
        },
        {
            "__class": "Vector2",
            "x": 302,
            "y": 210
        },
        {
            "__class": "Vector2",
            "x": 299,
            "y": 212
        },
        {
            "__class": "Vector2",
            "x": 296,
            "y": 213
        },
        {
            "__class": "Vector2",
            "x": 294,
            "y": 214
        },
        {
            "__class": "Vector2",
            "x": 292,
            "y": 214
        },
        {
            "__class": "Vector2",
            "x": 291,
            "y": 215
        },
        {
            "__class": "Vector2",
            "x": 290,
            "y": 216
        },
        {
            "__class": "Vector2",
            "x": 290,
            "y": 218
        },
        {
            "__class": "Vector2",
            "x": 289,
            "y": 218
        },
        {
            "__class": "Vector2",
            "x": 288,
            "y": 220
        },
        {
            "__class": "Vector2",
            "x": 288,
            "y": 220
        },
        {
            "__class": "Vector2",
            "x": 288,
            "y": 221
        },
        {
            "__class": "Vector2",
            "x": 288,
            "y": 222
        },
        {
            "__class": "Vector2",
            "x": 288,
            "y": 223
        }
    ],
    "color": "#000000",
    "weight": 2,
    "minX": 270,
    "maxX": 399,
    "minY": 202,
    "maxY": 336
}
*/
