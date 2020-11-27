import lib from '../lib/properties'

export default class Resources{
    constructor(){
        this.lib = new lib()
    }
    async create_property(req,res){
        const {property} = req
        await this.lib.add_property(property)
    }
    async delete_property(req,resp){
        const {property}  = req
        await this.lib.delete_property(property)
    }
    async update_property(req,resp){
        const {property} = req
        await this.lib.update_property(property)
    }
    
}
