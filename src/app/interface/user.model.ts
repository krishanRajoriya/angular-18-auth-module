export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string; 
    isActive?: boolean; //optional property
    accessToken?: string;
    message?: string;
}

export interface Login{
    username: string;
    password: string;
}
