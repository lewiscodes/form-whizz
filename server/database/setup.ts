import { getAllFormTemplates, initFormTemplatesData } from "./models/formTemplate";
import { getAllQuestionTypes, initQuestionTypesData } from "./models/questionType"

export const initData = async (): Promise<void> => {
    const questionTypes = await getAllQuestionTypes();
    const formTemplates = await getAllFormTemplates();

    if (!questionTypes.length) {
        await initQuestionTypesData();
    }

    if (!formTemplates.length) {
        await initFormTemplatesData();
    }
}