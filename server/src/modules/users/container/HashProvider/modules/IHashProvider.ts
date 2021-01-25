export default interface IHashProvider{
  compareHash(payload:string, hashed:string):Promise<boolean>;
  encryptPassword(payload:string): Promise<string>;
}
