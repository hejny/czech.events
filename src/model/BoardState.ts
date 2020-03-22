import { observable } from 'mobx';
import { AbstractObject } from './objects/AbstractObject';
import { Vector2 } from 'touchcontroller';

/**
 * BoardState represents data of the board which will be synced and saved
 */
export class BoardState {
    //This is hack for force updating
    @observable version: number = 0;

    public updateTick() {
        this.version++;
    }

    @observable
    name: string = 'Nástěnka 1.A';
    @observable
    objects: AbstractObject[] = [];
}
