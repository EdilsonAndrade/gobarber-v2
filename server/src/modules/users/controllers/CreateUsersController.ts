import {Request, Response} from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import {container} from 'tsyringe';
export default class CreateUsesController{
  public async create(request:Request, response:Response): Promise<Response>{
    const createUserService = container.resolve(CreateUserService);

    try {
      const { name, email, password } = request.body;

      const user = await createUserService.execute({ name, email, password });
      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
} 
