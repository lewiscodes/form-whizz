import express from 'express';
import { formTemplateRoutes } from './models/formTemplate';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.json({ message: 'Hello World' });
})

formTemplateRoutes(app);

export default app;
