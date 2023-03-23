export function parseSerializeId(url: string) {
    // TODO: Make some normalization
    return new URL(url)
        .toString()
        .replace('m.facebook.com', 'www.facebook.com')
        .replace(/\?.*$/, '')
        .replace(/\/$/, '');
}
