import Server from './server'
import Routes from './server/routes'
import config from './config/config.json'

const server = new Server(process.env.PORT || config.EXPRESS_PORT)
server.apply_middleware(Routes.get_routes(), '/properties')
server.begin_listen()