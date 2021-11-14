import { Association, DataTypes, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, Optional } from "sequelize";
import { uuid } from 'uuidv4';
import sql from "..";
import { generateError, IError } from "../../api/error";
import { IEditQuestionTemplate, INewQuestionTemplate } from "../../types/questionTemplates";
import { getQuestionType, QuestionType } from "./questionType";

interface QuestionTemplateAttributes {
    id: string;
    readonly questionId: string;
    version: number;
    text: string;
}

interface IQuestionTemplateAttributes extends Optional<QuestionTemplateAttributes, 'id'> {}

export class QuestionTemplate extends Model<IQuestionTemplateAttributes> {
    private id!: string;
    public questionId!: string;
    public version!: number;
    private text!: string;

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
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sql,
    paranoid: true
});

// TODO: try and get the foreignKey to be questionTemplateId rather than QuestionTemplateId
QuestionTemplate.belongsTo(QuestionType);
QuestionType.hasOne(QuestionTemplate);


export const getAllQuestionTemplates = async (): Promise<QuestionTemplate[]> => {
    return await QuestionTemplate.findAll({ include: 'QuestionType' });
};

export const getQuestionTemplate = async (questionId: string): Promise<QuestionTemplate | null> => {
    const questionTemplates = await QuestionTemplate.findAll({
        where: { questionId },
        include: 'QuestionType'
    });

    return questionTemplates.reduce((prev, current) => (prev.version > current.version ? prev : current));
}

export const createQuestionTemplate = async (questionTemplateParams: INewQuestionTemplate): Promise<QuestionTemplate | IError | undefined> => {
    const foundQuestionType = await getQuestionType(questionTemplateParams.questionTemplateId);

    if (!foundQuestionType) {
        return generateError(500, 'Invalid questionTemplateId');
    }

    const questionTemplate = await QuestionTemplate.create({
        text: questionTemplateParams.text,
        questionId: uuid(),
        version: 1
    });

    await questionTemplate.setQuestionType(foundQuestionType);
    return await getQuestionTemplate(questionTemplate.questionId) || undefined;
}

const editableFields: (keyof QuestionTemplateAttributes)[] = ['text'];
export const editQuestionTemplate = async (id: string, newQuestionTemplateData: IEditQuestionTemplate): Promise<QuestionTemplate | undefined> => {
    const questionTemplate = await getQuestionTemplate(id);
    if (questionTemplate) {
        const foundQuestionTemplate: IQuestionTemplateAttributes = questionTemplate?.toJSON() as IQuestionTemplateAttributes;
        if (foundQuestionTemplate) {
            const keys = Object.keys(newQuestionTemplateData) as (keyof IEditQuestionTemplate)[];
            for (let x = 0; x < keys.length; x++) {
                const key = keys[x];
                if (editableFields.includes(key)) {
                    const value = newQuestionTemplateData[key];
                    if (value) {
                        foundQuestionTemplate[key] = value;
                    }
                }
            }

            delete foundQuestionTemplate.id;
            foundQuestionTemplate.version++

            await QuestionTemplate.create(foundQuestionTemplate);
            return await getQuestionTemplate(foundQuestionTemplate.questionId) || undefined;
        }
    }
};

export const archiveQuestionTemplate = async (id: string): Promise<QuestionTemplate | IError | undefined> => {
    const questionTemplate = await getQuestionTemplate(id);
    if (questionTemplate) {
        await questionTemplate.destroy();
        return questionTemplate;
    }
}
