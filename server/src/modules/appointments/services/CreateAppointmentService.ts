import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/error/AppError';

interface Request {
  date: Date;
  provider_id: string;
}
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentHour = startOfHour(date);

    const appointmentFound = await appointmentRepository.findByDate(
      appointmentHour
    );

    if (appointmentFound) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentHour,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;