import { Event } from '../../model/database/Event';
import { EventPrice } from '../EventComponent/EventPrice/EventPrice';

interface IEventCodeParagraphProps {
    event: Event;
    showCode: boolean;
    verbose: boolean;
}

export function EventCodeParagraph({ event, showCode, verbose }: IEventCodeParagraphProps) {
    return (
        <>
            {event.eventCodes.map((eventCode, index) => (
                <span key={index}>
                    <br />

                    {showCode ? (
                        <>
                            A s kódem <b>{eventCode.code}</b> to budete mít o {Math.floor(eventCode.value * 100)}%
                            levnější
                        </>
                    ) : (
                        <>
                            S naším kódem, který budeme posílat v dalším emalu, to budete mít o{' '}
                            {Math.floor(eventCode.value * 100)}% levnější
                        </>
                    )}

                    {verbose && (
                        <>
                            , tzn. za <EventPrice {...{ event, price: event.price! * (1 - eventCode.value) }} />
                        </>
                    )}
                </span>
            ))}
        </>
    );
}
