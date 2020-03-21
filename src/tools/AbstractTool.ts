import { BoardState } from '../model/BoardState';
import { TouchController } from 'touchcontroller';
import { AppState } from '../model/AppState';

export enum ToolName {
    Move,
    Draw,
}

export class AbstractTool {
    constructor(public appState: AppState, public boardState: BoardState, public touchController: TouchController) {}

    // TODO: refactor: Is setListeners / unsetListeners good naming? Would not it be bette something like init / uninit?
    setListeners() {}

    /*
    TODO: optimization:
    unsetListeners(){
    }
    */
}
