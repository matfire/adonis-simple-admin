import { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'
import { SimpleAdminConfig } from '../src/types/main.js'
const AdminController = () => import('../src/controllers/admin_controller.js')

export default class SimpleAdminProvider {
  constructor(protected app: ApplicationService) {}
  async boot() {
    const BASE_URL = new URL('./', import.meta.url)
    const adminConfig = (await this.app.config.get('simple_admin')) as SimpleAdminConfig
    const router = await this.app.container.make('router')
    console.log(adminConfig)
    edge.mount(adminConfig.templateNamespace, new URL('../resources/views', BASE_URL))
    router.get(adminConfig.path, [AdminController, 'index'])
  }
}
