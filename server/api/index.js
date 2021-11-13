"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formTemplate_1 = require("./models/formTemplate");
const questionTemplate_1 = require("./models/questionTemplate");
const questionType_1 = require("./models/questionType");
const app = express_1.default();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({ message: 'Hello World' });
});
formTemplate_1.formTemplateRoutes(app);
questionType_1.questionTypeRoutes(app);
questionTemplate_1.questionTemplateRoutes(app);
exports.default = app;
