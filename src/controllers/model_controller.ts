import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { SimpleAdminConfig } from '../types/main.js'
import db from '@adonisjs/lucid/services/db'
import { databaseTypeToAdminType } from '../utils/db_converter.js'

export default class ModelController {
  async index({ params, view }: HttpContext) {
    const { modelName } = params
    const config = app.config.get<SimpleAdminConfig>('simple_admin')
    const model = config.models.find((e) => e.table === modelName)
    const instances = (await model?.all()) ?? []
    const colInfo = await db.connection().columnsInfo(modelName)
    const headers = Object.keys(colInfo)
    return view.render(`${config.templateNamespace}::pages/model.index`, {
      instances,
      headers,
      modelName,
    })
  }
  async store({ request, params, response }: HttpContext) {
    const { modelName } = params
    const data = request.all()
    const config = app.config.get<SimpleAdminConfig>('simple_admin')
    const model = config.models.find((e) => e.table === modelName)
    const definitions = model?.$columnsDefinitions
    try {
      await model?.create(
        Object.fromEntries(
          Object.entries(data).filter(([k]) => {
            if (!definitions) return false
            const item = definitions.get(k)
            return item && !item.isPrimary
          })
        )
      )
    } catch (e) {
      console.log(e)
    }
    return response.redirect().back()
  }
  async create({ params, view }: HttpContext) {
    const { modelName } = params
    const config = app.config.get<SimpleAdminConfig>('simple_admin')
    const model = config.models.find((e) => e.table === modelName)
    const definitions = model?.$columnsDefinitions
    const colInfo = await db.connection().columnsInfo(modelName)
    const formItems = Object.keys(colInfo)
      .filter((e) => {
        if (!definitions) return false
        const item = definitions.get(e)
        return item && !item.isPrimary
      })
      .map((e) => {
        return {
          name: e,
          type: databaseTypeToAdminType(colInfo[e].type),
        }
      })
    return view.render(`${config.templateNamespace}::pages/model.create`, {
      formItems,
      modelName,
    })
  }
}
