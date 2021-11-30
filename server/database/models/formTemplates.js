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
exports.getAllFormTemplates = void 0;
const __1 = __importDefault(require(".."));
const getAllFormTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."FormTemplates"');
    return res.rows;
});
exports.getAllFormTemplates = getAllFormTemplates;
// export const getFormTemplate = async (id: string): Promise<FormTemplate | null> => {
//     return await FormTemplate.findByPk(id);
// }
// export const createFormTemplate = async (formTemplate: INewFormTemplate): Promise<FormTemplate> => {
//     return await FormTemplate.create({
//         name: formTemplate.name,
//         isPrimary: false
//     });
// }
// const editableFields: (keyof FormTemplateAttributes)[] = ['name'];
// export const editFormTemplate = async (id: string, newFormTemplateData: IEditFormTemplate): Promise<FormTemplate | undefined> => {
//     const formTemplate = await getFormTemplate(id);
//     if (formTemplate) {
//         const keys = Object.keys(newFormTemplateData) as (keyof IEditFormTemplate)[];
//         for (let x = 0; x < keys.length; x++) {
//             const key = keys[x];
//             if (editableFields.includes(key)) {
//                 const value = newFormTemplateData[key];
//                 await formTemplate.update({ [key]: value });
//             }
//         }
//         return formTemplate;
//     }
// };
// export const archiveFormTemplate = async (id: string): Promise<FormTemplate | IError | undefined> => {
//     const formTemplate = await getFormTemplate(id);
//     if (formTemplate) {
//         if (formTemplate.isPrimary) {
//             return generateError(500, `Can't archive primary form template`);
//         }
//         await formTemplate.destroy();
//         return formTemplate;
//     }
// }
