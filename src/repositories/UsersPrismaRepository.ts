import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

/* eslint-disable camelcase */
export class UsersPrismaRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
