import { useState } from 'react';
import { Card, EditableText, H2, Icon } from '@blueprintjs/core';
import { IDragItem } from "..";
import { formItemStyles } from './styles';
import { getQuestionType } from '../../../../components/questionTypes/data';

interface IFormItemProps extends IFormItem {
    readonly removeFormItem: (formItemId: string) => void;
}

export interface IFormItem extends IDragItem {
    readonly isTemp: boolean;
}

const FormItem = ({ id, isTemp, questionType, removeFormItem }: IFormItemProps): JSX.Element => {
    const [deleteIconHover, setDeleteIconHover] = useState(false);
    const [questionText, setQuestionText] = useState<string>();
    const styles = formItemStyles(deleteIconHover);
    const fullQuestionType = getQuestionType(questionType);
    return (
        <div style={styles.formItemContainer}>
            <Icon
                style={styles.deleteIcon}
                icon='trash'
                iconSize={Icon.SIZE_LARGE}
                onMouseEnter={() => setDeleteIconHover(true)}
                onMouseLeave={() => setDeleteIconHover(false)}
                onClick={() => removeFormItem(id)}
            />
            <Card style={styles.card}>
                <Icon
                    style={styles.questionIcon}
                    icon={fullQuestionType?.icon}
                    iconSize={Icon.SIZE_LARGE}
                />
                <H2 style={styles.questionText}>
                    <EditableText value={questionText} placeholder='Question Text...' onChange={setQuestionText} />
                </H2>
            </Card>
        </div>
    );
}

export default FormItem;
