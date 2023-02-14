import React from 'react';
import styles from './CalendarLink.module.css';
import { ApiClientContext } from '../../../../api/ApiClient';
import { IEventComponentProps } from '../../EventComponent';

export type ICalendarLinkProps = React.PropsWithChildren<IEventComponentProps>;

export function CalendarLink({ event, children }: ICalendarLinkProps) {
    const apiClient = React.useContext(ApiClientContext);

    if (!apiClient) {
        return <>{children}</>;
    }

    return (
        <a className={styles.CalendarLink} href={apiClient.createEventCalendarUrl(event)}>
            {children}
        </a>
    );
}
