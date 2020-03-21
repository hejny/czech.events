import * as React from 'react';
import { classNames } from '../tools/classNames';

interface IMenuWrapperProps {
    position: 'left' | 'right' | 'top-ltr' | 'top-rtl' | 'bottom-ltr' | 'bottom-rtl';
    children: JSX.Element[] | JSX.Element;
}

export function MenuWrapper(props: IMenuWrapperProps) {
    return <div className={classNames('menu-wrapper', props.position)}>{props.children}</div>;
}
