/* eslint-disable camelcase */
import { UsersPrismaRepository } from '@/repositories/UsersPrismaRepository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersPrismaRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error(`User ${userWithSameEmail.name} already exists`)
    }
    const password_hash = await hash(password, 5)
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
