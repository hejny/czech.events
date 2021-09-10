import { capitalizeFirstLetter } from '../capitalizeFirstLetter';
import { Chain } from './Chain';
import { removeCity } from './city/removeCity';
import { removeTiming } from './removeTiming';
import { trimCoreName } from './trimCoreName';

export function processNameOrTopic(nameOrTopic: string): string {
    return new Chain(nameOrTopic, { log: false })
        .apply(removeTiming)
        .apply(removeCity)
        .apply(trimCoreName)
        .apply(capitalizeFirstLetter)
        .apply((nameOrTopic) => nameOrTopic.replace(/-/g, '–')).value;
}
