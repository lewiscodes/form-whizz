import sql from "..";
import { generateError, IError } from "../../api/error";
import { IEditFormTemplate, INewFormTemplate } from "../../api/models/formTemplate";
import { generateUpdateScriptAndValues } from "../utils";

export interface IFormTemplate {
    readonly id: number;
    readonly name: string;
    readonly isPrimary: boolean;
    readonly createdAt: Date;
    readonly modifiedAt: Date | null;
    readonly deletedAt: Date | null;
}

export const getAllFormTemplates = async (): Promise<IFormTemplate[]> => {
    const res = await sql.query<IFormTemplate>('SELECT * FROM public."FormTemplates" WHERE "deletedAt" IS NULL');
    return res.rows;
};

export const getFormTemplate = async (id: string): Promise<IFormTemplate | null> => {
    const res = await sql.query<IFormTemplate>('SELECT * FROM public."FormTemplates" WHERE id = $1 AND "deletedAt" IS NULL', [id]);
    return res.rows[0];
}

export const createFormTemplate = async (formTemplate: INewFormTemplate): Promise<IFormTemplate> => {
    const res = await sql.query(`INSERT INTO public."FormTemplates"
        ("name", "isPrimary", "createdAt")
        VALUES($1, $2, $3)
        RETURNING *
    `, [formTemplate.name, false, new Date()]);
    return res.rows[0];
}

const editableFields: (keyof IFormTemplate)[] = ['name'];
export const editFormTemplate = async (id: string, newFormTemplateData: IEditFormTemplate): Promise<void> => {
    const formTemplate = await getFormTemplate(id);
    if (formTemplate) {
        const { script, values } = generateUpdateScriptAndValues(editableFields, newFormTemplateData as Record<string, unknown>);
        const res = await sql.query(`UPDATE public."FormTemplates"
            SET ${script}
            WHERE id = $${values.length + 1}
            RETURNING *
        `, [...values, id]);

        return res.rows[0];
    }
};

export const archiveFormTemplate = async (id: string): Promise<IFormTemplate | IError | undefined> => {
    const formTemplate = await getFormTemplate(id);
    if (formTemplate) {
        if (formTemplate.isPrimary) {
            return generateError(500, `Can't archive primary form template`);
        }

        const res = await sql.query('UPDATE public."FormTemplates" SET "deletedAt" = $1 WHERE id = $2 RETURNING *', [new Date(), id]);
        return res.rows[0];
    }
}