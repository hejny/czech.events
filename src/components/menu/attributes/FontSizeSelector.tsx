import * as React from 'react';
import { Icon } from '../Icon';
import { ISelectorProps } from './selector';

export function FontSizeSelector(props: ISelectorProps) {
    return (
        <>
            <Icon icon="font-size-1" active={props.value === 12} onClick={() => props.onChange(12)} />
            <Icon icon="font-size-2" active={props.value === 21} onClick={() => props.onChange(21)} />
            <Icon icon="font-size-3" active={props.value === 42} onClick={() => props.onChange(42)} />
        </>
    );
}
