import { uuid } from 'uuidv4';
import { Card, Elevation, H3, Icon, IconName } from '@blueprintjs/core';
import { questionTypesStyles } from './styles';
import { questionTypesData } from './data';
import { IDragItem } from '../../pages/config/formConfig';
import { EQuestionType } from './enums';

interface IQuestionTypesProps {
    readonly setDragItem: (dragItem: IDragItem | undefined) => void;
}

const QuestionTypes = (props: IQuestionTypesProps) => {
    return (
        <div style={questionTypesStyles.container}>
            {questionTypesData.map((qt, index) => <QuestionType
                {...qt}
                key={`${index}-${qt.name}`}
                index={index}
                setDragItem={props.setDragItem}
            />)}
        </div>
    );
};

interface IQuestionTypeProps {
    readonly index?: number;
    readonly name: string;
    readonly icon: IconName;
    readonly type: EQuestionType;
    readonly setDragItem: (dragItem: IDragItem | undefined) => void;
}

const QuestionType = ({ name, icon, type, index, setDragItem }: IQuestionTypeProps) => {
    const cardStyle = {
        ...questionTypesStyles.card,
        ...( index === 0 ? { marginTop: 0 } : {} )
    }
    const onDragStart = () => {
        setDragItem({
           id: uuid(),
           questionType: type 
        });
    }
    const onDragEnd = () => {
        setDragItem(undefined);
    }

    return (
        <Card
            draggable
            interactive
            elevation={Elevation.TWO}
            style={cardStyle}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Icon icon={icon} iconSize={25} />
            <H3 style={questionTypesStyles.cardText}>{name}</H3>
        </Card>
    );
}

export default QuestionTypes;
