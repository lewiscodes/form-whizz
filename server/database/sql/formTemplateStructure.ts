export const createTableFormTemplateStructuresSQL = `CREATE TABLE IF NOT EXISTS "FormTemplateStructures" (
	id integer NOT NULL GENERATED ALWAYS AS identity PRIMARY KEY,
    "order" integer NOT NULL,
    "formTemplateId" integer NOT NULL REFERENCES public."FormTemplates"(id),
    "questionTemplateId" integer not null REFERENCES public."QuestionTemplates"(id),
    "createdAt" timestamp NOT NULL,
    "modifiedAt" timestamp,
    "deletedAt" timestamp
);`
