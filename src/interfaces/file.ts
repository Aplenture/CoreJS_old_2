import { ResponseType } from "../enums";

export interface File {
    readonly name: string;
    readonly extension: string;
    readonly type: ResponseType;
    readonly charset: string;
    readonly bom: string;

    readonly toString: () => string;
}