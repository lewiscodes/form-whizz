"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const sql = new pg_1.Pool({
    user: 'sa',
    host: 'localhost',
    database: 'form_whizz',
    password: 'pass',
    port: 5555,
});
exports.default = sql;
