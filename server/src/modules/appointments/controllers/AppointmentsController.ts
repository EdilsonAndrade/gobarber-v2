import {Request, Response} from 'express';
import {container} from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController{
  public async create(request:Request, response:Response):Promise<Response>{
    try {
      const { provider_id, date } = request.body;
  
      const parsedDate = parseISO(date);
      
      const createAppointmentServices = container.resolve(CreateAppointmentService);
  
      const appointment = await createAppointmentServices.execute({
        date: parsedDate,
        provider_id,
      });
  
      return response.json(appointment);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }

  }
}
