export function trimCoreName(fullName: string): string {
    // DRY [^a-zA-Z0-9ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]+
    fullName = fullName.replace(/^[^a-zA-Z0-9ěščřžýáíéèúůĚŠČŘŽÝÁÍÉÚŮ]+/, '');
    fullName = fullName.replace(/[^a-zA-Z0-9ěščřžýáíéèúůĚŠČŘŽÝÁÍÉÚŮ]+$/, '');

    // TODO: Not a pure trim
    fullName = fullName.replace(`"`, '');
    fullName = fullName.replace(`  `, ' ');
    return fullName;
}
