import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (resquest, response) => {
//   const createAppointmentService = new CreateAppointmentService(appointmentRepository);
//   return response.json(await createAppointmentService.findAll());
// });

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentRepository = new AppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentService(appointmentRepository);

    const appointment = await createAppointmentServices.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(error.statusCode).json({ error: error.message });
  }
});

export default appointmentsRouter;
