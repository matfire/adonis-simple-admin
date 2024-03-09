import { ApplicationService } from '@adonisjs/core/types'
import { SimpleAdminConfig } from '../src/types/main.js'
const AdminController = () => import('../src/controllers/admin_controller.js')

export default class SimpleAdminProvider {
  constructor(protected app: ApplicationService) {}
  async boot() {
    const adminConfig = (await this.app.config.get('simple_admin')) as SimpleAdminConfig
    const router = await this.app.container.make('router')
    router.get(adminConfig.path, [AdminController, 'index'])
  }
}
