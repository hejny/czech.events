import { AbstractTool, ToolName } from './AbstractTool';

export class DragTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Drag) {
                return;
            }

            const closeObjects = this.objectVersionSystem.objects.filter((object) =>
                object.isNear(this.calculateMouseCoordinates(touch.firstFrame.position)),
            );

            if (closeObjects.length === 0) {
                this.appState.selected = [];
                this.appState.selection = {
                    point1: this.calculateMouseCoordinates(touch.firstFrame.position),
                    point2: this.calculateMouseCoordinates(touch.firstFrame.position),
                };

                touch.frames.subscribe(
                    (frame) => {
                        this.appState.selection.point2 = this.calculateMouseCoordinates(frame.position);
                        const selection = this.appState.getSelection();

                        this.appState.selected = this.objectVersionSystem.objects.filter(
                            (object) =>
                                object.topLeftCorner.x > selection.topLeftCorner.x &&
                                object.bottomRightCorner.x < selection.bottomRightCorner.x &&
                                object.topLeftCorner.y > selection.topLeftCorner.y &&
                                object.bottomRightCorner.y < selection.bottomRightCorner.y,
                        );

                        //this.objectVersionSystem.version++;
                    },
                    () => {},
                    () => {
                        this.appState.selection = null;
                    },
                );
                return;
            }

            let dragging = [];

            if (
                this.appState.selected.length > 0 &&
                closeObjects.filter((o) => this.appState.selected.includes(o)).length > 0
            ) {
                // Dragging selected object
                dragging = this.appState.selected;
            } else {
                // Dragging unselected object (select top-most)
                this.appState.selected = [closeObjects[closeObjects.length - 1]];
                dragging = this.appState.selected;
            }

            let lastPosition = touch.firstFrame.position;

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    dragging.forEach((object) => {
                        object.move(frame.position.subtract(lastPosition));
                        const commit = this.objectVersionSystem
                            .lastCommitOfObject(object)
                            .nextCommit(object, 'REPLACE');
                        this.objectVersionSystem.pushCommit(commit);
                    });
                    lastPosition = frame.position;
                    //this.objectVersionSystem.version++;
                },
                () => {},
                () => {},
            );
        });
    }
}
