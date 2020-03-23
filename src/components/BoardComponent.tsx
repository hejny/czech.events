import * as React from 'react';
import { BoardState } from '../model/BoardState';
import { TouchController } from 'touchcontroller';
import { observer } from 'mobx-react';
import { AppState } from '../model/AppState';
import { FloatingMenu } from './menu/Menu';
import { Icon } from './menu/Icon';
import { AttributeType } from '../model/objects/AbstractObject';
import { Separator } from './menu/Separator';
import { WeightSelector } from './menu/attributes/WeightSelector';
import { ColorSelector } from './menu/attributes/ColorSelector';

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
        const selection = this.props.appState.getSelection();
        const translate = this.props.appState.transformation.translate;
        const commonAttributes = this.props.appState.getCommonAttributes();

        // TODO: any
        const changeAttributeValue = (value: string | number | Object, key: string) => {
            this.props.appState.selected.forEach((o) => ((o as any)[key] = value));
            this.props.boardState.version++;
        };

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
                            backgroundPositionX: translate.x,
                            backgroundPositionY: translate.y,
                        }}
                    ></div>
                    <div style={{ display: 'none' }}>{this.props.boardState.version}</div>
                    {this.props.boardState.objects.map((item) => (
                        <div
                            key={item.uuid}
                            className="object-transform-wrapper"
                            style={{
                                position: 'absolute',
                                left: translate.x,
                                top: translate.y,
                            }}
                        >
                            {item.render(this.props.appState.selected.includes(item))}
                        </div>
                    ))}
                    {this.props.appState.selection && (
                        <div
                            className="selection"
                            style={{
                                left: translate.x + selection.topLeftCorner.x,
                                top: translate.y + selection.topLeftCorner.y,
                                width: selection.bottomRightCorner.x - selection.topLeftCorner.x,
                                height: selection.bottomRightCorner.y - selection.topLeftCorner.y,
                            }}
                        ></div>
                    )}
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
                {this.props.appState.selected.length > 0 && !this.props.appState.selection && (
                    <FloatingMenu
                        point={this.props.appState
                            .getSelectedBoundingBox()
                            .topLeftCorner.add(this.props.appState.transformation.translate)}
                    >
                        <Icon
                            icon="bin"
                            onClick={() => {
                                this.props.boardState.objects = this.props.boardState.objects.filter(
                                    (object) => !this.props.appState.selected.includes(object),
                                );
                                this.props.appState.selected = [];
                                this.props.boardState.version++;
                            }}
                        />
                        {commonAttributes.includes(AttributeType.Weight) && (
                            <>
                                <Separator />
                                <WeightSelector
                                    value={this.props.appState.getCommonAttributeValue('weight')}
                                    onChange={(value) => changeAttributeValue(value, 'weight')}
                                />
                            </>
                        )}
                        {commonAttributes.includes(AttributeType.Color) && (
                            <>
                                <Separator />
                                <ColorSelector
                                    value={this.props.appState.getCommonAttributeValue('color')}
                                    onChange={(value) => changeAttributeValue(value, 'color')}
                                />
                            </>
                        )}
                    </FloatingMenu>
                )}
            </div>
        );
    }
}
