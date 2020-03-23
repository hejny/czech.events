import * as React from 'react';
import { PUBLIC_URL } from '../config';
import { TouchController } from 'touchcontroller';
import { MenuWrapper } from './menu/MenuWrapper';
import { Icon } from './menu/Icon';
import { Separator } from './menu/Separator';
import { Menu } from './menu/Menu';
import { observer } from 'mobx-react';
import { BoardComponent } from './BoardComponent';
import { AppState } from '../model/AppState';
import { objectSerializer } from '../model/objects/10-objectSerializer';
import { ToolName } from '../tools/AbstractTool';
import { ColorSelector } from './menu/attributes/ColorSelector';
import { WeightSelector } from './menu/attributes/WeightSelector';
import { ObjectVersionSystem } from '../api/ObjectVersionSystem/ObjectVersionSystem';

interface IRootComponentProps {
    appState: AppState;
    objectVersionSystem: ObjectVersionSystem;
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

    switchTool(tool: ToolName) {
        this.props.appState.tool = tool;
        if (this.props.appState.tool !== ToolName.Drag && this.props.appState.tool !== ToolName.Move) {
            this.props.appState.selected = [];
        }
    }

    render() {
        // TODO: refactoring: Break to multiple components
        return (
            <>
                <div className="debug" style={{ display: 'none' }}>
                    {/* <pre>
                        {this.props.objectVersionSystem.objects[0] &&
                            JSON.stringify(
                                objectSerializer.serialize(this.props.objectVersionSystem.objects[0]),
                                null,
                                4,
                            )}
                    </pre> */}
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
                        {/*
                            TODO:
                            <input
                            type="text"
                            className="stealth board-name"
                            defaultValue={this.props.objectVersionSystem.name}
                            onChange={(event) => {
                                this.props.objectVersionSystem.name = event.target.value;
                            }}
                        /> */}
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
                            onClick={() => this.switchTool(ToolName.Drag)}
                        />
                        <Icon
                            icon="hand"
                            active={this.props.appState.tool === ToolName.Move}
                            onClick={() => this.switchTool(ToolName.Move)}
                        />
                        <Icon
                            icon="pen"
                            active={this.props.appState.tool === ToolName.Draw}
                            onClick={() => this.switchTool(ToolName.Draw)}
                        />
                        <Icon
                            icon="erase"
                            active={this.props.appState.tool === ToolName.Erase}
                            onClick={() => this.switchTool(ToolName.Erase)}
                        />
                    </Menu>
                    {this.props.appState.tool === ToolName.Draw && (
                        <Menu orientation="horizontal">
                            <WeightSelector
                                value={this.props.appState.weight}
                                onChange={(value) => (this.props.appState.weight = value as number)}
                            />
                            <Separator />
                            <ColorSelector
                                value={this.props.appState.color}
                                onChange={(value) => (this.props.appState.color = value as string)}
                            />
                        </Menu>
                    )}
                </MenuWrapper>
            </>
        );
    }
}
