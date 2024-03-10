import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { Edge } from 'edge.js'
import { SimpleAdminConfig } from '../types/main.js'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    /**
     * Reference to the edge renderer to render templates
     * during an HTTP request
     */
    view: ReturnType<Edge['createRenderer']>
  }
}

export default class AdminController {
  async index({ view }: HttpContext) {
    const config = await app.config.get<SimpleAdminConfig>('simple_admin')
    return view.render(`${config.templateNamespace}::pages/index`)
  }
}
