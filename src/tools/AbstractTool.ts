import { TouchController, Vector2 } from 'touchcontroller';
import { AppState } from '../model/AppState';
import { ObjectVersionSystem } from '../api/ObjectVersionSystem/ObjectVersionSystem';

export enum ToolName {
    Move,
    Draw,
    Erase,
    Drag,
}

export const drawingColors: { [key: string]: string } = {
    black: '#000000',
    blue: '#3167A4',
    red: '#EE2333',
    green: '#40B93C',
    orange: '#F36717',
    yellow: '#EDF050',
};

export abstract class AbstractTool {
    constructor(
        public appState: AppState,
        public objectVersionSystem: ObjectVersionSystem,
        public touchController: TouchController,
    ) {}

    // TODO: refactor: Is setListeners / unsetListeners good naming? Would not it be bette something like init / uninit?
    public abstract setListeners(): void;

    /*
    TODO: optimization:
    abstract unsetListeners(){
    }
    */

    protected calculateMouseCoordinates(point: Vector2) {
        return point.subtract(this.appState.transformation.translate);
    }
}