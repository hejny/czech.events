import { AbstractTool, ToolName } from './AbstractTool';

export class EraseTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Erase) return;

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    this.boardState.objects = this.boardState.objects.filter(
                        (object) => !object.isNear(frame.position.subtract(this.appState.transformation.translate)),
                    );
                    this.boardState.version++;
                },
                () => {},
                () => {},
            );
        });
    }
}
