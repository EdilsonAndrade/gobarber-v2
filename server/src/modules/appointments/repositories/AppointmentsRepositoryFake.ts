import {uuid} from 'uuidv4';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsReporitory implements IAppointmentsRepository {
  public async findAll(): Promise<Appointment[] | undefined> {
    const appointments:Appointment[] = [];
    const appointment = new Appointment();
    
    Object.assign(appointment,{id:uuid(),date: new Date()});

    appointments.push(appointment);

    return appointments;

  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.ormRepository.create({ date, provider_id });

    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return appointmentFound;
  }
}
export default AppointmentsReporitory;
