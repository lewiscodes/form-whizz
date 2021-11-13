import { Association, DataTypes, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, Optional } from "sequelize";
import sql from "..";
import { generateError, IError } from "../../api/error";
import { IEditQuestionTemplate, INewQuestionTemplate } from "../../types/questionTemplates";
import { getQuestionType, QuestionType } from "./questionType";

interface QuestionTemplateAttributes {
    readonly id: string;
    readonly text: string;
    readonly archived: boolean;
}

interface IQuestionTemplateAttributes extends Optional<QuestionTemplateAttributes, 'id' | 'archived'> {}

export class QuestionTemplate extends Model<IQuestionTemplateAttributes> {
    private id!: string;
    private text!: string;
    private archived!: boolean;

    // public readonly questionType?: QuestionType[];

    public setQuestionType!: HasOneSetAssociationMixin<QuestionType, string>;
    public getQuestionType!: HasOneGetAssociationMixin<QuestionType>;

    public static associations: {
        questionType: Association<QuestionTemplate, QuestionType>;
    };
};

QuestionTemplate.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: sql
});

QuestionTemplate.belongsTo(QuestionType);
QuestionType.hasOne(QuestionTemplate);


export const getAllQuestionTemplates = async (): Promise<QuestionTemplate[]> => {
    return await QuestionTemplate.findAll({ include: 'QuestionType' });
};

export const getQuestionTemplate = async (id: string): Promise<QuestionTemplate | null> => {
    return await QuestionTemplate.findByPk(id, { include: 'QuestionType' });
}

export const createQuestionTemplate = async (questionTemplateParams: INewQuestionTemplate): Promise<QuestionTemplate | IError> => {
    const foundQuestionType = await getQuestionType(questionTemplateParams.questionTemplateId);

    if (!foundQuestionType) {
        return generateError(500, 'Invalid questionTemplateId');
    }

    const questionTemplate = await QuestionTemplate.create({
        text: questionTemplateParams.text
    });

    questionTemplate.setQuestionType(foundQuestionType);

    return questionTemplate;
}

export const editQuestionTemplate = async (id: string, newQuestionTemplateData: IEditQuestionTemplate): Promise<QuestionTemplate | undefined> => {
    const questionTemplate = await getQuestionTemplate(id);
    if (questionTemplate) {
        const keys = Object.keys(newQuestionTemplateData) as (keyof IEditQuestionTemplate)[];
        for (let x = 0; x < keys.length; x++) {
            const key = keys[x];
            const value = newQuestionTemplateData[key];
            await questionTemplate.update({ [key]: value });
        }
        
        return await getQuestionTemplate(id) || undefined;
    }
};

export const archiveQuestionTemplate = async (id: string): Promise<QuestionTemplate | IError | undefined> => {
    const questionTemplate = await getQuestionTemplate(id);
    if (questionTemplate) {
        await questionTemplate.update({ archived: true });
        return questionTemplate;
    }
}
