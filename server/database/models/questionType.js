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
exports.initQuestionTypesData = exports.getQuestionType = exports.getAllQuestionTypes = exports.QuestionType = void 0;
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
class QuestionType extends sequelize_1.Model {
}
exports.QuestionType = QuestionType;
;
QuestionType.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: __1.default
});
const getAllQuestionTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield QuestionType.findAll();
});
exports.getAllQuestionTypes = getAllQuestionTypes;
const getQuestionType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield QuestionType.findByPk(id);
});
exports.getQuestionType = getQuestionType;
const initQuestionTypesData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield QuestionType.create({ type: 'String' });
    yield QuestionType.create({ type: 'Number' });
    yield QuestionType.create({ type: 'Boolean' });
    yield QuestionType.create({ type: 'Radio' });
    yield QuestionType.create({ type: 'Select' });
});
exports.initQuestionTypesData = initQuestionTypesData;
