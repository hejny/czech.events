import * as React from 'react';
import { classNames } from '../tools/classNames';
import { PopupMenu } from './Menu';

interface IIconProps {
    icon:
        | 'cursor'
        | 'hand'
        | 'undo'
        | 'redo'
        | 'bold'
        | 'italic'
        | 'underline'
        | 'numbers'
        | 'erase'
        | 'pen'
        | 'stroke-1'
        | 'stroke-2'
        | 'stroke-3'
        | 'zoom-in'
        | 'zoom-out'
        | 'add'
        | 'shapes'
        | 'link';
    onClick?: () => void;
    className?: string;
    active?: boolean;
    inactive?: boolean;
    children?: JSX.Element[] | JSX.Element;
}

interface IIconState {
    submenuOpen: boolean;
}

export class Icon extends React.Component<IIconProps, IIconState> {
    state: IIconState = {
        submenuOpen: false,
    };

    clickHandler() {
        if (this.props.active) {
            if (this.state.submenuOpen) {
                this.setState({
                    submenuOpen: false,
                });
            } else {
                this.setState({
                    submenuOpen: true,
                });
            }
        } else {
            this.props.onClick && this.props.onClick();
        }
    }

    closeSubmenu() {
        this.setState({
            submenuOpen: false,
        });
    }

    render() {
        const { icon, className, active, inactive, children } = this.props;
        return (
            <div className={classNames('icon', 'icon-' + icon, active && 'active', inactive && 'inactive', className)}>
                <div className="click-detector" onClick={() => this.clickHandler()}></div>
                {children && this.state.submenuOpen && <PopupMenu orientation="right">{children}</PopupMenu>}
            </div>
        );
    }
}
