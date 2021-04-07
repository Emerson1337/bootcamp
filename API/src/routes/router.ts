import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';
import CreateUsersControllers from '../controllers/CreateUsersController';
import SessionController from '../controllers/SessionController';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

const appointmentController = new AppointmentController();
const createUsersControllers = new CreateUsersControllers();
const sessionController = new SessionController();
const routes = Router();



//ROTAS GET
routes.get('/appointments', EnsureAuthenticated, appointmentController.listingAppointments);

//ROTAS POST
routes.post('/appointments', appointmentController.createAppointments);
routes.post('/user', createUsersControllers.createUser);
routes.post('/session', sessionController.createSession);





export default routes;
