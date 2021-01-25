import {container} from 'tsyringe';
import IStorageProvider from './StorageProvider/modules/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementation/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);
