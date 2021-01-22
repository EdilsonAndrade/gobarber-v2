import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import {injectable, inject} from 'tsyringe';
interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateUserService {

  constructor(
    @inject("UsersRepository")
    private _usersRepository:IUsersRepository
    ){}

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
