import { parseISO } from "date-fns";
import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

class AppointmentController {

  async listingAppointments(request: Request, response: Response) {

    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentRepository.find();

    return response.json(appointments);
  };

  async createAppointments(request: Request, response: Response) {
    try {
      const { providerId, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parsedDate,
        providerId,
      })

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }
}

export default AppointmentController;
