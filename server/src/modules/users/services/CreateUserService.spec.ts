import AppError from '@shared/error/AppError';

import FakeHaskProvider from '@modules/users/container/HashProvider/fakes/FakeHashProvider';
import UserRepositoryFake from '@modules/users/repositories/UserRepositoryFake';
import CreateUserService from './CreateUserService';

describe("Create User", ()=>{
  it('should create user', async ()=>{
    const fakeHashProvider = new FakeHaskProvider();
    const fakeUserRepository = new UserRepositoryFake();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const response = await createUserService.execute({name:"edilson", email:'andrade@gmail.com', password:'123456'});

    expect(response).toHaveProperty('id');

  });


  it('should not create user with the same e-mail', async ()=>{
    const fakeHashProvider = new FakeHaskProvider();
    const fakeUserRepository = new UserRepositoryFake();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const response = await createUserService.execute({name:"edilson", email:'andrade@gmail.com', password:'123456'});

    expect(response).toHaveProperty('id');

    expect(createUserService.execute({name:"edilson", email:'andrade@gmail.com', password:'123456'})).rejects.toBeInstanceOf(AppError)

  });
});
