export function removeTiming(sentence: string): string {
    sentence = ` ${sentence} `;

    sentence = sentence.replace(/\s\d{4}\s/ /* Full year */, ' ');
    sentence = sentence.replace(
        /\s\d{1,2}\.\d{1,2}(\.\d{4})?\.?(?<![01234]\.[01234])/ /* Dates like "09.06." or "09.06.2021" */,
        ' ',
    );
    sentence = sentence.replace(/\s(\d{4}[/-])?\d{1,2}[/-]\d{1,2}\s/ /* Dates like "09/06" */, ' ');

    sentence = sentence.replace(
        /\s((VOL|Vol|vol)\.?\s+)?(((#\d{1,3}\.?)|(#?\d{1,3}\.))|([IVXLCDM]{1,7}))\s/ /* Arab + Roman numbers with optional prefix Vol. */,
        ' ',
    );
    sentence = sentence.replace(
        /\s((VOL|Vol|vol)\.?\s+)((#?\d{1,3}\.?)|([IVXLCDM]{1,7}))\s/ /* Arab + Roman numbers with required prefix Vol. */,
        ' ',
    );

    return sentence.trim();
}
