import AppError from '@shared/error/AppError';

import FakeHaskProvider from '@modules/users/container/HashProvider/fakes/FakeHashProvider';
import UserRepositoryFake from '@modules/users/repositories/UserRepositoryFake';
import FakeStorage from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UploadUserAvatarService from './UploadAvatarService';


describe("Upload User Avatar", ()=>{
  it('should create user and upload his avatar', async ()=>{
    const fakeHashProvider = new FakeHaskProvider();
    const fakeUserRepository = new UserRepositoryFake();
    const fakeStorageProvider = new FakeStorage();
    const uploadUserAvatarService = new UploadUserAvatarService(fakeUserRepository, fakeStorageProvider);

  const user = await fakeUserRepository.create({
      email:"edi@gmail.com",
      name:"edilson",
      password:"1234"
    });

console.log('user id', user.id)
    const response = await uploadUserAvatarService.execute({
      avatarFilename:"avatar.jpg",
      user_id:user.id
    });

    expect(response.avatar).toEqual('avatar.jpg');

  });


});
