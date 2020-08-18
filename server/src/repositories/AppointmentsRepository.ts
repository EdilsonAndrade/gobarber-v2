import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsReporitory extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentFound = await this.findOne({
      where: {
        date,
      },
    });

    return appointmentFound || null;
  }
}
export default AppointmentsReporitory;
