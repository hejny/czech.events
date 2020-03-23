import * as React from 'react';
import { Icon } from '../Icon';
import { ISelectorProps } from './selector';

export function ListStyleSelector(props: ISelectorProps) {
    return (
        <>
            <Icon
                icon="numbers"
                active={props.value === 'ordered'}
                onClick={() => props.onChange(props.value === 'ordered' ? 'none' : 'ordered')}
            />
            <Icon
                icon="list"
                active={props.value === 'unordered'}
                onClick={() => props.onChange(props.value === 'unordered' ? 'none' : 'unordered')}
            />
        </>
    );
}
