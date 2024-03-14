import { HttpContext } from '@adonisjs/core/http'

export default class ModelController {
  async show(context: HttpContext) {
    console.log(context.params)
    return 'this is the model detail view'
  }
}
