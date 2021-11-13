import { DataTypes, Model, Optional } from "sequelize";
import sql from "..";

interface QuestionTypeAttributes {
    readonly id: string;
    readonly type: string;
}

interface IQuestionTypeAttributes extends Optional<QuestionTypeAttributes, 'id'> {}

export class QuestionType extends Model<IQuestionTypeAttributes> {
    private id!: string;
    private type!: string;
};

QuestionType.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sql
})

export const getAllQuestionTypes = async (): Promise<QuestionType[]> => {
    return await QuestionType.findAll();
};

export const getQuestionType = async (id: string): Promise<QuestionType | null> => {
    return await QuestionType.findByPk(id);
}

export const initQuestionTypesData = async (): Promise<void> => {
    await QuestionType.create({ type: 'String' });
    await QuestionType.create({ type: 'Number' });
    await QuestionType.create({ type: 'Boolean' });
    await QuestionType.create({ type: 'Radio' });
    await QuestionType.create({ type: 'Select' });
}