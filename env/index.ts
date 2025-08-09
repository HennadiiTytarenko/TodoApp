import { cleanEnv, str, url } from 'envalid'

export const env = cleanEnv(process.env, {
  BASE_URL: url(),
})
