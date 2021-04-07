import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionAuth {
  public async execute({ email, password }: Request): Promise<Response> {

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error('Incorrect email/password combination!')
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination!')
    }

    const { secret, expiresIn } = authConfig.jwt;


    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    })

    return { user, token };
  }
}

export default CreateSessionAuth;
