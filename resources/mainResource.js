export default class MainResource{
    success_respond(message,resp){
        resp.status(200).json(message)
    }

    error_respond(ex,resp){
        console.error(ex)
        resp.status(500).json("error was occurred")
    }
}