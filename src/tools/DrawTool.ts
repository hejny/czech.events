import { Freehand } from '../model/objects/Freehand';
import { AbstractTool, ToolName } from './AbstractTool';
import { Commit } from '../api/ObjectVersionSystem/Commit';

export class DrawTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Draw) return;
            //console.log('touch', touch);

            const objectInProcess = new Freehand(
                [this.calculateMouseCoordinates(touch.firstFrame.position)],
                this.appState.color,
                this.appState.weight,
            );

            const commitChain = this.objectVersionSystem.commitChain('REPLACE');
            commitChain(objectInProcess);

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    //console.log('frame', frame);
                    //console.log('frame.position', frame.position);
                    //console.log('frame.positionRelative', frame.positionRelative);

                    objectInProcess.points.push(this.calculateMouseCoordinates(frame.position));
                    commitChain(objectInProcess);

                    //objectInProcess.updateTick();
                    //this.objectVersionSystem.updateTick();
                },
                () => {},
                () => {
                    // Finished
                },
            );
        });
    }
}