import { processPiece } from './processPiece';

export function parseNameAndTopic(
    fullName: string /*  TODO: Maybe a description as input? */,
): { name: string; topic: string | null } {
    fullName = fullName.replace(`tart-up`, 'tartup');
    fullName = fullName.replace(/\(.*?\)/g, ''); // Note: Removing things in (brackets)
    const result = /\s*(?<name>.*?)\s*(–|(-)|(#\d+)|(\|)|(:))\s*(?<topic>.*)\s*/.exec(fullName);

    if (result) {
        let { name, topic } = result.groups!;

        name = processPiece(name);
        topic = processPiece(topic);

        if (topic === '') {
            topic = null;
        }

        return { name, topic };
    }

    return {
        name: processPiece(fullName),
        topic: null,
    };
}
