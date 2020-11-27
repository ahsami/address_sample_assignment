import { PrismaClient } from '@prisma/client'
import { properties as model } from '../db/data_models/properties'
import utils from '../utils/global'
import cluster from 'cluster'
import os from 'os'
import { RANDOM_GENERATOR_LIMIT as limit } from '../config/config.json'


const cpu_length = os.cpus().length
const cluster_data_limit = parseInt(limit / cpu_length)
const area_range = [100, 700]
const latitude_range = [-90, 90]
const longitude_range = [-180, 180]
const rent_range = [5, 50]
const mortgage_range = [20, 200]
const age_range = [1, 10]


const random_property_generator = () => {
    const m = { ...model }

    m.area = utils.get_random_num(area_range[0], area_range[1])
    m.latitude = utils.get_random_num(latitude_range[0], latitude_range[1],3)
    m.longitude = utils.get_random_num(longitude_range[0], longitude_range[1],3)
    m.rent = utils.get_random_num(rent_range[0], rent_range[1]) * 100000
    m.mortgage = utils.get_random_num(mortgage_range[0], mortgage_range[1]) * 1000000
    m.age = utils.get_random_num(age_range[0], age_range[1])

    return m
}

const builder = async counter => {
    const pc = new PrismaClient()
    await pc.$connect()
    for (let i = 0; i < counter; i++) {
        try {
            const generated = random_property_generator()
            const added = await pc.properties.create({ data: { ...generated } })
            console.log('data ', added.id, ' is added')
        }
        catch (ex) {
            console.error(ex)
        }
    }
    await pc.$disconnect()
}


if (cluster.isMaster) {
    for (let i = 0; i < cpu_length ; i++)
        cluster.fork()
}
else {    
    console.log(process.pid)
    builder(cluster_data_limit)
}
