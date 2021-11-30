export const generateUpdateScriptAndValues = (editableValues: string[], newValues: Record<string, unknown>): { script: string; values: unknown[] } => {
    let script = '';
    const values: unknown[] = [];
    let valueNumber = 1;

    editableValues.forEach(editableValue => {
        const value: unknown = newValues[editableValue];
        if (value) {
            script = `${script} ${editableValue} = $${valueNumber}`
            values.push(value);
            valueNumber++;
        }
    });

    if (values.length) {
        const now = new Date()
        values.push(now);
        script = `${script} modifiedAt = $${values.length}`
    }

    return { script: script.trim(), values }
}