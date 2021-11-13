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
exports.archiveFormTemplate = exports.editFormTemplate = exports.createFormTemplate = exports.getFormTemplate = exports.getAllFormTemplates = exports.initFormTemplatesData = exports.FormTemplate = void 0;
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const error_1 = require("../../api/error");
class FormTemplate extends sequelize_1.Model {
}
exports.FormTemplate = FormTemplate;
;
FormTemplate.init({
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
    isPrimary: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    archived: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: __1.default
});
const initFormTemplatesData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield FormTemplate.create({ name: 'Primary', isPrimary: true });
});
exports.initFormTemplatesData = initFormTemplatesData;
const getAllFormTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield FormTemplate.findAll();
});
exports.getAllFormTemplates = getAllFormTemplates;
const getFormTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield FormTemplate.findByPk(id);
});
exports.getFormTemplate = getFormTemplate;
const createFormTemplate = (formTemplate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield FormTemplate.create({
        name: formTemplate.name,
        isPrimary: false
    });
});
exports.createFormTemplate = createFormTemplate;
const editFormTemplate = (id, newFormTemplateData) => __awaiter(void 0, void 0, void 0, function* () {
    const formTemplate = yield exports.getFormTemplate(id);
    if (formTemplate) {
        const keys = Object.keys(newFormTemplateData);
        for (let x = 0; x < keys.length; x++) {
            const key = keys[x];
            const value = newFormTemplateData[key];
            yield formTemplate.update({ [key]: value });
        }
        return formTemplate;
    }
});
exports.editFormTemplate = editFormTemplate;
const archiveFormTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const formTemplate = yield exports.getFormTemplate(id);
    if (formTemplate) {
        if (formTemplate.isPrimary) {
            return error_1.generateError(500, `Can't archive primary form template`);
        }
        yield formTemplate.update({ archived: true });
        return formTemplate;
    }
});
exports.archiveFormTemplate = archiveFormTemplate;
