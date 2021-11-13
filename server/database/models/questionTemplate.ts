import { DataTypes, Model } from "sequelize";
import sql from "..";
import { QuestionType } from "./questionType";

export class QuestionTemplate extends Model {};

QuestionTemplate.init({
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
    questionType: {
        type: DataTypes.UUID,
        references: {
            model: QuestionType,
            key: 'id'
        }
    }
}, {
    sequelize: sql
});