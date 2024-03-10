import { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'
import { SimpleAdminConfig } from '../src/types/main.js'
import AdminController from '../src/controllers/admin_controller.js'

export default class SimpleAdminProvider {
  constructor(protected app: ApplicationService) {}
  async boot() {
    const BASE_URL = new URL('./', import.meta.url)
    const adminConfig = await this.app.config.get<SimpleAdminConfig>('simple_admin')
    const router = await this.app.container.make('router')
    edge.mount(adminConfig.templateNamespace, new URL('../resources/views', BASE_URL))
    edge.global('simpleAdminInclude', (value: string) => {
      return `${adminConfig.templateNamespace}::${value}`
    })
    router.get(adminConfig.path, [AdminController, 'index'])
  }
}
