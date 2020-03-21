export function classNames(...classNames: Array<string | undefined>) {
    return classNames.filter((className) => className).join(' ');
}
