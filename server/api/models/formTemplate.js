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
exports.formTemplateRoutes = void 0;
const formTemplate_1 = require("../../database/models/formTemplate");
const error_1 = require("../error");
const utils_1 = require("../utils");
const formTemplateRoutes = (app) => {
    app.get('/formTemplates', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplates = yield formTemplate_1.getAllFormTemplates();
        res.json({ formTemplates });
    }));
    app.get('/formTemplate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplateId = utils_1.getIdFromRequest(req);
        const formTemplate = yield formTemplate_1.getFormTemplate(formTemplateId);
        res.json({ formTemplate });
    }));
    // ADD
    app.post('/formTemplate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newFormTemplateData = utils_1.getBodyData(req);
        if (newFormTemplateData) {
            const newFormTemplate = yield formTemplate_1.createFormTemplate(newFormTemplateData);
            return res.json({ newFormTemplate });
        }
        res.sendStatus(400);
    }));
    // EDIT
    app.patch('/formTemplate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplateId = utils_1.getIdFromRequest(req);
        const editFormTemplateData = utils_1.getBodyData(req);
        if (editFormTemplateData) {
            const updatedFormTemplate = yield formTemplate_1.editFormTemplate(formTemplateId, editFormTemplateData);
            return res.json({ updatedFormTemplate });
        }
        res.sendStatus(400);
    }));
    // DELETE
    app.delete('/formTemplate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplateId = utils_1.getIdFromRequest(req);
        const archivedFormTemplate = yield formTemplate_1.archiveFormTemplate(formTemplateId);
        if (error_1.isError(archivedFormTemplate)) {
            res.json({ error: archivedFormTemplate });
        }
        res.json({ archivedFormTemplate });
    }));
};
exports.formTemplateRoutes = formTemplateRoutes;
