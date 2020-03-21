import * as React from 'react';
import { ApiClient } from '../api/ApiClient';
import { PUBLIC_URL } from '../config';
import { TouchController, Vector2 } from 'touchcontroller';
import uuid from 'uuid';

interface ICollBoardComponentProps {
    apiClient: ApiClient;
}

interface ICollBoardComponentState {
    // TODO: As MobXobject
    items: IBoardItem[];
}

interface IBoardItem {
    // TODO:
    uuid: string;
    points: Vector2[];
}

export class CollBoardComponent extends React.Component<ICollBoardComponentProps, ICollBoardComponentState> {
    state: ICollBoardComponentState = { items: [] };

    /**/
    constructor(props: ICollBoardComponentProps) {
        super(props);

        // TODO: Maybe TC instance should be created same way as API driver
        const touchController = new TouchController([window.document.body], window.document.body);

        touchController.touches.subscribe((touch) => {
            //console.log('touch', touch);

            const item: IBoardItem = {
                uuid: uuid.v4(),
                points: [touch.firstFrame.position],
            };

            touch.frames.subscribe(
                (frame) => {
                    //console.log('frame', frame);
                    //console.log('frame.position', frame.position);
                    //console.log('frame.positionRelative', frame.positionRelative);

                    item.points.push(frame.position);
                },
                () => {},
                () => {
                    //console.log('item', item);

                    this.setState({
                        items: [...this.state.items, item],
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
                            /*
                            if (!element) return;

                            console.log(`TC init`);

                            const touchController = new TouchController([element], element);

                            touchController.touches.subscribe((touch) => {
                                //console.log('touch', touch);

                                const item: IBoardItem = {
                                    uuid: uuid.v4(),
                                    points: [touch.firstFrame.position],
                                };

                                touch.frames.subscribe(
                                    (frame) => {
                                        //console.log('frame', frame);
                                        //console.log('frame.position', frame.position);
                                        //console.log('frame.positionRelative', frame.positionRelative);

                                        item.points.push(frame.position);
                                    },
                                    () => {},
                                    () => {
                                        //console.log('item', item);

                                        this.setState({
                                            items: [item],
                                        });
                                    },
                                );
                            });
                            
                            */
                        }}
                    >
                        {this.state.items.map((item) => (
                            <div
                                key={item.uuid}
                                className="object"
                                style={{
                                    position: 'absolute',
                                    left: item.points[0].x,
                                    top: item.points[0].y,
                                    border: '2px dotted red',
                                }}
                            >
                                <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d={item.points
                                                .map((point, i) => {
                                                    const pointRelative = point.subtract(item.points[0]);
                                                    return `${i === 0 ? 'M' : 'L'}${pointRelative.x} ${
                                                        pointRelative.y
                                                    }`;
                                                })
                                                .join(' ')}
                                            id={item.uuid}
                                            fillOpacity="null"
                                            strokeOpacity="null"
                                            strokeWidth="3"
                                            stroke="#000"
                                            fill="none"
                                        />
                                    </g>
                                </svg>
                            </div>
                        ))}

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

                        <div className="object" style={{ position: 'absolute', top: 200, left: 300 }}>
                            <svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="m516.5,289.64999c2,24 2.49976,39.97659 3,56c0.15601,4.99756 0,16 0,18l0,1l0,1l0,0"
                                        id="svg_5"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="3"
                                        stroke="#000"
                                        fill="none"
                                    />
                                    <path
                                        d="m467.5,329.64999c15,0 31.15848,-0.7572 52,4c15.13489,3.45465 35,8 40,8l4,0l2,0l1,0"
                                        id="svg_6"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="3"
                                        stroke="#000"
                                        fill="none"
                                    />
                                    <path
                                        d="m342.5,172.64999c3,-1 11.24362,-9.1893 31,-2c54.3168,19.76578 46.69351,37.04832 46,42c-1.00977,7.20975 -4.12967,13.43878 -10,24c-3.50339,6.30287 -10.60641,14.54901 -16,18c-5.65054,3.61542 -21.78357,10.46585 -30,14c-10.75223,4.62488 -16.07739,6.21286 -21,9c-3.58792,2.03146 -6,0 -6,2c0,3 12.00208,-2.27264 30,-2c33.01135,0.50006 55,6 72,8l2,0l2,0l0,0"
                                        id="svg_7"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="3"
                                        stroke="#000"
                                        fill="none"
                                    />
                                    <path
                                        d="m168.5,252.64999c-2,1 -4.98692,4.75711 -6,11c-0.96109,5.92252 4.24519,16.57858 9,22c7.00923,7.99191 14.55954,12.5379 23,19c11.4514,8.7673 17.67287,10.28027 22,15c2.43658,2.65765 5.48625,5.82376 6,8c1.14876,4.86624 1.53073,10.30447 0,14c-2.16478,5.22626 -5.09831,9.91034 -12,12c-4.78546,1.44891 -16.532,2.72198 -32,-3c-10.48587,-3.87897 -22.03857,-12.11639 -27,-19c-3.92236,-5.44199 -5.12218,-9.00751 -5,-10c0.50377,-4.09222 3.62361,-9.39783 11,-16c4.77115,-4.27039 10.6129,-9.76859 16,-12c3.80925,-1.57785 11.1113,-3.64505 18,-6c5.09564,-1.74197 9.37642,-4.08032 11,-8c0.76537,-1.84775 0,-5 -2,-9c-2,-4 -6.38588,-9.32828 -12,-13c-6.53644,-4.27493 -11,-8 -15,-8c-3,0 -5,0 -6,0l-1,1"
                                        id="svg_8"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="3"
                                        stroke="#000"
                                        fill="none"
                                    />
                                    <path
                                        d="m448.5,45.64999c1,-1 13.09039,-4.12128 20,-3c6.24289,1.01308 13.1705,2.83869 16,6c4.27039,4.77115 8.21725,11.01722 7,25c-1.07275,12.32271 -7.37256,22.3036 -11,29c-1.71735,3.17029 -5.74673,7.37135 -10,10c-9.51056,5.87785 -19.74283,9.34457 -25,13c-4.78738,3.32878 -6,3 -2,3c3,0 13.00284,-0.2498 24,0c22.01703,0.50012 30.04495,1.73309 36,1c8.18442,-1.00755 12.90778,-3.49622 17,-4c1.98499,-0.24437 2,0 3,-1l2,0l1,0"
                                        id="svg_9"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="3"
                                        stroke="#000"
                                        fill="none"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="menu-wrapper left"></div>
                <div className="menu-wrapper right">
                    <div className="menu menu-v">
                        <div className="icon icon-zoom-in"></div>
                        <div className="zoom-status">100%</div>
                        <div className="icon icon-zoom-out"></div>
                        <div className="menu-separator d-block d-sm-none"></div>
                        <div className="icon icon-link d-block d-sm-none"></div>
                    </div>
                </div>
                <div className="menu-wrapper top-ltr">
                    <img src={`${PUBLIC_URL}/assets/logo-dark.png`} alt="CollBoard.com" className="brand" />
                    <div className="menu menu-h d-none d-sm-block">
                        <input type="text" className="stealth board-name" defaultValue="SmashMouthHasBestMusic" />
                        <button type="button" className="btn btn-primary">
                            Sdílet
                        </button>
                    </div>
                </div>
                <div className="menu-wrapper top-rtl"></div>
                <div className="menu-wrapper bottom-ltr">
                    <div className="menu menu-h">
                        <div className="icon icon-cursor"></div>
                        <div className="icon icon-hand"></div>
                        <div className="icon icon-pen active">
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
                        <div className="icon icon-erase"></div>
                    </div>
                </div>
                <div className="menu-wrapper bottom-rtl"></div>
            </>
        );
    }
}
