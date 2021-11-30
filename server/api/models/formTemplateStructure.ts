import { Express } from 'express';
import { addQuestionTemplateToFormTemplate } from '../../database/models/formTemplateStructure';
import { getBodyData, getIdFromRequest } from '../utils';

export interface IAddQuestionToFormTemplate {
    readonly questionTemplateId: number;
}

export const formTemplateStructureRoutes = (app: Express) => {
    // ADD
    app.post('/formTemplate/:id/addQuestion', async (req, res) => {
        const formTemplateId = getIdFromRequest(req);
        const addQuestionToFormTemplateData = getBodyData<IAddQuestionToFormTemplate>(req);
        if (addQuestionToFormTemplateData) {
            const newFormStructure = await addQuestionTemplateToFormTemplate(formTemplateId, addQuestionToFormTemplateData?.questionTemplateId.toString())
            return res.json(( newFormStructure ));
        }

        res.sendStatus(400);
    });
}