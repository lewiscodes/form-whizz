import { DataTypes, Model, Optional } from "sequelize";
import sql from "..";
import { generateError, IError } from "../../api/error";
import { IEditFormTemplate, INewFormTemplate } from "../../types/formTemplate";

interface FormTemplateAttributes {
    readonly id: string;
    readonly name: string;
    readonly isPrimary: boolean;
    readonly archived: boolean;
}

interface IFormTemplateAttributes extends Optional<FormTemplateAttributes, 'id' | 'archived'> {}

export class FormTemplate extends Model<IFormTemplateAttributes> {
    private id!: string;
    private name!: string;
    public isPrimary!: boolean;
    private archived!: boolean;
};

FormTemplate.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: sql
})

export const initFormTemplatesData = async (): Promise<void> => {
    await FormTemplate.create({ name: 'Primary', isPrimary: true });
}

export const getAllFormTemplates = async (): Promise<FormTemplate[]> => {
    return await FormTemplate.findAll();
};

export const getFormTemplate = async (id: string): Promise<FormTemplate | null> => {
    return await FormTemplate.findByPk(id);
}

export const createFormTemplate = async (formTemplate: INewFormTemplate): Promise<FormTemplate> => {
    return await FormTemplate.create({
        name: formTemplate.name,
        isPrimary: false
    });
}

const editableFields: (keyof FormTemplateAttributes)[] = ['name'];
export const editFormTemplate = async (id: string, newFormTemplateData: IEditFormTemplate): Promise<FormTemplate | undefined> => {
    const formTemplate = await getFormTemplate(id);
    if (formTemplate) {
        const keys = Object.keys(newFormTemplateData) as (keyof IEditFormTemplate)[];
        for (let x = 0; x < keys.length; x++) {
            const key = keys[x];
            if (editableFields.includes(key)) {
                const value = newFormTemplateData[key];
                await formTemplate.update({ [key]: value });
            }
        }
        return formTemplate;
    }
};

// TODO: replace with Sequelize "paranoid" implimentation
export const archiveFormTemplate = async (id: string): Promise<FormTemplate | IError | undefined> => {
    const formTemplate = await getFormTemplate(id);
    if (formTemplate) {
        if (formTemplate.isPrimary) {
            return generateError(500, `Can't archive primary form template`);
        }

        await formTemplate.update({ archived: true });
        return formTemplate;
    }
}
