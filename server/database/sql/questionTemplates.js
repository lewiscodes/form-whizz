"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableQuestionTemplatesSQL = void 0;
exports.createTableQuestionTemplatesSQL = `CREATE TABLE IF NOT EXISTS "QuestionTemplates" (
	id integer NOT NULL GENERATED ALWAYS AS identity PRIMARY KEY,
	"questionId" integer NOT NULL,
	version integer not null,
    "text" varchar NOT NULL,
    "questionTypeId" integer not null REFERENCES public."QuestionTypes"(id),
    "createdAt" timestamp NOT NULL,
    "modifiedAt" timestamp,
    "deletedAt" timestamp
);`;
