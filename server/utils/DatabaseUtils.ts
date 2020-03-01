import { Connection } from 'typeorm';

// TODO: Maybe not needed - delete
export class EmailServiceUtils {
    constructor(private databaseConnection: Connection) {}

    // TODO: Maybe fo

    /*async insertAndSelect() {
        const insertResult = await databaseConnection.manager.insert(Subscriber, subscriber);

        if (insertResult.identifiers.length === 1) {
            const subscriber = await databaseConnection.manager.findOne(Subscriber, insertResult.identifiers[0].id);
            //console.log('subscriber', subscriber);
            // TODO: Purge internal IDs
            return response.send(subscriber);
        } else {
            return null;
            // TODO: some error
        }
    }*/
}
