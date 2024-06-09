/* eslint-disable camelcase */
import { IUsersRepository } from '@/repositories/IRepositories/IUsersRepository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }
    const password_hash = await hash(password, 5)
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
