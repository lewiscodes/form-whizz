"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultFormTemplateSQL = exports.createTableFormTemplatesSQL = void 0;
exports.createTableFormTemplatesSQL = `CREATE TABLE IF NOT EXISTS "FormTemplates" (
	id integer NOT NULL GENERATED ALWAYS AS identity PRIMARY KEY,
    "name" varchar NOT NULL,
    "isPrimary" boolean NOT NULL,
    "createdAt" timestamp NOT NULL,
    "modifiedAt" timestamp,
    "deletedAt" timestamp
);`;
exports.createDefaultFormTemplateSQL = `INSERT INTO public."FormTemplates"
("name", "isPrimary", "createdAt")
VALUES('Primary', true, NOW());`;
