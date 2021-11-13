import { Request } from "express";

export function getBodyData<Type>(req: Request): Type | undefined {
    const { body } = req;

    if (!Object.keys(body).length) {
        return undefined;
    }

    return body;
}

export const getIdFromRequest = (req: Request): string => {
    return req.params.id;
}