import {compare, hash} from 'bcryptjs'
import IHashProvider  from '../modules/IHashProvider';

export default class BcryptHashProvider implements IHashProvider{
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload,hashed);
  }
  async encryptPassword(payload: string): Promise<string> {
    return await hash(payload,8);
  }
  
}
