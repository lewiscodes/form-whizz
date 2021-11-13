export interface IError {
    readonly statusCode: number;
    readonly status: string;
}

export const generateError = (statusCode: number, status: string): IError => {
    return { statusCode, status };
}

export const isError = (obj: object | undefined): boolean => {
    if (!obj) { return false }
    const keys = Object.keys(obj);

    return keys.length === 2 && keys.includes('statusCode') && keys.includes('status');
}