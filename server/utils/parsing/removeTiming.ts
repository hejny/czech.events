export function removeTiming(sentence: string): string {
    // 🎁 Wrap between spaces
    sentence = ` ${sentence} `;

    // ❌ Remove Full year
    sentence = sentence.replace(/\s\d{4}\s/, ' ');
    sentence = sentence.replace(
        /\s\d{1,2}\.\d{1,2}(\.\d{4})?\.?(?<![01234]\.[01234])/ /* Dates like "09.06." or "09.06.2021" */,
        ' ',
    );

    // ❌ Remove Dates like "09/06"
    sentence = sentence.replace(/\s(\d{4}[/-])?\d{1,2}[/-]\d{1,2}\s/, ' ');

    // ❌ Remove Arab + Roman numbers with optional prefix Vol.
    sentence = sentence.replace(/\s((VOL|Vol|vol)\.?\s+)?(((#\d{1,3}\.?)|(#?\d{1,3}\.))|([IVXLCDM]{1,7}))\s/, ' ');

    // ❌ Remove Arab + Roman numbers with required prefix Vol.
    sentence = sentence.replace(/\s((VOL|Vol|vol)\.?\s+)((#?\d{1,3}\.?)|([IVXLCDM]{1,7}))\s/, ' ');

    // ❌ Remove Roman numbers at the end of the event WITH some exeptions
    if (!/30 (pod|under) 30/i.test(sentence) && !/101\s+$/.test(sentence)) {
        sentence = sentence.replace(/(?<!\d\.?)(\d{1,3}\s+$)/, ' ');
    }

    return sentence.trim();
}
