import { observable } from 'mobx';
import { ToolName } from '../tools/AbstractTool';
import { Transformation, Vector2 } from 'touchcontroller';

/**
 * AppState represents data of the current user session
 */
export class AppState {
    @observable tool: ToolName = ToolName.Draw;

    // This represents observer view on the current board, Every user can have different. For example every user can have different position on the board.
    // TODO: Now there is working only translation, make working also scale and rotation
    @observable transformation: Transformation = new Transformation(new Vector2(100, 100));
}
