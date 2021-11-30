"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionTemplateRoutes = void 0;
const questionTemplate_1 = require("../../database/models/questionTemplate");
const utils_1 = require("../utils");
const questionTemplateRoutes = (app) => {
    app.get('/questionTemplates', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const questionTemplates = yield questionTemplate_1.getAllQuestionTemplates();
        res.json({ questionTemplates });
    }));
    app.get('/questionTemplate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const questionTemplateId = utils_1.getIdFromRequest(req);
        const questionTemplate = yield questionTemplate_1.getQuestionTemplate(questionTemplateId);
        res.json({ questionTemplate });
    }));
    // ADD
    app.post('/questionTemplate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newQuestionTemplateData = utils_1.getBodyData(req);
        if (newQuestionTemplateData) {
            const newQuestionTemplate = yield questionTemplate_1.createQuestionTemplate(newQuestionTemplateData);
            return res.json({ newQuestionTemplate });
        }
        res.sendStatus(400);
    }));
    // EDIT
    app.patch('/questionTemplate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const questionTemplateId = utils_1.getIdFromRequest(req);
        const editQuestionTemplateData = utils_1.getBodyData(req);
        if (editQuestionTemplateData) {
            const updatedQuestionTemplate = yield questionTemplate_1.editQuestionTemplate(questionTemplateId, editQuestionTemplateData);
            return res.json({ updatedQuestionTemplate });
        }
        res.sendStatus(400);
    }));
    // DELETE
    app.delete('/questionTemplate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const questionTemplateId = utils_1.getIdFromRequest(req);
        const archivedQuestionTemplate = yield questionTemplate_1.archiveQuestionTemplate(questionTemplateId);
        res.json({ archivedQuestionTemplate });
    }));
    //     // TODO
    //     // app.put('/questionTemplate/:id/changeQuestionType')
};
exports.questionTemplateRoutes = questionTemplateRoutes;
