import DBProp from '../db/lib/properties'


export default class Properties{
    constructor() {
        this.db = new DBProp()
    }

    async add_property(data) {
        try {
            await this.db.add(data)
        }
        catch (ex) {
            console.error(ex)
        }
    }
    async delete_property(data) {
        try {
            await this.db.remove(data)
        }
        catch (ex) {
            console.error(ex)
        }
    }

    async update_property(data){
        try{
            await this.db.update(data)
        }
        catch(ex){
            console.error(ex)
        }
    }


    async find_property_by_id(data){
        try{
            const found = await this.db.find_by_id(data)
            return found
        }
        catch(ex){
            console.error(ex)
        }
    }

    async find_all_properties(data){
        try{
            const list = await this.db.find_all(data)
            return list
        }
        catch(ex){
            console.error(ex)
        }
    }

    async search_properties(search_data){
        try{
            const list = await this.db.find_by_range(search_data)
            return list
        }
        catch(ex){
            console.error(ex)
        }
    }
}