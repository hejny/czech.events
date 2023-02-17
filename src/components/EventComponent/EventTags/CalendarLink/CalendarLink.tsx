import React, { useContext } from 'react';
import { ApiClientContext } from '../../../../api/ApiClient';
import { IEventComponentProps } from '../../EventComponent';

export type ICalendarLinkProps = React.PropsWithChildren<IEventComponentProps>;

export function CalendarLink({ event, children }: ICalendarLinkProps) {
    const apiClient = useContext(ApiClientContext);

    if (!apiClient) {
        return <>{children}</>;
    }

    return (
        <a href={apiClient.createEventCalendarUrl(event)} className="event-calendar-link">
            {children}
        </a>
    );
}
