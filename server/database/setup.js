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
exports.initData = void 0;
const formTemplate_1 = require("./models/formTemplate");
const questionType_1 = require("./models/questionType");
const initData = () => __awaiter(void 0, void 0, void 0, function* () {
    const questionType = yield questionType_1.getAllQuestionTypes();
    if (!questionType.length) {
        yield questionType_1.initQuestionTypesData();
        yield formTemplate_1.initFormTemplatesData();
    }
});
exports.initData = initData;
