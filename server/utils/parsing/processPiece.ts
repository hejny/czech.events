import { capitalizeFirstLetter } from '../capitalizeFirstLetter';
import { Chain } from './Chain';
import { removeCity } from './city/removeCity';
import { expandShortcuts } from './expandShortcuts';
import { removeMetalabels } from './removeMetalabels';
import { removeTiming } from './removeTiming';
import { trimCoreName } from './trimCoreName';

export function processPiece(piece: string): string {
    return new Chain(piece)
        .apply(removeTiming)
        .apply(removeCity)
        .apply(removeMetalabels)
        .apply(expandShortcuts)
        .apply(trimCoreName)
        .apply(capitalizeFirstLetter).value;
}
