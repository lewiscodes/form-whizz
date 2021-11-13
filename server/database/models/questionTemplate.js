"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveQuestionTemplate = exports.editQuestionTemplate = exports.createQuestionTemplate = exports.getQuestionTemplate = exports.getAllQuestionTemplates = exports.QuestionTemplate = void 0;
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const error_1 = require("../../api/error");
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
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    archived: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: __1.default
});
QuestionTemplate.belongsTo(questionType_1.QuestionType);
questionType_1.QuestionType.hasOne(QuestionTemplate);
const getAllQuestionTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield QuestionTemplate.findAll({ include: 'QuestionType' });
});
exports.getAllQuestionTemplates = getAllQuestionTemplates;
const getQuestionTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield QuestionTemplate.findByPk(id, { include: 'QuestionType' });
});
exports.getQuestionTemplate = getQuestionTemplate;
const createQuestionTemplate = (questionTemplateParams) => __awaiter(void 0, void 0, void 0, function* () {
    const foundQuestionType = yield questionType_1.getQuestionType(questionTemplateParams.questionTemplateId);
    if (!foundQuestionType) {
        return error_1.generateError(500, 'Invalid questionTemplateId');
    }
    const questionTemplate = yield QuestionTemplate.create({
        text: questionTemplateParams.text
    });
    questionTemplate.setQuestionType(foundQuestionType);
    return questionTemplate;
});
exports.createQuestionTemplate = createQuestionTemplate;
const editQuestionTemplate = (id, newQuestionTemplateData) => __awaiter(void 0, void 0, void 0, function* () {
    const questionTemplate = yield exports.getQuestionTemplate(id);
    if (questionTemplate) {
        const keys = Object.keys(newQuestionTemplateData);
        for (let x = 0; x < keys.length; x++) {
            const key = keys[x];
            const value = newQuestionTemplateData[key];
            yield questionTemplate.update({ [key]: value });
        }
        return (yield exports.getQuestionTemplate(id)) || undefined;
    }
});
exports.editQuestionTemplate = editQuestionTemplate;
const archiveQuestionTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const questionTemplate = yield exports.getQuestionTemplate(id);
    if (questionTemplate) {
        yield questionTemplate.update({ archived: true });
        return questionTemplate;
    }
});
exports.archiveQuestionTemplate = archiveQuestionTemplate;
