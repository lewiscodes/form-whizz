import { useState } from 'react';
import QuestionTypes from '../../../components/questionTypes';
import Form from './form';
import { configStyles } from '../styles';
import { EQuestionType } from '../../../components/questionTypes/enums';

export interface IDragItem {
    readonly id: string;
    readonly questionType: EQuestionType;
}

const FormConfig = () => {
    const [dragItem, setDragItem] = useState<IDragItem>();
    
    return (
        <div style={configStyles.page}>
            <QuestionTypes setDragItem={setDragItem} />
            <Form dragItem={dragItem} />
        </div>
    );
}

export default FormConfig;