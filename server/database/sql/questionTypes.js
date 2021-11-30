"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultQuestionTypesSQL = exports.createTableQuestionTypesSQL = void 0;
exports.createTableQuestionTypesSQL = `CREATE TABLE IF NOT EXISTS "QuestionTypes" (
	id integer NOT NULL GENERATED ALWAYS AS identity PRIMARY KEY,
    "type" varchar NOT NULL
);`;
exports.createDefaultQuestionTypesSQL = `INSERT INTO public."QuestionTypes"
("type")
VALUES('Text'), ('Number'), ('Boolean'), ('Radio'), ('Select');`;
