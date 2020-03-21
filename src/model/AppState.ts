import { observable } from 'mobx';
import { CollBoardObject } from './objects/CollBoardObject';

export class AppState {
    @observable
    objects: CollBoardObject[];
}
