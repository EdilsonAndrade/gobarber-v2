import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '../models/User';
import fileConfig from '../config/fileConfig';
import AppError from '../error/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UploadAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(user_id);

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

    await userRepo.save(user);

    delete user.password;

    return user;
  }
}

export default UploadAvatarService;
