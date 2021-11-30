"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const getAllQuestionTemplates = async (): Promise<QuestionTemplate[]> => {
//     return await QuestionTemplate.findAll({ include: 'QuestionType', attributes: selectAttributes });
// };
// export const getQuestionTemplate = async (questionId: string): Promise<QuestionTemplate | null> => {
//     const questionTemplates = await QuestionTemplate.findAll({
//         where: { questionId },
//         include: 'QuestionType',
//         attributes: selectAttributes
//     });
//     return questionTemplates.reduce((prev, current) => (prev.version > current.version ? prev : current));
// }
// export const createQuestionTemplate = async (questionTemplateParams: INewQuestionTemplate): Promise<QuestionTemplate | IError | undefined> => {
//     const foundQuestionType = await getQuestionType(questionTemplateParams.questionTemplateId);
//     if (!foundQuestionType) {
//         return generateError(500, 'Invalid questionTypeId');
//     }
//     const questionTemplate = await QuestionTemplate.create({
//         text: questionTemplateParams.text,
//         questionId: uuid(),
//         version: 1
//     });
//     await questionTemplate.setQuestionType(foundQuestionType);
//     return await getQuestionTemplate(questionTemplate.questionId) || undefined;
// }
// const editableFields: (keyof QuestionTemplateAttributes)[] = ['text'];
// export const editQuestionTemplate = async (id: string, newQuestionTemplateData: IEditQuestionTemplate): Promise<QuestionTemplate | undefined> => {
//     const questionTemplate = await getQuestionTemplate(id);
//     if (questionTemplate) {
//         const foundQuestionTemplate: IQuestionTemplateAttributes = questionTemplate?.toJSON() as IQuestionTemplateAttributes;
//         if (foundQuestionTemplate) {
//             const keys = Object.keys(newQuestionTemplateData) as (keyof IEditQuestionTemplate)[];
//             for (let x = 0; x < keys.length; x++) {
//                 const key = keys[x];
//                 if (editableFields.includes(key)) {
//                     const value = newQuestionTemplateData[key];
//                     if (value) {
//                         foundQuestionTemplate[key] = value;
//                     }
//                 }
//             }
//             delete foundQuestionTemplate.id;
//             foundQuestionTemplate.version++
//             await QuestionTemplate.create(foundQuestionTemplate);
//             return await getQuestionTemplate(foundQuestionTemplate.questionId) || undefined;
//         }
//     }
// };
// export const archiveQuestionTemplate = async (id: string): Promise<QuestionTemplate | IError | undefined> => {
//     const questionTemplate = await getQuestionTemplate(id);
//     if (questionTemplate) {
//         await questionTemplate.destroy();
//         return questionTemplate;
//     }
// }
