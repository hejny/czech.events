import { isNull } from 'util';

type Instantiable = { new (...args: any[]): any };
type ISerializeRule = { name: string; class: Instantiable; factory?: (serialized: ISerialized & any) => any };
export type ISerialized = { __class?: string };

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
        //console.log('serializing', instance);

        const serializedData: ISerialized = {};

        const serializeRule = this.getSerializeRuleFromInstance(instance);
        if (serializeRule) {
            serializedData.__class = serializeRule.name;
        }

        for (const key of Object.keys(instance)) {
            const value = instance[key];
            serializedData[key] = this.serializeWithPrimitives(value);
        }

        return serializedData;
    }

    deserialize(serialized: ISerialized): any {
        //console.log('deserializing', serialized);

        let instance: any;
        const serializeRule = this.getSerializeRuleFromSerialized(serialized);

        if (serializeRule) {
            if (serializeRule.factory) {
                instance = serializeRule.factory(serialized);
                return instance;
            } else {
                instance = new serializeRule.class();
            }
        } else {
            instance = {};
        }

        for (const key of Object.keys(serialized)) {
            const value = serialized[key];
            instance[key] = this.deserializeWithPrimitives(value);
        }

        return instance;
    }

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

    private deserializeWithPrimitives(value: any): any {
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
                return value.map((value) => this.deserializeWithPrimitives(value));
            } else {
                return this.deserialize(value);
            }
        }

        console.log('value', value);
        // TODO: Some better error message
        throw new Error(`Deserialization: Value have unexpected type "${typeof value}".`);
    }

    private getSerializeRuleFromInstance(instance: any): ISerializeRule | null {
        // TODO: Maybe more optimal
        for (const serializeRule of this.serializeRules) {
            if (instance instanceof serializeRule.class) {
                return serializeRule;
            }
        }

        //console.log('instance', instance);
        //console.log('classPool', this.classPool);
        // TODO: Some better error message
        //throw new Error(`Serialization: Instance is not in possible class pool.`);

        return null;
    }

    private getSerializeRuleFromSerialized(serialized: ISerialized): ISerializeRule | null {
        if (!serialized.__class) {
            return null;
        }

        // TODO: Maybe more optimal
        for (const serializeRule of this.serializeRules) {
            if (serialized.__class === serializeRule.name) {
                return serializeRule;
            }
        }

        return null;

        // TODO: Some better error message
        throw new Error(`Deserialization: Instance is not in possible class pool.`);
    }
}
