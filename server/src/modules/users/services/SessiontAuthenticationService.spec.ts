import AppError from '@shared/error/AppError';

import FakeHaskProvider from '@modules/users/container/HashProvider/fakes/FakeHashProvider';
import UserRepositoryFake from '@modules/users/repositories/UserRepositoryFake';
import SessionAuthenticationService from './SessionAuthenticationService';
import CreateUserService from './CreateUserService';
describe("Authentication", ()=>{
  it('should authenticate user', async ()=>{
    const fakeHashProvider = new FakeHaskProvider();
    const fakeUserRepository = new UserRepositoryFake();
    const authenticationService = new SessionAuthenticationService(fakeUserRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
     const user = await createUserService.execute({name:"edilson", email:'andrade@gmail.com', password:'123456'});
    const response = await authenticationService.execute({email:'andrade@gmail.com', password:'123456'});

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user)


  });


  it('should not authenticate user', async ()=>{
    const fakeHashProvider = new FakeHaskProvider();
    const fakeUserRepository = new UserRepositoryFake();
    const authenticationService = new SessionAuthenticationService(fakeUserRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    await createUserService.execute({name:"edilson", email:'andrade@gmail.com', password:'123456'});
    expect(authenticationService.execute({email:'andrade@gmail.com', password:'33123456'})).rejects.toBeInstanceOf(AppError);


  });


  it('should not authenticate user wrong password', async ()=>{
    const fakeHashProvider = new FakeHaskProvider();
    const fakeUserRepository = new UserRepositoryFake();
    const authenticationService = new SessionAuthenticationService(fakeUserRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    await createUserService.execute({name:"edilson", email:'andrade@gmail.com', password:'123456'});
    
    expect(authenticationService.execute({email:'andrade@gmail.com', password:'33123456'})).rejects.toBeInstanceOf(AppError);


  });
});
