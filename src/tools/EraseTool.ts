import { AbstractTool, ToolName } from './AbstractTool';
import { Commit } from '../api/ObjectVersionSystem/Commit';

export class EraseTool extends AbstractTool {
    setListeners() {
        this.touchController.touches.subscribe((touch) => {
            if (this.appState.tool !== ToolName.Erase) return;

            // TODO: optimization: Maybe somewhere should be unsubscribe
            touch.frames.subscribe(
                (frame) => {
                    /*this.objectVersionSystem.objects = this.objectVersionSystem.objects.filter(
                        (object) => !object.isNear(this.calculateMouseCoordinates(frame.position)),
                    );*/

                    for (const object of this.objectVersionSystem.objects) {
                        if (object.isNear(this.calculateMouseCoordinates(frame.position))) {
                            let commit = this.objectVersionSystem.lastCommitOfObject(object);
                            commit = commit.nextCommit(null, 'KEEP');
                            this.objectVersionSystem.pushCommit(commit);
                        }
                    }
                },
                () => {},
                () => {},
            );
        });
    }
}
