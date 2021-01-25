import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/modules/IStorageProvider';
import fs from 'fs';
import path from 'path';
import User from '@modules/users/infra/typeorm/entities/User';
import fileConfig from '@config/fileConfig';
import AppError from '@shared/error/AppError';
import {injectable, inject} from 'tsyringe';
interface Request {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UploadAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider){};
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found to upload Avatar');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);


    }
    const fileName = await this.storageProvider.saveFile(avatarFilename);
    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UploadAvatarService;
