import { AbstractTool, ToolName } from './AbstractTool';
import { MultiTouchController, BoundingBox } from 'touchcontroller';

export class MoveTool extends AbstractTool {
    setListeners() {
        // TODO: Maybe there should be only one instance of MultiTouchController as it is with TouchController
        const multiTouchController = new MultiTouchController(this.touchController, (frame) => frame.element);

        multiTouchController.multiTouches.subscribe((multitouch) => {
            //if (typeof multitouch.element === 'undefined') return;
            //let draggingElement = multitouch.element;

            if (this.appState.tool !== ToolName.Move) return;

            console.log('multitouch', multitouch);

            multitouch.transformations(BoundingBox.One()).subscribe(
                (transformation) => {
                    console.log('transformation', transformation);

                    // TODO: Sanitize transformation - remove scale and rotation
                    this.appState.transformation = this.appState.transformation.add(transformation);

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
