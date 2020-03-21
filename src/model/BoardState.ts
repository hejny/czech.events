import { observable } from 'mobx';
import { CollBoardObject } from './objects/CollBoardObject';

export class BoardState {
    //This is hack for force updating:
    @observable version: number = 0;
    @observable
    name: string = 'Nástěnka 1.A';
    @observable
    objects: CollBoardObject[] = [];
}
