import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private _usersRepository:IUsersRepository){}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const existedEmail = await this._usersRepository.findByEmail(email);

    if (existedEmail) {
      throw new AppError('Email already exist');
    }

    const hashPassword = await hash(password, 8);
    const user = this._usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}
