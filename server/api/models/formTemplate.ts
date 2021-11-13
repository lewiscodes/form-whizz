import { Express } from 'express';
import { archiveFormTemplate, createFormTemplate, editFormTemplate, getAllFormTemplates, getFormTemplate } from '../../database/models/formTemplate';
import { IEditFormTemplate, INewFormTemplate } from '../../types/formTemplate';
import { isError } from '../error';
import { getBodyData, getIdFromRequest } from '../utils';

export const formTemplateRoutes = (app: Express) => {
    app.get('/formTemplates', async (_req, res) => {
        const formTemplates = await getAllFormTemplates();
        res.json({ formTemplates });
    });

    app.get('/formTemplate/:id', async (req, res) => {
        const formTemplateId = getIdFromRequest(req);
        const formTemplate = await getFormTemplate(formTemplateId);
        res.json({ formTemplate })
    });

    // ADD
    app.post('/formTemplate', async (req, res) => {
        const newFormTemplateData = getBodyData<INewFormTemplate>(req);
        if (newFormTemplateData) {
            const newFormTemplate = await createFormTemplate(newFormTemplateData);
            return res.json({ newFormTemplate });
        }

        res.sendStatus(400);
    });

    // EDIT
    app.patch('/formTemplate/:id', async (req, res) => {
        const formTemplateId = getIdFromRequest(req);
        const editFormTemplateData = getBodyData<IEditFormTemplate>(req);

        if (editFormTemplateData) {
            const updatedFormTemplate = await editFormTemplate(formTemplateId, editFormTemplateData);
            return res.json({ updatedFormTemplate });
        }

        res.sendStatus(400);
    });

    // DELETE
    app.delete('/formTemplate/:id', async (req, res) => {
        const formTemplateId = getIdFromRequest(req);
        const archivedFormTemplate = await archiveFormTemplate(formTemplateId);

        if (isError(archivedFormTemplate)) {
            res.json({ error: archivedFormTemplate })
        }

        res.json({ archivedFormTemplate });
    });
}