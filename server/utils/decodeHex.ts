// TODO: Probbably better name like decodeXmlEntities
export function decodeHex(input: string): string {
    return input.replace(/&#(.+?);/g, (match, xcode: string) => {
        let code: number;
        if (/^x/.test(xcode)) {
            code = parseInt(xcode.substring(1), 16);
        } else {
            code = parseInt(xcode, 10);
        }
        return String.fromCharCode(code);
    });
}
