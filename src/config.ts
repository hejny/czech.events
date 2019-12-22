import { ConfigChecker } from 'configchecker';

// TODO: Better
const config = ConfigChecker.from(
    /*process.env*/
    {
        EVENTS_CSV_URL: `https://docs.google.com/spreadsheets/d/e/2PACX-1vRq0s15Wi8g4c61FOqIhpn0Lw4azPJdgQ3XmJ3uLDSCqQVs52nJa99YJjOGhl-XJZ713zCprzuYOpVu/pub?gid=0&single=true&output=csv`,
    },
);

//export const PORT = config.get('PORT', 'Server port').number().default(3000).value;
export const EVENTS_CSV_URL = config
    .get('EVENTS_CSV_URL')
    .url()
    .required().value; //TODO: use in all places that debugs something
