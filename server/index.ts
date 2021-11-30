import app from './api';
import sql from './database';
import { initData } from './database/setup';

const port = 5002;
const forceDatabaseInit = false;

app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);

    try {
        await sql.connect();
        await initData(forceDatabaseInit);
        console.log('Database Connection established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database: ', error);
    }
});
