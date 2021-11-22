import * as React from 'react';
import styled from 'styled-components';

// TODO: Deprecated remove
export function ErrorComponent({ children }: React.PropsWithChildren<{}>) {
    return <ErrorDiv>{children}</ErrorDiv>;
}

const ErrorDiv = styled.form`
    background-color: #f00;
    color: #fff;
`;
