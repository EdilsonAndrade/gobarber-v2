import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/fileConfig';

import IStorageProvider from '../modules/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider{
  private files:string[] =[];
  public async saveFile(file: string): Promise<string> {
     this.files.push(file);
     return file;
  }
  public async deleteFile(file: string): Promise<void> {
    const index = this.files.findIndex(storage=> storage ===file);
    
    this.files.splice(index,1);
  
    

  }

}
