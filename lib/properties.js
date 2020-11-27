import DBProp from '../db/lib/properties'


export default class Properties {
    constructor() {
        this.db = new DBProp()
    }

    check_property_before_execte(data) {
        if (data.latitude < -90 || data.latitude > 90)
            throw "wrong range for latitude"
        if (data.longitude > 180 || data.longitude < -180)
            throw "wrong range for longitude"        
    }
    async add_property(data) {
        try {
            this.check_property_before_execte(data)
            const added = await this.db.add(data)
            return added
        }
        catch (ex) {
            throw ex;
        }
    }
    async delete_property(data) {
        try {
            await this.db.remove(data)
        }
        catch (ex) {
            throw ex
        }
    }

    async update_property(data) {
        try {
            this.check_property_before_execte(data)
            const updated = await this.db.update(data)
            return updated
        }
        catch (ex) {
            throw ex
        }
    }


    async find_property_by_id(data) {
        try {
            const found = await this.db.find_by_id(data)
            return found
        }
        catch (ex) {
            throw ex
        }
    }

    async find_all_properties(data) {
        try {
            const list = await this.db.find_all(data)
            return list
        }
        catch (ex) {
            throw ex
        }
    }

    async search_properties(search_data) {
        try {
            const list = await this.db.find_by_range(search_data)
            return list
        }
        catch (ex) {
            throw ex
        }
    }
}