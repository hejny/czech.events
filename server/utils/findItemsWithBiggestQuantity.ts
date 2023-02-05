export function findItemsWithBiggestQuantity<T>(items: T[]): T[] {
    // TODO: Probbably refactor implementation
    if (items.length === 0) return [];

    const itemQuantities: Array<{ item: T; quantity: number }> = [];

    for (const item of items) {
        const itemQuantity = itemQuantities.find(({ item: item2 }) => item === item2);
        if (itemQuantity) {
            itemQuantity.quantity++;
        } else {
            itemQuantities.push({ item, quantity: 1 });
        }
    }

    itemQuantities.sort(({ quantity: q1 }, { quantity: q2 }) => (q1 < q2 ? 1 : -1));

    const itemsWithBiggestQuantity: T[] = [];

    const maxQuantity = itemQuantities[0].quantity;

    for (const { item, quantity } of itemQuantities) {
        if (quantity === maxQuantity) {
            itemsWithBiggestQuantity.push(item);
        }
    }

    return itemsWithBiggestQuantity.reverse();
}
