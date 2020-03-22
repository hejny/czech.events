import * as React from 'react';
import { BoardState } from '../model/BoardState';
import { TouchController } from 'touchcontroller';
import { observer } from 'mobx-react';
import { AppState } from '../model/AppState';

interface IBoardComponentProps {
    appState: AppState;
    boardState: BoardState;
    touchController: TouchController;
}

interface IBoardComponentState {}

@observer
export class BoardComponent extends React.Component<IBoardComponentProps, IBoardComponentState> {
    state: IBoardComponentState = {};

    render() {
        return (
            <div className="board-container">
                <div
                    className="board"
                    style={{
                        cursor: 'crosshair' /*TODO: Cursor shuld behave according to current tool*/,
                    }}
                    ref={(element) => {
                        if (!element) return;
                        try {
                            //console.info(`Init board as touchController element.`);
                            // TODO: uninit somewhen and somewhere
                            this.props.touchController.addElement(element);
                        } catch (error) {
                            // This is because of multiple calling this ref with same element
                            //console.info(`Failed: Init board as touchController element.`);
                        }
                    }}
                >
                    <div
                        className="board-bg"
                        style={{
                            cursor: 'crosshair' /*TODO: Cursor shuld behave according to current tool*/,
                            backgroundPositionX: this.props.appState.transformation.translate.x,
                            backgroundPositionY: this.props.appState.transformation.translate.y,
                        }}
                    ></div>
                    <div style={{ display: 'none' }}>{this.props.boardState.version}</div>
                    {this.props.boardState.objects.map((item) => (
                        <div
                            key={item.uuid}
                            className="object-transform-wrapper"
                            style={{
                                position: 'absolute',
                                left: this.props.appState.transformation.translate.x,
                                top: this.props.appState.transformation.translate.y,
                            }}
                        >
                            {item.render()}
                        </div>
                    ))}

                    {/*
                    <div className="object selected" style={{ position: 'absolute', top: 200, left: 300 }}>
                        <!-- ... content ... -->
                        <div className="menu menu-h menu-popup menu-popup-right">
                            <div className="icon icon-stroke-1"></div>
                            <div className="icon icon-stroke-2"></div>
                            <div className="icon icon-stroke-3"></div>
                            <div className="menu-separator"></div>
                            <div className="icon icon-color">
                                <span style={{ backgroundColor: `rgb(49, 103, 164)` }}></span>
                            </div>
                            <div className="icon icon-color">
                                <span style={{ backgroundColor: `rgb(238, 35, 51)` }}></span>
                            </div>
                            <div className="icon icon-color">
                                <span style={{ backgroundColor: `rgb(64, 185, 60)` }}></span>
                            </div>
                            <div className="icon icon-color">
                                <span style={{ backgroundColor: `rgb(237, 240, 80)` }}></span>
                            </div>
                            <div className="icon icon-add"></div>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        );
    }
}
