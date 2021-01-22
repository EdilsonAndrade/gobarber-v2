import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import auth from '@config/auth';
import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import {injectable, inject} from 'tsyringe';
interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository){};

  public async execute({ email, password }: Request): Promise<Response> {
     const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Email/password does not match', 401);
      }

      const matchedPassword = await compare(password, user.password);

      if (!matchedPassword) {
        throw new AppError('Email/password does not match', 401);
      }
  
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
