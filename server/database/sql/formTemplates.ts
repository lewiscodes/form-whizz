export const createTableFormTemplatesSQL = `CREATE TABLE IF NOT EXISTS "FormTemplates" (
	id integer NOT NULL GENERATED ALWAYS AS identity PRIMARY KEY,
    "name" varchar NOT NULL,
    "isPrimary" boolean NOT NULL,
    "createdAt" timestamp NOT NULL,
    "modifiedAt" timestamp,
    "deletedAt" timestamp
);`

export const createDefaultFormTemplateSQL = `INSERT INTO public."FormTemplates"
("name", "isPrimary", "createdAt")
VALUES('Primary', true, NOW());`
