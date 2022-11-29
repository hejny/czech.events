import React from 'react';
import styled from 'styled-components';
import { ApiClientContext } from '../api/ApiClient';
import { IEventComponentProps } from './EventComponent';

export type ICalendarLinkProps = React.PropsWithChildren<IEventComponentProps>;

export function CalendarLink({ event, children }: ICalendarLinkProps) {
    const apiClient = React.useContext(ApiClientContext);

    if (!apiClient) {
        return <>{children}</>;
    }

    return <CalendarA href={apiClient.createEventCalendarUrl(event)}>{children}</CalendarA>;
}

const CalendarA = styled.a`
    text-decoration: none;
`;
