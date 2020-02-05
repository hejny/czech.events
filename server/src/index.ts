import { createApp } from "./app";
import { PORT } from "./config";

const { app } = createApp();

app.listen(PORT, () => {
    console.info('██████████████████████████████████████████');
    console.info(`API is running at http://localhost:${PORT}`);
    // TODO: displayRoutes(app);
});

/*
TODO: Is this worth it?
process.on('unhandledRejection', (err) => {
    console.error(err);
});
*/

