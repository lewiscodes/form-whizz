export const createTableQuestionTypesSQL = `CREATE TABLE IF NOT EXISTS "QuestionTypes" (
	id integer NOT NULL GENERATED ALWAYS AS identity PRIMARY KEY,
    "type" varchar NOT NULL
);`

export const createDefaultQuestionTypesSQL = `INSERT INTO public."QuestionTypes"
("type")
VALUES('Text'), ('Number'), ('Boolean'), ('Radio'), ('Select');`