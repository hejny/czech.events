module.exports = {
    apps: [
        {
            name: 'czech-events',
            script: 'npm run server-start',
            instances: '1',
            exec_mode: 'fork',
            wait_ready: true
        },
    ],
};
