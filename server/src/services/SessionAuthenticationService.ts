import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import auth from '../config/auth';
import AppError from '../error/AppError';

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
      throw new AppError('Email/password does not match', 401);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError('Email/password does not match', 401);
    }

    delete user.password;
    const token = sign({}, auth.jwt.tokenKey, {
      expiresIn: auth.jwt.expiresIn,
      subject: user.id,
    });
    const response = {
      user,
      token,
    };
    return response;
  }
}