import { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'
import { SimpleAdminConfig } from '../src/types/main.js'
import AdminController from '../src/controllers/admin_controller.js'
import ModelController from '../src/controllers/model_controller.js'
import path from 'node:path'

export default class SimpleAdminProvider {
  constructor(protected app: ApplicationService) {}
  async boot() {
    const BASE_URL = new URL('./', import.meta.url)
    const adminConfig = this.app.config.get<SimpleAdminConfig>('simple_admin')
    const router = await this.app.container.make('router')
    edge.mount(adminConfig.templateNamespace, new URL('../resources/views', BASE_URL))
    edge.global('simpleAdminInclude', (value: string) => {
      return `${adminConfig.templateNamespace}::${value}`
    })
    edge.global('simpleAdminAsset', (value: string) => {
      return `${adminConfig.path}/assets/${value}`
    })
    edge.global('simpleAdminNS', `${adminConfig.templateNamespace}`)
    router
      .group(() => {
        router.get('/assets/app.css', ({ response }) => {
          return response.download(
            path.resolve('node_modules/@matfire/adonis-simple-admin/build/resources/css/app.css')
          )
        })
        router.get('/assets/unpoly.js', ({ response }) => {
          return response.download(
            path.resolve('node_modules/@matfire/adonis-simple-admin/build/resources/js/unpoly.js')
          )
        })
        router.get('/', [AdminController, 'index']).as(`${adminConfig.templateNamespace}.index`)
        router
          .get('/model/:modelName', [ModelController, 'index'])
          .as(`${adminConfig.templateNamespace}.model.show`)
        router
          .get('/model/:modelName/new', [ModelController, 'create'])
          .as(`${adminConfig.templateNamespace}.model.create`)
        router
          .post('/model/:modelName', [ModelController, 'store'])
          .as(`${adminConfig.templateNamespace}.model.store`)
      })
      .prefix(adminConfig.path)
  }
}
