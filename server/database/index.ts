import { Sequelize } from 'sequelize';

const sql = new Sequelize('postgres://sa:pass@localhost:5432/form_whizz');

export default sql;