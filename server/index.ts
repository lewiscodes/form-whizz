import app from './api';
import sql from './database';
import { initData } from './database/setup';

const port = 5000;

app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
    try {
        await sql.authenticate();
        // await sql.sync({ force: true });
        await sql.sync();
        await initData();
        console.log('Database Connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
