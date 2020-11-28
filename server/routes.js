import express from 'express'
import resources from '../resources/property'


export default class Router{    
    static get_routes(){
        const resource = new resources()
        const router = express.Router()        
        router.post('/create',resource.create_property)
        router.put('/:id/update',resource.update_property)
        router.delete('/:id/remove',resource.delete_property)
        router.post('/search',resource.search_property)
        router.post('/polygon_search',resource.polygon_search_properties)

        //Bonus
        router.post('/:id/recommend_case',resource.recomend_simillar_properties)

        return router
    }
}