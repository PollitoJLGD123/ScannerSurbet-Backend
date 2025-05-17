import joi from 'joi';

export const dataValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    zip: joi.string().required(),
    country: joi.string().required(),
});