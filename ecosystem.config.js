module.exports = {
    apps: [
        {
            name: 'czech-events',
            script: 'npm run server-start',
            instances: '1',
            exec_mode: 'fork',
            // TODO: wait_ready: true
        },
    ],
};
