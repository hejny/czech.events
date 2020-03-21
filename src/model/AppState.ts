import { observable } from 'mobx';
import { Tool } from '../tools/Tool';

/**
 * AppState represents data of the current user session
 */
export class AppState {
    @observable tool: Tool = Tool.Draw;
}
