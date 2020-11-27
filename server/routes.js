import express from 'express'

export default class Router{
    static get_routes(){
        const router = express.Router()
        router.get('/',(req,resp)=>{
            //pass req to controller
        })
        router.post('/create',(req,resp)=>{
            //pass req to controller
        }),
        router.post('/update',(req,resp)=>{
            //pass req to controller 
        })
        router.post('/remove',(req,resp)=>{
            //pass req to controller
        })
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