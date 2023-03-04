export function getApiUrl(): URL {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return new URL('http://localhost:17755');
    } else {
        return new URL('https://api.pavolhejny.com/czech-events');
    }
}
