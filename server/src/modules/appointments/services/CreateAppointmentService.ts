import {injectable, inject} from 'tsyringe';
import { startOfHour } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/error/AppError';

interface Request {
  date: Date;
  provider_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    const appointmentFound = await this.appointmentRepository.findByDate(
      appointmentHour
    );

    if (appointmentFound) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
