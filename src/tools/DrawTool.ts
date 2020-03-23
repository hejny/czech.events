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

            // TODO: Maybe more elegant way how to create and push commit in one step with the chain of new commits
            let commit = Commit.newCommit(objectInProcess);
            this.objectVersionSystem.pushCommit(commit);

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    //console.log('frame', frame);
                    //console.log('frame.position', frame.position);
                    //console.log('frame.positionRelative', frame.positionRelative);

                    objectInProcess.points.push(this.calculateMouseCoordinates(frame.position));
                    commit = commit.nextCommit(objectInProcess, 'REPLACE');
                    this.objectVersionSystem.pushCommit(commit);
                    this.appState.updateTick();

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
