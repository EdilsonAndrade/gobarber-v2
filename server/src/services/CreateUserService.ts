import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../error/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User);
    const existedEmail = await repository.findOne({
      where: { email },
    });

    if (existedEmail) {
      throw new AppError('Email already exist');
    }

    const hashPassword = await hash(password, 8);
    const user = repository.create({
      name,
      email,
      password: hashPassword,
    });

    await repository.save(user);
    delete user.password;
    return user;
  }
}
