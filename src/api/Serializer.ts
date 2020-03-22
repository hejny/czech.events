import { isNull } from 'util';

type Instantiable = { new (...args: any[]): any };
type ISerializeRule = { name: string; class: Instantiable };
export type ISerialized = { __class: string | null };

/*
// TODO: Create AbscractApiClient library
export function constructObjectFromJSON<TClass extends Instantiable>(
    Class: TClass,
    data: Partial<InstanceType<TClass>>,
) {
    const instance = new Class();
    Object.assign(instance, data);
    return instance;
}*/

// TODO: Maybe this can be done better
export class Serializer {
    constructor(private serializeRules: ISerializeRule[]) {}

    serialize(instance: any): ISerialized {
        const serializedData: ISerialized = { __class: this.getClassName(instance) };

        for (const key of Object.keys(instance)) {
            const value = instance[key];
            serializedData[key] = this.serializeWithPrimitives(value);
        }

        return serializedData;
    }

    deserialize(serialized: ISerialized): any {}

    private serializeWithPrimitives(value: any): any {
        // TODO: What about function?

        if (typeof value === 'undefined' || isNull(value)) {
            return null;
        }

        // TODO: Why is not working: ['boolean', 'number', 'bigint', 'string', 'symbol'].includes[typeof value]
        if (
            typeof value === 'boolean' ||
            typeof value === 'number' ||
            typeof value === 'bigint' ||
            typeof value === 'string' ||
            typeof value === 'symbol'
        ) {
            return value;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return value.map((value) => this.serializeWithPrimitives(value));
            } else {
                return this.serialize(value);
            }
        }

        console.log('value', value);
        // TODO: Some better error message
        throw new Error(`Serialization: Value have unexpected type "${typeof value}".`);
    }

    private getClassName(instance: any): string | null {
        for (const serializeRule of this.serializeRules) {
            if (instance instanceof serializeRule.class) {
                return serializeRule.name;
            }
        }

        //console.log('instance', instance);
        //console.log('classPool', this.classPool);
        // TODO: Some better error message
        //throw new Error(`Serialization: Instance is not in possible class pool.`);

        return null;
    }
}
