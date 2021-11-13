import { Express } from 'express';
import { archiveQuestionTemplate, createQuestionTemplate, editQuestionTemplate, getAllQuestionTemplates, getQuestionTemplate } from '../../database/models/questionTemplate';
import { IEditQuestionTemplate, INewQuestionTemplate } from '../../types/questionTemplates';
import { getBodyData, getIdFromRequest } from '../utils';

export const questionTemplateRoutes = (app: Express) => {
    app.get('/questionTemplates', async (_req, res) => {
        const questionTemplates = await getAllQuestionTemplates();
        res.json({ questionTemplates });
    });

    app.get('/questionTemplate/:id', async (req, res) => {
        const questionTemplateId = getIdFromRequest(req);
        const questionTemplate = await getQuestionTemplate(questionTemplateId);
        res.json({ questionTemplate })
    });

    // ADD
    app.post('/questionTemplate', async (req, res) => {
        const newQuestionTemplateData = getBodyData<INewQuestionTemplate>(req);
        if (newQuestionTemplateData) {
            const newQuestionTemplate = await createQuestionTemplate(newQuestionTemplateData);
            return res.json({ newQuestionTemplate });
        }

        res.sendStatus(400);
    });

    // EDIT
    app.patch('/questionTemplate/:id', async (req, res) => {
        const questionTemplateId = getIdFromRequest(req);
        const editQuestionTemplateData = getBodyData<IEditQuestionTemplate>(req);

        if (editQuestionTemplateData) {
            const updatedQuestionTemplate = await editQuestionTemplate(questionTemplateId, editQuestionTemplateData);
            return res.json({ updatedQuestionTemplate });
        }

        res.sendStatus(400);
    });

    // DELETE
    app.delete('/questionTemplate/:id', async (req, res) => {
        const questionTemplateId = getIdFromRequest(req);
        const archivedQuestionTemplate = await archiveQuestionTemplate(questionTemplateId);

        res.json({ archivedQuestionTemplate });
    });
}