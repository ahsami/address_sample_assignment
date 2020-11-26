import Interface from './IDBPrisma'

export default class Properties extends Interface {
    async add(prop) {
        try {
            await this.prisma.properties.create({
                data: {
                    ...prop
                }
            })
        }
        catch (ex) {
            console.error(ex)
        }
    }

    async find_by_id({ id }) {
        try {
            const result = await this.prisma.properties.findFirst({
                where: {
                    id
                }
            })
            return result
        }
        catch (ex) {
            console.error(ex)
        }
    }

    async remove({ id }) {
        try {
            await this.prisma.properties.delete({
                where: {
                    id
                }
            })
        }
        catch (ex) {
            console.error(ex)
        }
    }

    async update({ id, ...prop }) {
        try {
            await this.prisma.properties.update({
                where: {
                    id
                },
                data: {
                    ...prop
                }
            })
        }
        catch (ex) {
            console.error(ex)
        }
    }

    async find_all({area,latitude,longitude,rent,mortgage,age}) {
        try {
            const result = await this.prisma.properties.findMany({
                where: {
                    AND: [
                        {
                            area: area ?? undefined
                        },
                        {
                            latitude: latitude ?? undefined
                        },
                        {
                            longitude: longitude ?? undefined
                        },
                        {
                            rent: rent ?? undefined
                        },
                        {
                            mortgage: mortgage ?? undefined
                        },
                        {
                            age: age ?? undefined
                        }
                    ]
                }
            })
            return result
        }
        catch (ex) {
            console.error(prop)
        }
    }

    async find_in_range(prop) {
        const result = await this.prisma.properties.findMany({
            where: {
                AND: [
                    {
                        area: {
                            gte: prop.area_from,
                            lte: prop.area_to
                        }
                    },
                    {
                        latitude: {
                            gte: prop.latitude_from,
                            lte: prop.latitude_to
                        }
                    },
                    {
                        longitude: {
                            gte: prop.longitude_from,
                            lte: prop.longitude_to
                        }
                    },
                    {
                        rent: {
                            gte: prop.rent_from,
                            lte: prop.rent_to
                        }
                    },
                    {
                        mortgage: {
                            gte: prop.mortgage_from,
                            lte: prop.mortgage_to
                        }
                    },
                    {
                        age: {
                            gte: prop.age_from,
                            lte: prop.age_to
                        }
                    }
                ]
            }
        })
        return result
    }
}