import React from 'react';
import { EventType } from '../model/database/Event';
import { INewsletter } from '../model/INewsletter';
import { eventTypeToNewsletterContentPosition } from '../utils/eventTypeToNewsletterContentPosition';
import { translateEventType } from '../utils/translate';
import { EventComponent } from './EventComponent';
import { NewsletterContentsComponent } from './NewsletterContentsComponent';

// TODO: Remove @deprecated import { Newsletter } from '../model/database/Newsletter';

interface INewsletterComponentProps {
    newsletter: INewsletter;
}

export function NewsletterComponent(props: INewsletterComponentProps) {
    const { categorizedEvents, newsletterContents } = props.newsletter;

    return (
        <>
            {Object.keys(categorizedEvents).map((type) => (
                <div key={type}>
                    <br />
                    <h2>{translateEventType(type as any)}</h2>
                    <NewsletterContentsComponent
                        {...{ newsletterContents, position: eventTypeToNewsletterContentPosition(type as EventType) }}
                    />
                    <span>
                        {categorizedEvents![type].map((event) => (
                            <EventComponent {...{ event, key: event.serializeId }} />
                        ))}
                    </span>
                </div>
            ))}
        </>
    );
}
