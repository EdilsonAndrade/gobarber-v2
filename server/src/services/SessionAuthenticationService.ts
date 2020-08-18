import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class CreateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const repository = getRepository(User);
    const user = await repository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email/password does not match');
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new Error('Email/password does not match');
    }

    delete user.password;
    const token = sign({}, '58223e783f568d1b8436dc1f62246b16');
    const response = {
      user,
      token,
    };
    return response;
  }
}
