import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface AppointmentDTO {
  provider: string;
  date: Date;
}
class AppointmentsReporitory {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public getAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentFound = this.appointments.find((x) =>
      isEqual(x.date, date)
    );

    return appointmentFound || null;
  }

  public create({ provider, date }: AppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}
export default AppointmentsReporitory;
