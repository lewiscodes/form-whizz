import sql from "..";
import { generateError, IError } from "../../api/error";
import { getFormTemplate } from "./formTemplate";
import { getQuestionTemplate } from "./questionTemplate";

export interface IFormTemplateStructure {
    readonly id: number;
    readonly order: number;
    readonly formTemplateId: number;
    readonly questionTemplateId: number;
    readonly createdAt: Date;
    readonly modifiedAt: Date | null;
    readonly deletedAt: Date | null;
}

export const getFormTemplateStructure = async (formTemplateId: string): Promise<IFormTemplateStructure[]> => {
    const res = await sql.query('SELECT * FROM public."FormTemplateStructures" WHERE "formTemplateId" = $1 AND "deletedAt" IS NULL ORDER BY "order" ASC', [formTemplateId]);
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

const updateOrderSqlScript = `UPDATE public."FormTemplateStructures" SET "order" = $1 WHERE "id" = $2`;

export const moveFormTemplateQuestion = async (formTemplateId: string, formTemplateStructureId: number, newPosition: number): Promise<IFormTemplateStructure[] | IError | undefined> => {
    const formTemplate = await getFormTemplate(formTemplateId);
    if (!formTemplate) {
        return generateError(500, `Can't find form template`);
    }

    const formQuestions = await getFormTemplateStructure(formTemplate.id.toString());
    const foundFormQuestion = formQuestions.find(section => section.id === formTemplateStructureId);
    if (!foundFormQuestion) {
        return generateError(500, `Can't find form structure id in form template`);
    }

    if (foundFormQuestion.order === newPosition) {
        return formQuestions;
    } else if (newPosition < foundFormQuestion.order) {
        //TODO: make a named function
        for (let x = 0; x < formQuestions.length; x++) {
            const question = formQuestions[x];

            if (question.id === formTemplateStructureId) {
                await sql.query(updateOrderSqlScript, [newPosition, question.id]);
            } else if (question.order < foundFormQuestion.order) {
                await sql.query(updateOrderSqlScript, [question.order + 1, question.id]);
            }
        }

        return await getFormTemplateStructure(formTemplateId);
    } else {
        //TODO: make a named function
        for (let x = 0; x < formQuestions.length; x++) {
            const question = formQuestions[x];

            if (question.id === formTemplateStructureId) {
                await sql.query(updateOrderSqlScript, [newPosition, question.id]);
            } else if (question.order < newPosition || question.order === newPosition) {
                await sql.query(updateOrderSqlScript, [question.order - 1, question.id]);
            }
        }

        return await getFormTemplateStructure(formTemplateId);
    }
}

const fixFormTemplateStructureOrdering = async (formTemplateStructure: IFormTemplateStructure[], removedFormTemplateStructure: IFormTemplateStructure): Promise<void> => {
    const formTemplatesStructureItemsToFix = formTemplateStructure.filter(section => section.order > removedFormTemplateStructure.order);
    for (let x = 0; x < formTemplatesStructureItemsToFix.length; x++) {
        const formTemplatesStructureItem = formTemplatesStructureItemsToFix[x];
        await sql.query(updateOrderSqlScript, [formTemplatesStructureItem.order - 1, formTemplatesStructureItem.id]);
    }
}

export const removeQuestionFromFormTemplate = async (formTemplateId: string, formTemplateStructureId: number): Promise<IFormTemplateStructure[] | IError> => {
    const formTemplate = await getFormTemplate(formTemplateId);
    if (!formTemplate) {
        return generateError(500, `Can't find form template`);
    }
    
    const formQuestions = await getFormTemplateStructure(formTemplate.id.toString());
    const foundFormQuestion = formQuestions.find(section => section.id === formTemplateStructureId);
    if (!foundFormQuestion) {
        return generateError(500, `Can't find form structure id in form template`);
    }

    const sqlScript = `UPDATE public."FormTemplateStructures" SET "deletedAt" = NOW() WHERE id = $1`;
    await sql.query(sqlScript, [foundFormQuestion.id]);
    await fixFormTemplateStructureOrdering(formQuestions, foundFormQuestion);

    return await getFormTemplateStructure(formTemplateId);
}