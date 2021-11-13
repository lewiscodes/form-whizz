import { IconName } from "@blueprintjs/core";
import { EQuestionType } from './enums';

interface IQuestionType {
    readonly name: string;
    readonly icon: IconName;
    readonly type: EQuestionType;
}

export const questionTypesData: IQuestionType[] = [
    {
        name: 'Text',
        icon: 'align-center' as IconName,
        type: EQuestionType.TEXT
    },
    {
        name: 'Number',
        icon: 'numerical' as IconName,
        type: EQuestionType.NUMBER
    },
    {
        name: 'Radio List',
        icon: 'properties' as IconName,
        type: EQuestionType.RADIO_LIST
    },
    {
        name: 'Dropdown List',
        icon: 'multi-select' as IconName,
        type: EQuestionType.DROPDOWN_LIST
    },
    {
        name: 'Searchable List',
        icon: 'filter-list' as IconName,
        type: EQuestionType.SEARCHABLE_LIST
    },
    {
        name: 'Tree List',
        icon: 'diagram-tree' as IconName,
        type: EQuestionType.TREE_LIST
    },
    {
        name: 'Date/Time',
        icon: 'timeline-events' as IconName,
        type: EQuestionType.DATE_TIME
    }
];

export const getQuestionType = (type: EQuestionType): IQuestionType | undefined => {
    return questionTypesData.find(questionType => questionType.type === type);
}