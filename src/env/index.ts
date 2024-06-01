import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log(`Environment variables are invalid  ${_env.error.format}`)
  throw new Error(`Invalid environment variables: ${_env.error.format}`)
}

export const env = _env.data
