import DBProp from '../db/lib/properties'
import Polygon from '../utils/polygan'
import { properties_search as search_model } from '../db/data_models/properties'
import {
    RECOMEND_PROPERTIES_DISTANCE as recommend_distance,
    RECOMEND_PROPERTIES_AREA as recommend_area,
    RECOMEND_PROPERTIES_MORTGAGE as recommend_mortgage,
    RECOMEND_PROPERTIES_RENT as recommend_rent,
    RECOMEND_PROPERTIES_AGE as recommend_age
} from '../config/config.json'

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

    async polygon_search_properties(polygons = []) {
        try {
            const polygon_obj = new Polygon()
            const [polygons_range_lat, polygons_range_long] = polygon_obj.__edge_of_polygons__(polygons)
            const search_data = {
                ...search_model,
                latitude_from: polygons_range_lat[0],
                latitude_to: polygons_range_lat[1],
                longitude_from: polygons_range_long[0],
                longitude_to: polygons_range_long[1]
            }
            const list = await this.db.find_by_range(search_data)
            const result = []
            for (const l of list) {
                if (polygon_obj.is_inside(polygons, [l.latitude, l.longitude]))
                    result.push(l)
            }
            return result
        }
        catch (ex) {
            throw ex
        }
    }

    async simillar_properties(data) {
        try {
            const found = await this.find_property_by_id(data)
            if(!found)
                return null
            const search_data = {
                ...search_model,
                latitude_from: found.latitude - recommend_distance,
                latitude_to: found.latitude + recommend_distance,
                longitude_from: found.longitude - recommend_distance,
                longitude_to: found.longitude + recommend_distance,
                area_from: found.area - recommend_area,
                area_to: found.area + recommend_area,
                rent_from: found.rent - recommend_rent,
                rent_to: found.rent + recommend_rent,
                mortgage_from : found.mortgage - recommend_mortgage,
                mortgage_to : found.mortgage + recommend_mortgage,
                age_from : found.age - recommend_age , 
                age_to : found.age + recommend_age 
            }
            const result = await this.search_properties(search_data)
            return result
        }
        catch (ex) {
            throw ex
        }
    }
}