import { ResponseType } from "../enums";

export interface File {
    readonly name: string;
    readonly type: ResponseType;
    readonly charset: string;

    readonly toString: () => string;
}