import { AbstractTool, ToolName } from './AbstractTool';

export class DragTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Drag) return;

            const closeObjects = this.boardState.objects.filter((object) =>
                object.isNear(touch.firstFrame.position.subtract(this.appState.transformation.translate)),
            );

            if (closeObjects.length === 0) {
                return; // TODO: selection
            }

            const dragging = closeObjects[0];
            let lastPosition = touch.firstFrame.position;

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    dragging.move(frame.position.subtract(lastPosition));
                    lastPosition = frame.position;
                    this.boardState.version++;
                },
                () => {},
                () => {},
            );
        });
    }
}
