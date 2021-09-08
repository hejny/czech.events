import { capitalizeFirstLetter } from '../capitalizeFirstLetter';
import { removeCity } from './city/removeCity';
import { expandShortcuts } from './expandShortcuts';
import { removeMetalabels } from './removeMetalabels';
import { removeTiming } from './removeTiming';
import { trimCoreName } from './trimCoreName';


export function processPiece(piece: string): string {
    // TODO: Chain syntax
    const pieceWithoutTiming = removeTiming(piece);
    const pieceWithoutTimingAndCity = removeCity(pieceWithoutTiming);
    const pieceWithoutTimingCityAndMetalabels = removeMetalabels(pieceWithoutTimingAndCity);
    const pieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts = expandShortcuts(
        pieceWithoutTimingCityAndMetalabels
    );
    const trimmedPieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts = trimCoreName(
        pieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts
    );
    const trimmedAndCapitalizedPieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts = capitalizeFirstLetter(
        trimmedPieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts
    );

    /*/
    console.log({
        piece,
        pieceWithoutTiming,
        pieceWithoutTimingAndCity,
        pieceWithoutTimingCityAndMetalabels,
        pieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts,
        trimmedPieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts,
        trimmedAndCapitalizedPieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts,
    });
    /**/
    return trimmedAndCapitalizedPieceWithoutTimingCityAndMetalabelsWithExpandedShortcuts;
}
