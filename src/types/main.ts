import { LucidModel } from '@adonisjs/lucid/types/model'

export interface SimpleAdminConfig {
  models: LucidModel[]
  path: string
}
