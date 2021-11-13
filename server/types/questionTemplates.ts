export interface INewQuestionTemplate {
    readonly text: string;
    readonly questionTemplateId: string;
}

export interface IEditQuestionTemplate {
    readonly text?: string;
    readonly questionTemplateId?: string;
}