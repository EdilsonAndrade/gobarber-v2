import { startOfHour } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentHour = startOfHour(date);

    const appointmentFound = this.appointmentRepository.findByDate(
      appointmentHour
    );

    if (appointmentFound) {
      throw Error('This appointment is already booked');
    }
    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentHour,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
