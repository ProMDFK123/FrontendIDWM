export interface ResponseAPI {
    email: string;
    lastName: string | undefined;
    firstName: string | undefined;
    token: string;
    success?: boolean;
    message?: string;
    data?:    any;
    errors?:  null;
}