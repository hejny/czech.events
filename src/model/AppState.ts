import { observable } from 'mobx';
import { ToolName } from '../tools/AbstractTool';

/**
 * AppState represents data of the current user session
 */
export class AppState {
    @observable tool: ToolName = ToolName.Draw;
}
