import * as React from 'react';
import { PUBLIC_URL } from '../config';
import { TouchController } from 'touchcontroller';
import { MenuWrapper } from './menu/MenuWrapper';
import { Icon } from './menu/Icon';
import { Separator } from './menu/Separator';
import { Menu } from './menu/Menu';
import { BoardState } from '../model/BoardState';
import { observer } from 'mobx-react';
import { BoardComponent } from './BoardComponent';
import { AppState } from '../model/AppState';
import { objectSerializer } from '../model/objects/10-objectSerializer';
import { ToolName } from '../tools/AbstractTool';
import { ColorSelector } from './menu/attributes/ColorSelector';
import { WeightSelector } from './menu/attributes/WeightSelector';
import { FontSizeSelector } from './menu/attributes/FontSizeSelector';
import { ListStyleSelector } from './menu/attributes/ListStyleSelector';
import { FontStyleSelector } from './menu/attributes/FontStyleSelector';

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
                    <pre>
                        {this.props.boardState.objects[0] &&
                            JSON.stringify(objectSerializer.serialize(this.props.boardState.objects[0]), null, 4)}
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
                        {/*<Icon
                            icon="text"
                            active={this.props.appState.tool === ToolName.Text}
                            onClick={() => this.switchTool(ToolName.Text)}
                        />*/}
                    </Menu>
                    {this.props.appState.tool === ToolName.Draw && (
                        <Menu orientation="horizontal">
                            <WeightSelector
                                value={this.props.appState.toolWeight}
                                onChange={(value) => (this.props.appState.toolWeight = value as number)}
                            />
                            <Separator />
                            <ColorSelector
                                value={this.props.appState.toolColor}
                                onChange={(value) => (this.props.appState.toolColor = value as string)}
                            />
                        </Menu>
                    )}
                    {this.props.appState.tool === ToolName.Text && (
                        <Menu orientation="horizontal">
                            <FontSizeSelector
                                value={this.props.appState.toolFontSize}
                                onChange={(value) => (this.props.appState.toolFontSize = value as number)}
                            />
                            <Separator />
                            <ListStyleSelector
                                value={this.props.appState.toolListStyle}
                                onChange={(value) => (this.props.appState.toolListStyle = value as any)}
                            />
                            <Separator />
                            <ColorSelector
                                value={this.props.appState.toolColor}
                                onChange={(value) => (this.props.appState.toolColor = value as string)}
                            />
                            <Separator />
                            <FontStyleSelector
                                value={this.props.appState.toolFontStyle as Object}
                                onChange={(value) => (this.props.appState.toolFontStyle = value as any)}
                            />
                        </Menu>
                    )}
                </MenuWrapper>
            </>
        );
    }
}
