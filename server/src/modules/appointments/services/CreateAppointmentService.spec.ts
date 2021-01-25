import CreateAppointmentService from './CreateAppointmentService';
import AppointmentRepositoryFake from '@modules/appointments/repositories/AppointmentsRepositoryFake';
import AppError from '@shared/error/AppError';

describe("Appointment",()=>{
  it('should return a create appointment', async ()=>{
      const fakeAppointmentRepository = new AppointmentRepositoryFake();
      const createAppointmentServices = new CreateAppointmentService(fakeAppointmentRepository);

      const appointment = await createAppointmentServices.execute({
        date:new Date(),
        provider_id:'4564654'
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toEqual('4564654');

  });

  it('should not allow to create two appointsments at the same date', async ()=>{
    const fakeAppointmentRepository = new AppointmentRepositoryFake();
    const createAppointmentServices = new CreateAppointmentService(fakeAppointmentRepository);

    const date = new Date(2020,1,1, 11,0,0);
    const appointment = await createAppointmentServices.execute({
      date:date,
      provider_id:'4564654'
    });

    expect(createAppointmentServices.execute({
      date:date,
      provider_id:'4564654'
    })).rejects.toBeInstanceOf(AppError);

  })
})
