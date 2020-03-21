import * as React from 'react';
import { classNames } from '../tools/classNames';

interface IMenuProps {
    orientation: 'horizontal' | 'vertical';
    children: JSX.Element[] | JSX.Element;
    className?: string;
}

export function Menu(props: IMenuProps) {
    return (
        <div className={classNames('menu', props.orientation === 'horizontal' ? 'menu-h' : 'menu-v', props.className)}>
            {props.children}
        </div>
    );
}

interface IPopupMenuProps {
    orientation: 'left' | 'right';
    children: JSX.Element[] | JSX.Element;
    className?: string;
}

export function PopupMenu(props: IPopupMenuProps) {
    return (
        <div className={classNames('menu', 'menu-h', 'menu-popup', 'menu-popup-' + props.orientation, props.className)}>
            {props.children}
        </div>
    );
}
