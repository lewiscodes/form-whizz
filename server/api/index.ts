import express from 'express';
import { formTemplateRoutes } from './models/formTemplate';
import { formTemplateStructureRoutes } from './models/formTemplateStructure';
import { questionTemplateRoutes } from './models/questionTemplate';
import { questionTypeRoutes } from './models/questionType';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.json({ message: 'Hello World' });
})

formTemplateRoutes(app);
questionTypeRoutes(app);
questionTemplateRoutes(app);
formTemplateStructureRoutes(app);

export default app;
