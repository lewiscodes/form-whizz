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
exports.archiveFormTemplate = exports.editFormTemplate = exports.createFormTemplate = exports.getFormTemplate = exports.getAllFormTemplates = void 0;
const __1 = __importDefault(require(".."));
const error_1 = require("../../api/error");
const utils_1 = require("../utils");
const getAllFormTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."FormTemplates" WHERE "deletedAt" IS NULL');
    return res.rows;
});
exports.getAllFormTemplates = getAllFormTemplates;
const getFormTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."FormTemplates" WHERE id = $1 AND "deletedAt" IS NULL', [id]);
    return res.rows[0];
});
exports.getFormTemplate = getFormTemplate;
const createFormTemplate = (formTemplate) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query(`INSERT INTO public."FormTemplates"
        ("name", "isPrimary", "createdAt")
        VALUES($1, $2, $3)
        RETURNING *
    `, [formTemplate.name, false, new Date()]);
    return res.rows[0];
});
exports.createFormTemplate = createFormTemplate;
const editableFields = ['name'];
const editFormTemplate = (id, newFormTemplateData) => __awaiter(void 0, void 0, void 0, function* () {
    const formTemplate = yield exports.getFormTemplate(id);
    if (formTemplate) {
        const { script, values } = utils_1.generateUpdateScriptAndValues(editableFields, newFormTemplateData);
        const res = yield __1.default.query(`UPDATE public."FormTemplates"
            SET ${script}
            WHERE id = $${values.length + 1}
            RETURNING *
        `, [...values, id]);
        return res.rows[0];
    }
});
exports.editFormTemplate = editFormTemplate;
const archiveFormTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const formTemplate = yield exports.getFormTemplate(id);
    if (formTemplate) {
        if (formTemplate.isPrimary) {
            return error_1.generateError(500, `Can't archive primary form template`);
        }
        const res = yield __1.default.query('UPDATE public."FormTemplates" SET "deletedAt" = $1 WHERE id = $2 RETURNING *', [new Date(), id]);
        return res.rows[0];
    }
});
exports.archiveFormTemplate = archiveFormTemplate;
