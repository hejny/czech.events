import * as React from 'react';
import { Icon } from '../Icon';
import { ISelectorProps } from './selector';

export function FontStyleSelector(props: ISelectorProps) {
    const onClick = (name: string) => {
        props.value[name] = !props.value[name];
        props.onChange(props.value);
    };

    return (
        <>
            <Icon icon="bold" active={props.value['bold']} onClick={() => onClick('bold')} />
            <Icon icon="italic" active={props.value['italic']} onClick={() => onClick('italic')} />
            <Icon icon="underline" active={props.value['underline']} onClick={() => onClick('underline')} />
        </>
    );
}
