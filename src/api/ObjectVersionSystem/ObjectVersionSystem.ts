import { Observable, Observer } from 'rxjs';
import { share } from 'rxjs/operators';
import { Commit } from './Commit';
import { forValueDefined } from 'waitasecond';
import { AbstractObject } from '../../model/objects/AbstractObject';

export class ObjectVersionSystem {
    public readonly commits: Observable<Commit>;

    private commitsPool: { [id: string]: Commit } = {}; // TODO: Is it needed?
    private commitsObserver?: Observer<Commit>;

    constructor() {
        this.commits = Observable.create((observer: Observer<Commit>) => {
            this.commitsObserver = observer;
        }).pipe(share()); // TODO: Maybe publish
    }

    public async pushCommit(...commits: Commit[]) {
        //console.log('commit');

        const commitsObserver = await forValueDefined(() => this.commitsObserver);

        for (const commit of commits) {
            if (commit.previousId) {
                // TODO: previousVersion strategy to DB

                delete this.commitsPool[commit.previousId];
            }

            this.commitsPool[commit.commitId] = commit;

            commitsObserver.next(commit);
            // TODO: Maybe some animation frame waiting
        }
    }

    public commitChain(previousVersion: 'KEEP' | 'REPLACE'): (data: AbstractObject) => void {
        let commit: Commit | null = null;

        return (data: AbstractObject) => {
            if (!commit) {
                commit = Commit.newCommit(data);
            } else {
                commit.nextCommit(data, previousVersion);
            }
            this.pushCommit(commit);
        };
    }

    // TODO: objects should maybe be generic
    public get objects(): AbstractObject[] {
        return Object.values(this.commitsPool)
            .map((commit) => commit.data)
            .filter((x) => x);
    }

    // TODO: objects should maybe be generic
    public lastCommitOfObject(object: AbstractObject): Commit | null {
        for (const commit of Object.values(this.commitsPool)) {
            if (commit.data === object) {
                return commit;
            }
        }
        return null;
    }
}
