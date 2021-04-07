import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const UserRepository = getRepository(User);

    const CheckUserExists = await UserRepository.findOne({
      where: { email }
    });

    if (CheckUserExists) {
      throw new Error('Email address already used.')
    }

    const passwordEncrypted = await hash(password, 8)

    const user = UserRepository.create({
      name,
      email,
      password: passwordEncrypted,
    })

    await UserRepository.save(user)
    return user;
  }
}

export default CreateUserService;
