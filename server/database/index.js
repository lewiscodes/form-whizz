"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sql = new sequelize_1.Sequelize('postgres://sa:pass@localhost:5432/form_whizz');
exports.default = sql;
