import sql from "..";

export enum EQuestionType {
    TEXT = 'Text',
    NUMBER = 'Number',
    BOOLEAN = 'Boolean',
    RADIO = 'Radio',
    SELECT = 'Select'
}

export interface IQuestionType {
    readonly id: number;
    readonly type: EQuestionType;
}

export const getAllQuestionTypes = async (): Promise<IQuestionType[]> => {
    const res = await sql.query<IQuestionType>('SELECT * FROM public."QuestionTypes"');
    return res.rows;
};

export const getQuestionType = async (id: string): Promise<IQuestionType | null> => {
    const res = await sql.query<IQuestionType>('SELECT * FROM public."QuestionTypes" WHERE id = $1', [id]);
    return res.rows[0];
}