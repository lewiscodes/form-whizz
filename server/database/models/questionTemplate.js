"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTemplate = void 0;
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const questionType_1 = require("./questionType");
class QuestionTemplate extends sequelize_1.Model {
}
exports.QuestionTemplate = QuestionTemplate;
;
QuestionTemplate.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    questionType: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: questionType_1.QuestionType,
            key: 'id'
        }
    }
}, {
    sequelize: __1.default
});
