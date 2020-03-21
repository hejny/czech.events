import { Freehand } from '../model/objects/Freehand';
import { AbstractTool, ToolName } from './AbstractTool';

export class DrawTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Draw) return;
            //console.log('touch', touch);

            const objectInProcess = new Freehand([touch.firstFrame.position], 'red', 2);
            this.boardState.objects.push(objectInProcess);

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    //console.log('frame', frame);
                    //console.log('frame.position', frame.position);
                    //console.log('frame.positionRelative', frame.positionRelative);

                    objectInProcess.points.push(frame.position);
                    this.boardState.version++;
                },
                () => {},
                () => {
                    // Finished
                },
            );
        });
    }
}
