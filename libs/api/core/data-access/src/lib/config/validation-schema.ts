import * as Joi from 'joi'

export const validationSchema = Joi.object({
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  AUTH_PASSWORD_ENABLED: Joi.boolean().default(true),
  AUTH_REGISTER_ENABLED: Joi.boolean().default(true),
  COOKIE_NAME: Joi.string().default('__session'),
  DATABASE_PROVISION: Joi.boolean().default(false),
  DATABASE_RESET: Joi.boolean().default(false),
  DATABASE_URL: Joi.string(),
  GRAPHQL_PLAYGROUND: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  HOST: Joi.string().default('0.0.0.0'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().default(3000),
})
