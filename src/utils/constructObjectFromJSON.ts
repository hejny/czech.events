type Instantiable = { new (...args: any[]): any };

export function constructObjectFromJSON<TClass extends Instantiable>(
    Class: TClass,
    data: Partial<InstanceType<TClass>>,
) {
    const instance = new Class();
    Object.assign(instance, data);
    return instance;
}
