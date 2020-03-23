import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/share';
import { Commit } from './Commit';
import { forValueDefined } from 'waitasecond';

export class ObjectVersionSystem {
    public readonly commits: Observable<Commit>;

    private commitsPool: { [id: string]: Commit } = {}; // TODO: Is it needed?
    private commitsObserver?: Observer<Commit>;

    constructor() {
        this.commits = Observable.create((observer: Observer<Commit>) => {
            this.commitsObserver = observer;
        }).share();
    }

    public async pushCommit(...commits: Commit[]) {
        const commitsObserver = await forValueDefined(() => this.commitsObserver);

        for (const commit of commits) {
            if (commit.previousId) {
                // TODO: previousVersion strategy to DB

                delete this.commitsPool[commit.previousId];
            }

            this.commitsPool[commit.commitId] = commit;

            this.commitsObserver.next(commit);

            // TODO: Maybe some animation frame waiting
        }
    }
}

// TODO: objects should maybe be generic
