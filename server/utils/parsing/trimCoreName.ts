export function trimCoreName(fullName: string): string {
    // DRY [^a-zA-Z0-9ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]+
    fullName = fullName.replace(/^[^a-zA-Z0-9ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]+/, '');
    fullName = fullName.replace(/[^a-zA-Z0-9ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]+$/, '');

    // TODO: Not a pure trim
    fullName = fullName.replace(`"`, '');
    return fullName;
}
