import { Router } from 'express';
import SessionAuthenticationService from '../services/SessionAuthenticationService';

interface Request {
  name: string;
  email: string;
  password: string;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const authenticationService = new SessionAuthenticationService();
    const { email, password } = request.body;
    const user = await authenticationService.execute({ email, password });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
