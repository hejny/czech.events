import { Chain } from './Chain';
import { expandShortcuts } from './expandShortcuts';
import { processNameOrTopic } from './processNameOrTopic';
import { removeMetalabels } from './removeMetalabels';

export function parseNameAndTopic(fullName: string /*  TODO: Maybe a description as input? */): {
    name: string;
    topic: string | null;
} {
    // TODO: Change for the Take library (in Collboard)
    fullName = new Chain(fullName, { log: false })
        .apply(removeMetalabels)
        .apply(expandShortcuts)
        .apply(
            /* TODO: As separate funtion OR add to existing one (expandShortcuts?) */ (fullName) =>
                fullName.replace(`tart-up`, 'tartup'),
        ).value;

    fullName = fullName.replace(/\(.*?\)/g, ''); // Note: Removing things in (brackets)
    const result = /\s*(?<name>.*?)\s*(–|-|~|(#\d+)|(\|)|(:))\s*(?<topic>.*)\s*/.exec(fullName);

    if (result) {
        let name: string;
        let topic: string | null;
        ({ name, topic } = result.groups!);

        name = processNameOrTopic(name);
        topic = processNameOrTopic(topic);

        if (topic === '' || topic === 'Opět') {
            topic = null;
        }

        if (name === '' && topic && topic !== '') {
            return parseNameAndTopic(topic);
        }

        return { name, topic };
    }

    return {
        name: processNameOrTopic(fullName),
        topic: null,
    };
}
