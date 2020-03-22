import { observable } from 'mobx';
import { ToolName, drawingColors } from '../tools/AbstractTool';
import { Transformation, Vector2 } from 'touchcontroller';

/**
 * AppState represents data of the current user session
 */
export class AppState {
    @observable tool: ToolName = ToolName.Draw;
    @observable color: string = drawingColors.black;
    @observable weight: number = 2;

    // This represents observer view on the current board, Every user can have different. For example every user can have different position on the board.
    // TODO: Now there is working only translation, make working also scale and rotation
    @observable transformation: Transformation = new Transformation(new Vector2(100, 100));
}
