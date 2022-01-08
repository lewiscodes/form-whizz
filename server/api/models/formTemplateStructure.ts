import { Express } from 'express';
import { addQuestionTemplateToFormTemplate, moveFormTemplateQuestion, removeQuestionFromFormTemplate } from '../../database/models/formTemplateStructure';
import { getBodyData, getIdFromRequest } from '../utils';

export interface IAddQuestionToFormTemplate {
    readonly questionTemplateId: number;
}

export interface IMoveQuestionInFormTemplate {
    readonly formTemplateSectionId: number;
    readonly newPosition: number;
}

export interface IRemoveQuestionFromFormTemplate {
    readonly formTemplateSectionId: number;
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

    // MOVE
    app.post('/formTemplate/:id/moveQuestion', async (req, res) => {
        const formTemplateId = getIdFromRequest(req);
        const moveQuestionInFormTemplateData = getBodyData<IMoveQuestionInFormTemplate>(req);

        if (moveQuestionInFormTemplateData) {
            const updatedFormStructure = await moveFormTemplateQuestion(formTemplateId, moveQuestionInFormTemplateData.formTemplateSectionId, moveQuestionInFormTemplateData.newPosition)
            return res.json(( updatedFormStructure ));
        }

        res.sendStatus(400);
    });

    // REMOVE
    app.delete('/formTemplate/:id/removeQuestion', async (req, res) => {
        const formTemplateId = getIdFromRequest(req);
        const removeQuestionFromFormTemplateData = getBodyData<IRemoveQuestionFromFormTemplate>(req);

        if (removeQuestionFromFormTemplateData) {
            const updatedFormStructure = await removeQuestionFromFormTemplate(formTemplateId, removeQuestionFromFormTemplateData.formTemplateSectionId);
            return res.json(( updatedFormStructure ));
        }

        res.sendStatus(400);
    });
}
