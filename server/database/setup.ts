import { initFormTemplatesData } from "./models/formTemplate";
import { getAllQuestionTypes, initQuestionTypesData } from "./models/questionType"

export const initData = async (): Promise<void> => {
    const questionType = await getAllQuestionTypes()
    if (!questionType.length) {
        await initQuestionTypesData();
        await initFormTemplatesData();
    }
}