import * as React from 'react';
import styled from 'styled-components';

export function LoadingComponent() {
    return <LoadingDiv>Načítání...</LoadingDiv>;
}

const LoadingDiv = styled.form`
    background-color: #ccc;
    color: #fff;
`;
