import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/controllers/AppointmentsController';
const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (resquest, response) => {
//   const createAppointmentService = new CreateAppointmentService(appointmentRepository);
//   return response.json(await createAppointmentService.findAll());
// });

appointmentsRouter.post('/', async (request, response) => {
    const appointmentsController = new AppointmentsController();
   return await appointmentsController.create(request,response);
});

export default appointmentsRouter;
