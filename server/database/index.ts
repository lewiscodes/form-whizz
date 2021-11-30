import { Pool } from 'pg';

const sql = new Pool({
    user: 'sa',
    host: 'localhost',
    database: 'form_whizz',
    password: 'pass',
    port: 5555,
});

export default sql;
