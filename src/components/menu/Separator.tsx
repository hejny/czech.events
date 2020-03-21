import * as React from 'react';
import { classNames } from '../../utils/classNames';

interface ISeparatorProps {
    className?: string;
}

export function Separator(props: ISeparatorProps) {
    return <div className={classNames('menu-separator', props.className)}></div>;
}