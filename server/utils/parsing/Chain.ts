/**
 * TODO: To external lib
 * TODO: Work with async modifiers
 * TODO: Logging
 */

export class Chain<T> {
    public constructor(readonly value: T) { }

    public apply(modifier: (value: T) => T): Chain<T> {
        return new Chain(modifier(this.value));
    }
}
