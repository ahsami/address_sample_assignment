import express from 'express'
import resources from '../resources'


export default class Router{
    static get_routes(){
        const resource = new resources()
        const router = express.Router()
        router.get('/',(req,resp)=>{
            //pass req to controller
        })
        router.post('/create',resource.create_property)
        router.post('/update',resource.update_property)
        router.post('/remove',resource.delete_property)
        router.post('/select_one',(req,reps)=>{
            //pass req to conotroller
        })
        router.post('/select_many',(req,resp)=>{
            //pass req to controller
        })
        router.post('/polygon_search',(req,resp)=>{
            //pass req to conoroller
        })


        return router
    }
}