
export function joinArray<T>(array: T[], delimiter: T): T[] {
  const delimitedArray: T[] = [];

  for (const item of array) {
    if (delimitedArray.length) {
      delimitedArray.push(delimiter);
    }
    delimitedArray.push(item);
  }

  return delimitedArray;
}
