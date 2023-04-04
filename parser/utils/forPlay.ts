import readline from 'readline';

let isInitialized = false;
let isPlaying = false;
let resume: Promise<void>;
let resumeResolve: () => void;

function togglePauseKey() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        if (resumeResolve) {
            resumeResolve();
        }
    } else {
        console.info(`[ Pausing ]`);
        resume = new Promise((resolve) => {
            resumeResolve = resolve;
        });
    }
}

export function initForPlay() {
    if (isInitialized) {
        return;
    }

    isInitialized = true;
    isPlaying = true;

    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }

    process.stdin.on('keypress', (chunk, key) => {
        if (key && key.name === 'p') {
            togglePauseKey();
        } else if (key && key.name === 'c' && key.ctrl) {
            // Note: When set raw mode, Ctrl+C will not cause SIGINT so we need to do it manually
            console.info(`[ Terminated ]`);
            process.exit();
        }
        // TODO: Pause by [ space ]
    });
}

/**
 * Wait until script should continue working
 * When running just resolves
 * When the script is paused by shortcut [p] this function resolves after the user presses [p] again
 *
 * Tip: This is typically used at the begining or end of some task
 *
 * Note: On first run this function will register stdin callback so it contains ! SIDE EFFECTS !
 * Note: Only aviable in node environment
 */
export async function forPlay(): Promise<void> {
    initForPlay();

    if (!isPlaying) {
        console.info(`[ Paused ]`);
        await resume;
    }
}

/**
 * Wait until resume is pressed in terminal
 */
export async function forPlayWithPause(): Promise<void> {
    togglePauseKey();
    await forPlay();
}

const pausedTasks = new Set<string | number | symbol>();

/**
 * Wait until resume is pressed in terminal
 * - For **first** time behaves like forPlayWithPause
 * - Next time(s) with same task behaves like forPlay
 */
export async function forPlayFirstWithPause(taskId: string | number | symbol): Promise<void> {
    if (!pausedTasks.has(taskId)) {
        console.info(`[ Pausing on ${taskId.toString()} ]`);

        pausedTasks.add(taskId);
        await forPlayWithPause();
    }
    await forPlay();
}

/**
 * TODO: Probbably to @waitasecond/node
 */
