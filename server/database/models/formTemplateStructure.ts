import sql from "..";
import { generateError, IError } from "../../api/error";
import { getFormTemplate } from "./formTemplate";
import { getQuestionTemplate } from "./questionTemplate";

export interface IFormTemplateStructure {
    readonly id: number;
    readonly formTemplateId: number;
    readonly questionTemplateId: number;
    readonly createdAt: Date;
    readonly modifiedAt: Date | null;
    readonly deletedAt: Date | null;
}

// export const getAllFormTemplateStructures = async (): Promise<FormTemplateStructure[]> => {
//     return await FormTemplateStructure.findAll();
// }

export const getFormTemplateStructure = async (formTemplateId: string): Promise<IFormTemplateStructure[]> => {
    const res = await sql.query('SELECT * FROM public."FormTemplateStructures" WHERE "formTemplateId" = $1', [formTemplateId]);
    return res.rows;
}

export const addQuestionTemplateToFormTemplate = async (formTemplateId: string, questionTemplateId: string): Promise<IFormTemplateStructure | IError | null> => {
    const formTemplate = await getFormTemplate(formTemplateId);
    if (!formTemplate) {
        return generateError(500, `Can't find form template`);
    }

    const questionTemplate = await getQuestionTemplate(questionTemplateId);
    if (!questionTemplate) {
        return generateError(500, `Can't find question template`);
    }

    const existingFormStructure = await getFormTemplateStructure(formTemplateId);
    const order = existingFormStructure.length + 1;

    const res = await sql.query(`INSERT INTO public."FormTemplateStructures"
        ("order", "formTemplateId", "questionTemplateId", "createdAt")
        VALUES($1, $2, $3, $4)
        RETURNING *
    `, [order, formTemplate.id, questionTemplate.questionId, new Date()]);

    return res.rows[0];
}