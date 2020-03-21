import { observable } from 'mobx';
import { CollBoardObject } from './objects/CollBoardObject';

export class BoardState {
    @observable
    name: string = 'Nástěnka 1.A';
    @observable
    objects: CollBoardObject[];
}
