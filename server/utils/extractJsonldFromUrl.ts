import fetch from 'node-fetch';

export async function extractJsonldFromUrl(url: string): Promise<any> {
    const response = await fetch(url);
    const text = await response.text();

    const parsing = /<script type="application\/ld\+json" nonce="[a-zA-Z0-9]+">(.*)<\/script>/.exec(text);

    if (!parsing) {
        throw new Error(`JSON LD not found`);
    }

    const [_, jsonldstring] = parsing;
    const jsonld = JSON.parse(jsonldstring);

    return jsonld;
}
