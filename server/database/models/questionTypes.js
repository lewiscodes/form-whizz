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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuestionTypes = exports.EQuestionType = void 0;
const __1 = __importDefault(require(".."));
var EQuestionType;
(function (EQuestionType) {
    EQuestionType["TEXT"] = "Text";
    EQuestionType["NUMBER"] = "Number";
    EQuestionType["BOOLEAN"] = "Boolean";
    EQuestionType["RADIO"] = "Radio";
    EQuestionType["SELECT"] = "Select";
})(EQuestionType = exports.EQuestionType || (exports.EQuestionType = {}));
const getAllQuestionTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield __1.default.query('SELECT * FROM public."QuestionTypes"');
    return res.rows;
});
exports.getAllQuestionTypes = getAllQuestionTypes;
// export const getQuestionType = async (id: string): Promise<QuestionType | null> => {
//     return await QuestionType.findByPk(id);
// }
