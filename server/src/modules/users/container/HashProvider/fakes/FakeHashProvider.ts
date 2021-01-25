import IHashProvider  from '../modules/IHashProvider';

export default class BcryptHashProvider implements IHashProvider{
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
  async encryptPassword(payload: string): Promise<string> {
    return payload;
  }
  
}
