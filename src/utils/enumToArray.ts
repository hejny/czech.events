export function enumToArray(enumerable: any): string[] {
    let enumMembers: any[] = Object.keys(enumerable).map((key) => enumerable[key]);
    let enumValues: string[] = enumMembers.filter((v) => typeof v === 'string');
    return enumValues;
}
