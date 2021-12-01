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
exports.moveFormTemplateQuestion = exports.addQuestionTemplateToFormTemplate = exports.getFormTemplateStructure = void 0;
const __1 = __importDefault(require(".."));
const error_1 = require("../../api/error");
const formTemplate_1 = require("./formTemplate");
const questionTemplate_1 = require("./questionTemplate");
const getFormTemplateStructure = (formTemplateId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."FormTemplateStructures" WHERE "formTemplateId" = $1 ORDER BY "order" ASC', [formTemplateId]);
    return res.rows;
});
exports.getFormTemplateStructure = getFormTemplateStructure;
const addQuestionTemplateToFormTemplate = (formTemplateId, questionTemplateId) => __awaiter(void 0, void 0, void 0, function* () {
    const formTemplate = yield formTemplate_1.getFormTemplate(formTemplateId);
    if (!formTemplate) {
        return error_1.generateError(500, `Can't find form template`);
    }
    const questionTemplate = yield questionTemplate_1.getQuestionTemplate(questionTemplateId);
    if (!questionTemplate) {
        return error_1.generateError(500, `Can't find question template`);
    }
    const existingFormStructure = yield exports.getFormTemplateStructure(formTemplateId);
    const order = existingFormStructure.length + 1;
    const res = yield __1.default.query(`INSERT INTO public."FormTemplateStructures"
        ("order", "formTemplateId", "questionTemplateId", "createdAt")
        VALUES($1, $2, $3, $4)
        RETURNING *
    `, [order, formTemplate.id, questionTemplate.questionId, new Date()]);
    return res.rows[0];
});
exports.addQuestionTemplateToFormTemplate = addQuestionTemplateToFormTemplate;
const moveFormTemplateQuestion = (formTemplateId, formTemplateStructureId, newPosition) => __awaiter(void 0, void 0, void 0, function* () {
    const formTemplate = yield formTemplate_1.getFormTemplate(formTemplateId);
    if (!formTemplate) {
        return error_1.generateError(500, `Can't find form template`);
    }
    const formQuestions = yield exports.getFormTemplateStructure(formTemplate.id.toString());
    const foundFormQuestion = formQuestions.find(section => section.id === formTemplateStructureId);
    if (!foundFormQuestion) {
        return error_1.generateError(500, `Can't find form structure id in form template`);
    }
    const sqlScript = `UPDATE public."FormTemplateStructures" SET "order" = $1 WHERE "id" = $2`;
    if (foundFormQuestion.order === newPosition) {
        return formQuestions;
    }
    else if (newPosition < foundFormQuestion.order) {
        for (let x = 0; x < formQuestions.length; x++) {
            const question = formQuestions[x];
            if (question.id === formTemplateStructureId) {
                yield __1.default.query(sqlScript, [newPosition, question.id]);
            }
            else if (question.order < foundFormQuestion.order) {
                yield __1.default.query(sqlScript, [question.order + 1, question.id]);
            }
        }
        return yield exports.getFormTemplateStructure(formTemplateId);
    }
    else {
        for (let x = 0; x < formQuestions.length; x++) {
            const question = formQuestions[x];
            if (question.id === formTemplateStructureId) {
                yield __1.default.query(sqlScript, [newPosition, question.id]);
            }
            else if (question.order < newPosition || question.order === newPosition) {
                yield __1.default.query(sqlScript, [question.order - 1, question.id]);
            }
        }
        return yield exports.getFormTemplateStructure(formTemplateId);
    }
});
exports.moveFormTemplateQuestion = moveFormTemplateQuestion;
