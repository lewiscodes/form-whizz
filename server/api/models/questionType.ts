import { Express } from 'express';
import { getAllQuestionTypes } from '../../database/models/questionType';

export const questionTypeRoutes = (app: Express) => {
    app.get('/questionTypes', async (_req, res) => {
        const questionTypes = await getAllQuestionTypes();
        res.json({ questionTypes });
    });
}