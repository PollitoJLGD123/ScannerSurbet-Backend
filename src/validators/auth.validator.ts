import Joi from 'joi';

export const loginSchema = Joi.object({
  correo: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe tener un formato válido',
    'any.required': 'El correo electrónico es obligatorio'
  }),
  password: Joi.string().required().messages({
    'any.required': 'La contraseña es obligatoria'
  })
});

export const registerSchema = Joi.object({
  nombres: Joi.string().required().messages({
    'any.required': 'El nombre es obligatorio'
  }),
  apellidos: Joi.string().required().messages({
    'any.required': 'Los apellidos son obligatorios'
  }),
  correo: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe tener un formato válido',
    'any.required': 'El correo electrónico es obligatorio'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria'
  }),
  pais: Joi.string().required().messages({
    'any.required': 'El país es obligatorio'
  }),
  codPais: Joi.string().required().messages({
    'any.required': 'El código de país es obligatorio'
  }),
  celular: Joi.string().required().messages({
    'any.required': 'El número de celular es obligatorio'
  })
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'La contraseña actual es obligatoria'
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'La nueva contraseña debe tener al menos 6 caracteres',
    'any.required': 'La nueva contraseña es obligatoria'
  })
});