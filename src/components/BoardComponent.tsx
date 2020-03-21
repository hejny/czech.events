import * as React from 'react';
import { BoardState } from '../model/BoardState';
import { TouchController } from 'touchcontroller';
import { observer } from 'mobx-react';

interface IBoardComponentProps {
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
                        width: '1000%',
                        height: '1000%',
                        top: 0,
                        left: 0,
                        cursor: 'crosshair' /*TODO: Cursor shuld behave according to current tool*/,
                    }}
                    ref={(element) => {
                        if (!element) return;
                        try {
                            console.info(`Init board as touchController element.`);
                            // TODO: uninit somewhen and somewhere
                            this.props.touchController.addElement(element);
                        } catch (error) {
                            // This is because of multiple calling this ref with same element
                            console.info(`Failed: Init board as touchController element.`);
                        }
                    }}
                >
                    <div style={{ display: 'none' }}>{this.props.boardState.version}</div>
                    {this.props.boardState.objects.map((item) => item.render())}

                    {/*
    
                            <div className="object selected" style={{ position: 'absolute', top: 200, left: 300 }}>
                                <svg width="100" height="120" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="m34.5,17.64999c-1,7 -4.45263,15.90027 -6,24c-2.8396,14.86394 -2.49623,19.90779 -3,24c-0.24437,1.98502 0,4 0,4c0,1 0.74812,0.43188 7,-2c6.78488,-2.63921 19,-5 26,-5c10,0 14,2 21,3l3,2l2,0l2,0"
                                            id="svg_2"
                                            fillOpacity="null"
                                            strokeOpacity="null"
                                            strokeWidth="3"
                                            stroke="#000"
                                            fill="none"
                                        />
                                        <path
                                            d="m54.5,41.64999c1,8 2.09584,13.97924 4,23c1.05313,4.98908 2,17 2,22c0,5 0,7 0,8l0,1l-2,-2l0,0"
                                            id="svg_3"
                                            fillOpacity="null"
                                            strokeOpacity="null"
                                            strokeWidth="3"
                                            stroke="#000"
                                            fill="none"
                                        />
                                    </g>
                                </svg>
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
