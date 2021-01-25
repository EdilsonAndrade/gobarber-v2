import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/fileConfig';

import IStorageProvider from '../modules/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider{
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory,file),
      path.resolve(uploadConfig.uploadDirectory,file));

    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadDirectory,file);

    try {
      //check if the file exists at this filePath
      await fs.promises.stat(filePath);
    } catch {
      //if doesnt exist will do nothing
      return;
    }

    //if exists will delete
    await fs.promises.unlink(filePath);
  }

}
