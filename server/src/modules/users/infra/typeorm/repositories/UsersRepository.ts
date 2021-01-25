import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import {getRepository, Repository} from 'typeorm';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

export default class UserRepository implements IUsersRepository{
  private userRepository:Repository<User>
  constructor(){
    this.userRepository = getRepository(User);
  }
  findByEmail(email: string): Promise<User | undefined> {
      return this.userRepository.findOne({
        where:{email}
      });
  }
  findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }
  create(data: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);
    return this.save(user);
  }
  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
