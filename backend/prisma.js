import prismaModule from '@prisma/client'

const { PrismaClient } = prismaModule

let prisma = new PrismaClient()

export default prisma
