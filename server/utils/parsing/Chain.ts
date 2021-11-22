interface IChainOptions {
    log: boolean;
}

/**
 * TODO: To external lib
 * TODO: Work with async modifiers
 * TODO: Logging
 * TODO: Optional options
 */

export class Chain<T> {
    public constructor(readonly value: T, private options: IChainOptions) {}

    public apply(modifier: (value: T) => T): Chain<T> {
        const newValue = modifier(this.value);

        if (this.options.log) {
            console.info(`"${this.value as any}" ==[${modifier.name}]==> "${newValue as any}"`);
        }

        return new Chain(newValue, this.options);
    }
}
