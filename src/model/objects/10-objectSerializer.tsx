import { Vector2 } from 'touchcontroller';
import { Serializer } from '../../api/ObjectVersionSystem/Serializer';
import { Freehand } from './Freehand';
import { Commit } from '../../api/ObjectVersionSystem/Commit';

export const objectSerializer = new Serializer([
    { name: 'Vector2', class: Vector2, factory: (data: Partial<Vector2>) => new Vector2(data.x, data.y) },
    { name: 'Commit', class: Commit },
    { name: 'Freehand', class: Freehand },
]);

/**
 * Note: 10- is just a file prefix to feep it on the top of file list.
 */
