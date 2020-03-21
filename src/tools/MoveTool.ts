import { AbstractTool, ToolName } from './AbstractTool';
import { MultiTouchController, BoundingBox } from 'touchcontroller';

export class MoveTool extends AbstractTool {
    setListeners() {
        if (this.appState.tool !== ToolName.Move) return;

        const multiTouchController = new MultiTouchController(this.touchController, (frame) => {
            console.log('frame', frame);
        });

        multiTouchController.multiTouches.subscribe((multitouch) => {
            //if (typeof multitouch.element === 'undefined') return;
            //let draggingElement = multitouch.element;

            multitouch.transformations(BoundingBox.One()).subscribe(
                (transformation) => {
                    console.log('transformation', transformation);

                    // TODO: Sanitize transformation - remove scale and rotation
                    this.appState.transformation.add(transformation);

                    //transformation.applyOnElement(draggingElement);
                },
                () => {},
                () => {
                    /* if (multitouch.empty) {
                        TC.Transformation.rotate(
                            (Math.PI * 2) / 36,
                        ).applyOnElement(draggingElement);
                        console.log(`You have selected element.`);
                    }*/
                },
            );
        });
    }
}
