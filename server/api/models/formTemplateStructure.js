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
exports.formTemplateStructureRoutes = void 0;
const formTemplateStructure_1 = require("../../database/models/formTemplateStructure");
const utils_1 = require("../utils");
const formTemplateStructureRoutes = (app) => {
    // ADD
    app.post('/formTemplate/:id/addQuestion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplateId = utils_1.getIdFromRequest(req);
        const addQuestionToFormTemplateData = utils_1.getBodyData(req);
        if (addQuestionToFormTemplateData) {
            const newFormStructure = yield formTemplateStructure_1.addQuestionTemplateToFormTemplate(formTemplateId, addQuestionToFormTemplateData === null || addQuestionToFormTemplateData === void 0 ? void 0 : addQuestionToFormTemplateData.questionTemplateId.toString());
            return res.json((newFormStructure));
        }
        res.sendStatus(400);
    }));
    // MOVE
    app.post('/formTemplate/:id/moveQuestion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplateId = utils_1.getIdFromRequest(req);
        const moveQuestionInFormTemplateData = utils_1.getBodyData(req);
        if (moveQuestionInFormTemplateData) {
            const updatedFormStructure = yield formTemplateStructure_1.moveFormTemplateQuestion(formTemplateId, moveQuestionInFormTemplateData.formTemplateSectionId, moveQuestionInFormTemplateData.newPosition);
            return res.json((updatedFormStructure));
        }
        res.sendStatus(400);
    }));
    // REMOVE
    app.delete('/formTemplate/:id/removeQuestion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const formTemplateId = utils_1.getIdFromRequest(req);
        const removeQuestionFromFormTemplateData = utils_1.getBodyData(req);
        if (removeQuestionFromFormTemplateData) {
            const updatedFormStructure = yield formTemplateStructure_1.removeQuestionFromFormTemplate(formTemplateId, removeQuestionFromFormTemplateData.formTemplateSectionId);
            return res.json((updatedFormStructure));
        }
        res.sendStatus(400);
    }));
};
exports.formTemplateStructureRoutes = formTemplateStructureRoutes;
