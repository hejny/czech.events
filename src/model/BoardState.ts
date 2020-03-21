import { observable } from 'mobx';
import { AbstractObject } from './objects/AbstractObject';

/**
 * BoardState represents data of the board which will be synced and saved
 */
export class BoardState {
    //This is hack for force updating, maybe only one version for AppState and BoardState
    @observable version: number = 0;
    @observable
    name: string = 'Nástěnka 1.A';
    @observable
    objects: AbstractObject[] = [];
}
