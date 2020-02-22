import * as React from 'react';
import { Event } from '../model/database/Event';
import { EventPrice } from './EventPrice';

interface IEventCodeParagraphProps {
    event: Event;
    verbose: boolean;
}

export function EventCodeParagraph({ event, verbose }: IEventCodeParagraphProps) {
    return (
        <>
            {/*event.codeName && event.codePercent && event.priceAmount && event.priceCurrency && (
                <>
                    <br />A s kódem <b>{event.codeName}</b> to budete mít o {Math.floor(event.codePercent * 100)}%
                    levnější
                    {verbose && (
                        <>
                            , tzn. za <EventPrice {...{ event, price: event.priceAmount * (1 - event.codePercent) }} />
                        </>
                    )}
                    .
                </>
                    )*/}
        </>
    );
}
