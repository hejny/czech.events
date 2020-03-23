import { observable } from 'mobx';
import { ToolName, drawingColors } from '../tools/AbstractTool';
import { Transformation, Vector2 } from 'touchcontroller';
import { AbstractObject, AttributeType } from './objects/AbstractObject';

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

    @observable
    selected: AbstractObject[] = [];
    @observable
    selection: null | { point1: Vector2; point2: Vector2 } = null;

    //This is hack for force updating and will be in future removed by more optimized way how to update a board
    @observable version: number = 0;

    public updateTick() {
        this.version++;
    }

    getSelection() {
        if (this.selection == null) {
            return null;
        }

        return {
            topLeftCorner: new Vector2(
                Math.min(this.selection.point1.x, this.selection.point2.x),
                Math.min(this.selection.point1.y, this.selection.point2.y),
            ),
            bottomRightCorner: new Vector2(
                Math.max(this.selection.point1.x, this.selection.point2.x),
                Math.max(this.selection.point1.y, this.selection.point2.y),
            ),
        };
    }

    getSelectedBoundingBox() {
        if (this.selected) {
            return {
                topLeftCorner: new Vector2(
                    Math.min.apply(
                        null,
                        this.selected.map((point) => point.topLeftCorner.x),
                    ),
                    Math.min.apply(
                        null,
                        this.selected.map((point) => point.topLeftCorner.y),
                    ),
                ),
                bottomRightCorner: new Vector2(
                    Math.max.apply(
                        null,
                        this.selected.map((point) => point.bottomRightCorner.x),
                    ),
                    Math.max.apply(
                        null,
                        this.selected.map((point) => point.bottomRightCorner.y),
                    ),
                ),
            };
        }
    }

    getCommonAttributeValue(name: string) {
        // TODO: any
        return this.selected.reduce(
            (value, current) => (value === (current as any)[name] ? value : null),
            (this.selected[0] as any)[name],
        );
    }

    getCommonAttributes() {
        return this.selected.length > 0
            ? this.selected.reduce(
                  (attributes, object) => attributes.filter((o) => object.acceptedAttributes.includes(o)),
                  this.selected[0].acceptedAttributes,
              )
            : [];
    }
}
