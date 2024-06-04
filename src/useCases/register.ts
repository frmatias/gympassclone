/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { UsersPrismaRepository } from '@/repositories/UsersPrismaRepository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  })
  if (userWithSameEmail) {
    throw new Error(`User ${userWithSameEmail.name} already exists`)
  }
  const password_hash = await hash(password, 5)
  const usersPrismaRepository = new UsersPrismaRepository()
  await usersPrismaRepository.create({
    name,
    email,
    password_hash,
  })
}
