import IUsersRepository from '../repositories/IUsersRepository';
import fs from 'fs';
import path from 'path';
import User from '@modules/users/infra/typeorm/entities/User';
import fileConfig from '@config/fileConfig';
import AppError from '@shared/error/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UploadAvatarService {
  constructor(private usersRepository: IUsersRepository){};
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found to upload Avatar');
    }

    if (user.avatar) {
      const filepath = path.join(fileConfig.directory, user.avatar);
      try {
        const file = await fs.promises.stat(filepath);
        if (file.isFile()) {
          fs.promises.unlink(filepath);
          user.avatar = avatarFilename;
        }
      } catch {
        user.avatar = avatarFilename;
      }
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UploadAvatarService;
