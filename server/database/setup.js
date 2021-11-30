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
exports.initData = void 0;
const _1 = __importDefault(require("."));
const formTemplate_1 = require("./models/formTemplate");
const questionType_1 = require("./models/questionType");
const formTemplates_1 = require("./sql/formTemplates");
const formTemplateStructure_1 = require("./sql/formTemplateStructure");
const misc_1 = require("./sql/misc");
const questionTemplates_1 = require("./sql/questionTemplates");
const questionTypes_1 = require("./sql/questionTypes");
const initData = (force = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (force) {
        yield _1.default.query(misc_1.dropAllTablesSQL);
    }
    yield _1.default.query(questionTypes_1.createTableQuestionTypesSQL);
    yield _1.default.query(formTemplates_1.createTableFormTemplatesSQL);
    yield _1.default.query(questionTemplates_1.createTableQuestionTemplatesSQL);
    yield _1.default.query(formTemplateStructure_1.createTableFormTemplateStructuresSQL);
    const questionTypes = yield questionType_1.getAllQuestionTypes();
    const formTemplates = yield formTemplate_1.getAllFormTemplates();
    if (!questionTypes.length) {
        console.log('Initialising Default Question Types...');
        yield _1.default.query(questionTypes_1.createDefaultQuestionTypesSQL);
    }
    if (!formTemplates.length) {
        console.log('Initialising Default Form Templates...');
        yield _1.default.query(formTemplates_1.createDefaultFormTemplateSQL);
    }
});
exports.initData = initData;
