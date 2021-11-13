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
exports.questionTypeRoutes = void 0;
const questionType_1 = require("../../database/models/questionType");
const questionTypeRoutes = (app) => {
    app.get('/questionTypes', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const questionTypes = yield questionType_1.getAllQuestionTypes();
        res.json({ questionTypes });
    }));
};
exports.questionTypeRoutes = questionTypeRoutes;
