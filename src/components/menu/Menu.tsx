import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { Vector2 } from 'touchcontroller';

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

interface IFloatingMenuProps {
    children: JSX.Element[] | JSX.Element;
    className?: string;
    point: Vector2;
}

export function FloatingMenu(props: IFloatingMenuProps) {
    return (
        <div
            className={classNames('menu', 'menu-h', 'menu-floating', props.className)}
            style={{
                top: props.point.y - 65,
                left: props.point.x - 7,
            }}
        >
            {props.children}
            <div
                className="bubble"
                style={{
                    left: 5,
                }}
            />
        </div>
    );
}
