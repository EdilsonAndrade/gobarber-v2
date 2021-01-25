import {uuid} from 'uuidv4';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import {isEqual} from 'date-fns';

class AppointmentsReporitory implements IAppointmentsRepository {
  private appointments: Appointment[] =[];
  public async findAll(): Promise<Appointment[] | undefined> {
    
    return this.appointments;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    
    Object.assign(appointment,{id:uuid(), provider_id, date});
    
    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(a=>isEqual(a.date,date));
    return findAppointment;
  }
}
export default AppointmentsReporitory;
