import { UsersPrismaRepository } from '@/repositories/UsersPrismaRepository'
/* eslint-disable camelcase */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/useCases/register'
// Remove the duplicate import statement
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)
  const usersRepository = new UsersPrismaRepository()
  try {
    const registerUseCase = new RegisterUseCase(usersRepository) // Add the usersRepository argument here
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    return reply.status(409).send()
  }
  return reply.status(201).send()
}
