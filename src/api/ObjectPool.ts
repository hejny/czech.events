import { AbstractObject } from '../model/objects/AbstractObject';
import { idstring } from '../utils/idstring';

/**
 * TODO: Better name
 * Stores and compares objects for recognition which objects have changed and which not.
 */
export class ObjectPool {
    private objectsFingerprints: { uuid: idstring; version: idstring }[] = [];

    public registerNewVersions(objects: AbstractObject[]): AbstractObject[] {
        const newObjects: AbstractObject[] = [];
        for (const object of objects) {
            const oldObject = this.objectsFingerprints.find(
                (objectsFingerprint) => objectsFingerprint.uuid === object.uuid,
            );

            //console.log('oldObject', oldObject);
            if (!oldObject) {
                newObjects.push(object);
                this.objectsFingerprints.push({
                    uuid: object.uuid,
                    version: object.version,
                });
            } else {
                if (oldObject.version !== object.version) {
                    newObjects.push(object);
                    oldObject.version = object.version;
                }
            }
        }

        return newObjects;
    }
}
