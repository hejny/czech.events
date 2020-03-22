import * as React from 'react';
import { Icon } from '../Icon';
import { ISelectorProps } from './selector';

export function WeightSelector(props: ISelectorProps) {
    return (
        <>
            <Icon icon="stroke-1" active={props.value === 2} onClick={() => props.onChange(2)} />
            <Icon icon="stroke-2" active={props.value === 5} onClick={() => props.onChange(5)} />
            <Icon icon="stroke-3" active={props.value === 15} onClick={() => props.onChange(15)} />
        </>
    );
}
