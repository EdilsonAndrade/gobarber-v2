import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const createUserService = new CreateUserService();

  try {
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
