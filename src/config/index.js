require('dotenv/config');
const z = require('zod');

const configSchema = z
  .object({
    PORT: z.preprocess(Number, z.number()).default(8080).readonly(),
    NODE_ENV: z
      .enum(['DEVELOPMENT', 'PRODUCTION', 'STAGING'])
      .default('DEVELOPMENT')
      .readonly(),
    ALLOWED_ORIGINS: z.string().default('*'),
    MAIL_HOST: z.string().optional(),
    MAIL_PORT: z.preprocess(Number, z.number()).optional(),
    MAIL_USERNAME: z.string().optional(),
    MAIL_PASSWORD: z.string().optional(),
    MAIL_FROM: z.string().optional(),
    MAIL_DISPLAY_NAME: z.string().optional(),
  })
  .readonly();

const config = configSchema.parse(process.env);

module.exports = {
  config,
};
