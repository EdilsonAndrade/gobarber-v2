import {container} from 'tsyringe';

import IHashProvider from './HashProvider/modules/IHashProvider';
import BcryptHashProvider from './HashProvider/implementation/BcryptHashProvider';

container.registerSingleton<IHashProvider>(
  "HashProvider",
  BcryptHashProvider
);
