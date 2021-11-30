import sql from "..";
import { generateError, IError } from "../../api/error";
import { IEditQuestionTemplate, INewQuestionTemplate } from "../../api/models/questionTemplate";
import { getQuestionType } from "./questionType";

export interface IQuestionTemplate {
    readonly id: number;
    readonly questionId: number;
    readonly version: number;
    readonly text: string;
    readonly questionTypeId: number;
    readonly createdAt: Date;
    readonly modifiedAt: Date | null;
    readonly deletedAt: Date | null;
}

export const getAllQuestionTemplates = async (): Promise<IQuestionTemplate[]> => {
    const res = await sql.query<IQuestionTemplate>('SELECT * FROM public."QuestionTemplates" WHERE "deletedAt" IS NULL');
    return res.rows;
};

export const getQuestionTemplate = async (questionId: string): Promise<IQuestionTemplate | null> => {
    const res = await sql.query<IQuestionTemplate>('SELECT * FROM public."QuestionTemplates" WHERE "questionId" = $1 AND "deletedAt" IS NULL ORDER BY "version" DESC LIMIT 1', [questionId]);
    return res.rows[0];
}

export const createQuestionTemplate = async (questionTemplateParams: INewQuestionTemplate): Promise<IQuestionTemplate | IError | undefined> => {
    const foundQuestionType = await getQuestionType(questionTemplateParams.questionTemplateId);

    if (!foundQuestionType) {
        return generateError(500, 'Invalid questionTypeId');
    }

    const newQuestionIdRes = await sql.query<IQuestionTemplate>('SELECT "questionId" FROM public."QuestionTemplates" ORDER BY "questionId" DESC LIMIT 1');
    const newQuestionId: number = newQuestionIdRes.rows[0]?.questionId + 1 || 1;

    const res = await sql.query(`INSERT INTO public."QuestionTemplates"
        ("text", "questionId", "questionTypeId", "version", "createdAt")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `, [questionTemplateParams.text, newQuestionId, foundQuestionType.id, 1, new Date()]);
    return res.rows[0];
}

// TODO - use editable fields here...
// const editableFields: (keyof IQuestionTemplate)[] = ['text'];
export const editQuestionTemplate = async (id: string, newQuestionTemplateData: IEditQuestionTemplate): Promise<IQuestionTemplate | undefined> => {
    const questionTemplate = await getQuestionTemplate(id);
    if (questionTemplate) {
        const questionText = newQuestionTemplateData.text || questionTemplate.text;
        const res = await sql.query(`INSERT INTO public."QuestionTemplates"
            ("text", "questionId", "questionTypeId", "version", "createdAt", "modifiedAt")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [questionText, questionTemplate.questionId, questionTemplate.questionTypeId, questionTemplate.version + 1, questionTemplate.createdAt, new Date()]);

        return res.rows[0];
    }
};

export const archiveQuestionTemplate = async (id: string): Promise<IQuestionTemplate | IError | undefined> => {
    const questionTemplate = await getQuestionTemplate(id);
    if (questionTemplate) {
        const res = await sql.query('UPDATE public."QuestionTemplates" SET "deletedAt" = $1 WHERE "questionId" = $2', [new Date(), id]);
        return res.rows[0];
    }
}