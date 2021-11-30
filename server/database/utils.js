"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUpdateScriptAndValues = void 0;
const generateUpdateScriptAndValues = (editableValues, newValues) => {
    let script = '';
    const values = [];
    let valueNumber = 1;
    editableValues.forEach(editableValue => {
        const value = newValues[editableValue];
        if (value) {
            script = `${script} ${editableValue} = $${valueNumber}`;
            values.push(value);
            valueNumber++;
        }
    });
    if (values.length) {
        const now = new Date();
        values.push(now);
        script = `${script} modifiedAt = $${values.length}`;
    }
    return { script: script.trim(), values };
};
exports.generateUpdateScriptAndValues = generateUpdateScriptAndValues;
