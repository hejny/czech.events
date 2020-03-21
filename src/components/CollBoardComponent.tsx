import * as React from 'react';
import { ApiClient } from '../api/ApiClient';
import { PUBLIC_URL } from '../config';
import { TouchController, Vector2 } from 'touchcontroller';
import { MenuWrapper } from './menu/MenuWrapper';
import { Icon } from './menu/Icon';
import { Separator } from './menu/Separator';
import { Menu } from './menu/Menu';
import { CollBoardObject } from './objects/CollBoardObject';
import { Freehand } from './objects/Freehand';

interface ICollBoardComponentProps {
    apiClient: ApiClient;
    touchController: TouchController;
}

interface ICollBoardComponentState {
    // TODO: As MobXobject
    items: CollBoardObject[];
}

export class CollBoardComponent extends React.Component<ICollBoardComponentProps, ICollBoardComponentState> {
    state: ICollBoardComponentState = { items: [] };

    /**/
    constructor(props: ICollBoardComponentProps) {
        super(props);

        // TODO: Maybe somewhere should be unsubscribe
        this.props.touchController.touches.subscribe((touch) => {
            //console.log('touch', touch);

            let points: Vector2[] = [];
            points.push(touch.firstFrame.position);

            // TODO: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    //console.log('frame', frame);
                    //console.log('frame.position', frame.position);
                    //console.log('frame.positionRelative', frame.positionRelative);

                    points.push(frame.position);
                },
                () => {},
                () => {
                    //console.log('item', item);

                    this.setState({
                        items: [...this.state.items, new Freehand(points, 'red', 2)],
                    });
                },
            );
        });
    }
    /**/

    render() {
        // TODO: Break to multiple components
        return (
            <>
                <div className="board-container">
                    <div
                        className="board"
                        style={{ width: '1000%', height: '1000%', top: 0, left: 0, cursor: 'crosshair' }}
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
                        {this.state.items.map((item) => item.render())}

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
                <MenuWrapper position="right">
                    <Menu orientation="vertical">
                        <Icon icon="zoom-in" inactive />
                        <div className="zoom-status inactive">100%</div>
                        <Icon icon="zoom-out" inactive />
                        <Separator className="d-block d-sm-none" />
                        <Icon icon="link" className="d-block d-sm-none" inactive />
                    </Menu>
                </MenuWrapper>
                <MenuWrapper position="top-ltr">
                    <img src={`${PUBLIC_URL}/assets/logo-dark.png`} alt="CollBoard.com" className="brand" />
                    <Menu orientation="horizontal" className="d-none d-sm-block">
                        <input type="text" className="stealth board-name" defaultValue="Nástěnka 1.A" />
                        <button type="button" className="btn btn-primary">
                            Sdílet
                        </button>
                    </Menu>
                </MenuWrapper>
                <MenuWrapper position="bottom-ltr">
                    <Menu orientation="horizontal">
                        <Icon icon="cursor" inactive />
                        <Icon icon="hand" inactive />
                        <Icon icon="pen" active>
                            {/*
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
                            */}
                        </Icon>
                        <Icon icon="erase" inactive />
                    </Menu>
                </MenuWrapper>
            </>
        );
    }
}
