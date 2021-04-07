import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment';
import User from '../models/User';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already blocked');
    }

    const appointment = appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
