import {Request, Response} from 'express';
import SessionAuthenticationService from '@modules/users/services/SessionAuthenticationService';
import {container} from 'tsyringe';

export default class SessionUserController{
  public async create(request:Request, response:Response): Promise<Response>{
    try {

      const authenticationService = container.resolve(SessionAuthenticationService)
      const { email, password } = request.body;
      const user = await authenticationService.execute({ email, password });
  
      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
} 
