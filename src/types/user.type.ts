
import { Request } from "express";

export interface dataUserRequest extends Request{
    params: {
        id: string;
    }
    body:{
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        city: string;
        state: string;
    }
}