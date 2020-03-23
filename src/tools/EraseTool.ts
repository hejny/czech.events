import { AbstractTool, ToolName } from './AbstractTool';

export class EraseTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Erase) return;

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    this.objectVersionSystem.objects = this.objectVersionSystem.objects.filter(
                        (object) => !object.isNear(this.calculateMouseCoordinates(frame.position)),
                    );
                    this.objectVersionSystem.version++;
                },
                () => {},
                () => {},
            );
        });
    }
}
