import { Router } from 'express';
import SessionUserController from '@modules/users/controllers/SessionUserController';
interface Request {
  name: string;
  email: string;
  password: string;
}

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {
const sessionUserController = new SessionUserController();
return sessionUserController.create(request,response);
});

export default sessionsRouter;
