import lib from '../lib/properties'
import { properties as model, properties_search as serach_model } from '../db/data_models/properties'
import MainResource from './mainResource'

export default class PropertyResources extends MainResource {
    constructor() {
        super();
        this.lib = new lib()
        this.__initilization__()
    }
    __initilization__() {
        this.create_property = this.create_property.bind(this)
        this.delete_property = this.delete_property.bind(this)
        this.update_property = this.update_property.bind(this)
        this.search_property = this.search_property.bind(this)
        this.polygon_search_properties = this.polygon_search_properties.bind(this)
        this.recomend_simillar_properties = this.recomend_simillar_properties.bind(this)
    }
    async create_property(req, resp) {
        try {
            const property = { ...model, ...req.body }
            const added = await this.lib.add_property(property)
            this.success_respond(added, resp)
        }
        catch (ex) {
            this.error_respond(ex, resp)
        }
    }
    async delete_property(req, resp) {
        try {
            const { params } = req
            const property = { id: parseInt(params.id) }
            await this.lib.delete_property(property)
            this.success_respond(`property ${params.id} deleted successfully`, resp)
        }
        catch (ex) {
            this.error_respond(ex, resp)
        }
    }
    async update_property(req, resp) {
        try {
            const { body, params } = req
            const property = { ...model, ...body, id: parseInt(params.id) }
            const updated = await this.lib.update_property(property)
            this.success_respond(`property ${updated.id} updated successfully`, resp)
        }
        catch (ex) {
            this.error_respond(ex, resp)
        }
    }

    async search_property(req, resp) {
        try {
            const { body } = req
            const search_prop = { ...serach_model, ...body }
            const result = await this.lib.search_properties(search_prop)
            this.success_respond(result, resp)
        }
        catch (ex) {
            this.error_respond(ex, resp)
        }
    }

    async polygon_search_properties(req, resp) {
        try {
            const { polygons } = req.body

            const result = await this.lib.polygon_search_properties(polygons)
            this.success_respond(result, resp)
        }
        catch (ex) {
            this.error_respond(ex, resp)
        }
    }

    //Bonus
    async recomend_simillar_properties(req, resp) {
        try {
            const { id } = req.params
            const list = await this.lib.simillar_properties({ id: parseInt(id) })
            if (list)
                this.success_respond(list, resp)
            else
                this.error_respond('id not found',resp)
        }
        catch (ex) {
            this.error_respond(ex, resp)
        }
    }

}
