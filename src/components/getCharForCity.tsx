export function getCharForCity(city: string): string {
    switch (city) {
        case 'Plzeň':
            return `🐫`;
        default:
            return `🌆`;
    }
}
