import {uuid} from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from './IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';;

export default class UserRepository implements IUsersRepository{
  private users:User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u=>u.email === email);
    return user;
  
  }
  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(x=>x.id === id);
    return user; 
  
  }
  async create(data: ICreateUserDTO): Promise<User> {
    const user = {
      ...data,
      id:uuid(),
      avatar:'avatar',
      created_at:new Date(),
      updated_at: new Date()
    }; 
    this.users.push(user);
    return user;
  }
  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
