import * as React from 'react';
import { ApiClient } from '../api/ApiClient';
import { PUBLIC_URL } from '../config';
import { TouchController } from 'touchcontroller';
import { MenuWrapper } from './menu/MenuWrapper';
import { Icon, IconColor } from './menu/Icon';
import { Separator } from './menu/Separator';
import { Menu } from './menu/Menu';
import { BoardState } from '../model/BoardState';
import { observer } from 'mobx-react';
import { BoardComponent } from './BoardComponent';
import { AppState } from '../model/AppState';
import { ToolName, drawingColors } from '../tools/AbstractTool';

interface IRootComponentProps {
    appState: AppState;
    boardState: BoardState;
    //apiClient: ApiClient;
    touchController: TouchController;
}

interface IRootComponentState {}

@observer
export class RootComponent extends React.Component<IRootComponentProps, IRootComponentState> {
    state: IRootComponentState = {};

    /*/
    constructor(props: IRootComponentProps) {
        super(props);
    }
    /**/

    render() {
        // TODO: refactoring: Break to multiple components
        return (
            <>
                <div className="debug">
                    aaa
                    {this.props.boardState.objects[0] && 'aaa'}
                    <pre>
                        {this.props.boardState.objects[0] &&
                            JSON.stringify(this.props.boardState.objects[0].serialize(), null, 4)}
                    </pre>
                </div>
                <BoardComponent {...this.props} />
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
                        <input
                            type="text"
                            className="stealth board-name"
                            defaultValue={this.props.boardState.name}
                            onChange={(event) => {
                                this.props.boardState.name = event.target.value;
                            }}
                        />
                        <button type="button" className="btn btn-primary">
                            Sdílet
                        </button>
                    </Menu>
                </MenuWrapper>
                <MenuWrapper position="bottom-ltr">
                    <Menu orientation="horizontal">
                        <Icon
                            icon="cursor"
                            active={this.props.appState.tool === ToolName.Drag}
                            onClick={() => (this.props.appState.tool = ToolName.Drag)}
                        />
                        <Icon
                            icon="hand"
                            active={this.props.appState.tool === ToolName.Move}
                            onClick={() => (this.props.appState.tool = ToolName.Move)}
                        />
                        <Icon
                            icon="pen"
                            active={this.props.appState.tool === ToolName.Draw}
                            onClick={() => (this.props.appState.tool = ToolName.Draw)}
                        />
                        <Icon
                            icon="erase"
                            active={this.props.appState.tool === ToolName.Erase}
                            onClick={() => (this.props.appState.tool = ToolName.Erase)}
                        />
                    </Menu>
                </MenuWrapper>
                {this.props.appState.tool === ToolName.Draw && (
                    <MenuWrapper position="bottom-rtl">
                        <Menu orientation="horizontal">
                            <Icon
                                icon="stroke-1"
                                active={this.props.appState.weight === 2}
                                onClick={() => (this.props.appState.weight = 2)}
                            />
                            <Icon
                                icon="stroke-2"
                                active={this.props.appState.weight === 5}
                                onClick={() => (this.props.appState.weight = 5)}
                            />
                            <Icon
                                icon="stroke-3"
                                active={this.props.appState.weight === 15}
                                onClick={() => (this.props.appState.weight = 15)}
                            />
                            <Separator />
                            <>
                                {Object.keys(drawingColors).map((key) => (
                                    <IconColor
                                        color={drawingColors[key]}
                                        active={this.props.appState.color === drawingColors[key]}
                                        onClick={() => (this.props.appState.color = drawingColors[key])}
                                    />
                                ))}
                            </>
                        </Menu>
                    </MenuWrapper>
                )}
            </>
        );
    }
}
