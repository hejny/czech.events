// TODO: Better name
export function stripHTMLTags(input: string) {
    // TODO: is it complete?
    return input.replace(/<\/?[^>]+(>|$)/g, '');
}
