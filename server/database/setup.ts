import sql from '.';
import { getAllFormTemplates } from './models/formTemplate';
import { getAllQuestionTypes } from './models/questionType';
import { createDefaultFormTemplateSQL, createTableFormTemplatesSQL } from './sql/formTemplates';
import { createTableFormTemplateStructuresSQL } from './sql/formTemplateStructure';
import { dropAllTablesSQL } from './sql/misc';
import { createTableQuestionTemplatesSQL } from './sql/questionTemplates';
import { createDefaultQuestionTypesSQL, createTableQuestionTypesSQL } from './sql/questionTypes';

export const initData = async (force: boolean = false): Promise<void> => {
    if (force) {
        await sql.query(dropAllTablesSQL);
    }

    await sql.query(createTableQuestionTypesSQL);
    await sql.query(createTableFormTemplatesSQL);
    await sql.query(createTableQuestionTemplatesSQL);
    await sql.query(createTableFormTemplateStructuresSQL);

    const questionTypes = await getAllQuestionTypes();
    const formTemplates = await getAllFormTemplates();

    if (!questionTypes.length) {
        console.log('Initialising Default Question Types...');
        await sql.query(createDefaultQuestionTypesSQL);
    }

    if (!formTemplates.length) {
        console.log('Initialising Default Form Templates...');
        await sql.query(createDefaultFormTemplateSQL);
    }
}
