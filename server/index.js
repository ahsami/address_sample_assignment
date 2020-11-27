import express from 'express'


export default class Server{
    constructor(port){
        this.server = express()        
        this.port = port        
    }

    begin_listen(){
        this.server.listen(this.port,()=>{
            console.log('start listening servers')
        })
    }

    apply_middleware(router,path){
        this.server.use(path,router)
    }
}