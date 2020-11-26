import {PrismaClient} from '@prisma/client'
export default class DBInterface{
    constructor(){
        this.prisma = new PrismaClient()
    }
}
