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
exports.archiveQuestionTemplate = exports.editQuestionTemplate = exports.createQuestionTemplate = exports.getQuestionTemplate = exports.getAllQuestionTemplates = void 0;
const __1 = __importDefault(require(".."));
const error_1 = require("../../api/error");
const questionType_1 = require("./questionType");
const getAllQuestionTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."QuestionTemplates" WHERE "deletedAt" IS NULL');
    return res.rows;
});
exports.getAllQuestionTemplates = getAllQuestionTemplates;
const getQuestionTemplate = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."QuestionTemplates" WHERE "questionId" = $1 AND "deletedAt" IS NULL ORDER BY "version" DESC LIMIT 1', [questionId]);
    return res.rows[0];
});
exports.getQuestionTemplate = getQuestionTemplate;
const createQuestionTemplate = (questionTemplateParams) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundQuestionType = yield questionType_1.getQuestionType(questionTemplateParams.questionTemplateId);
    if (!foundQuestionType) {
        return error_1.generateError(500, 'Invalid questionTypeId');
    }
    const newQuestionIdRes = yield __1.default.query('SELECT "questionId" FROM public."QuestionTemplates" ORDER BY "questionId" DESC LIMIT 1');
    const newQuestionId = ((_a = newQuestionIdRes.rows[0]) === null || _a === void 0 ? void 0 : _a.questionId) + 1 || 1;
    const res = yield __1.default.query(`INSERT INTO public."QuestionTemplates"
        ("text", "questionId", "questionTypeId", "version", "createdAt")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `, [questionTemplateParams.text, newQuestionId, foundQuestionType.id, 1, new Date()]);
    return res.rows[0];
});
exports.createQuestionTemplate = createQuestionTemplate;
// TODO - use editable fields here...
// const editableFields: (keyof IQuestionTemplate)[] = ['text'];
const editQuestionTemplate = (id, newQuestionTemplateData) => __awaiter(void 0, void 0, void 0, function* () {
    const questionTemplate = yield exports.getQuestionTemplate(id);
    if (questionTemplate) {
        const questionText = newQuestionTemplateData.text || questionTemplate.text;
        const res = yield __1.default.query(`INSERT INTO public."QuestionTemplates"
            ("text", "questionId", "questionTypeId", "version", "createdAt", "modifiedAt")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [questionText, questionTemplate.questionId, questionTemplate.questionTypeId, questionTemplate.version + 1, questionTemplate.createdAt, new Date()]);
        return res.rows[0];
    }
});
exports.editQuestionTemplate = editQuestionTemplate;
const archiveQuestionTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const questionTemplate = yield exports.getQuestionTemplate(id);
    if (questionTemplate) {
        const res = yield __1.default.query('UPDATE public."QuestionTemplates" SET "deletedAt" = $1 WHERE "questionId" = $2', [new Date(), id]);
        return res.rows[0];
    }
});
exports.archiveQuestionTemplate = archiveQuestionTemplate;
