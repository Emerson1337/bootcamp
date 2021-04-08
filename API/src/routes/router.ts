import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import express from 'express';

import AddAvatarToUserController from '../controllers/AddAvatarToUserController';
import AppointmentController from '../controllers/AppointmentController';
import CreateUsersControllers from '../controllers/CreateUsersController';
import SessionController from '../controllers/SessionController';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

const appointmentController = new AppointmentController();
const createUsersControllers = new CreateUsersControllers();
const sessionController = new SessionController();
const addAvatarToUserController = new AddAvatarToUserController();
const routes = Router();

const upload = multer(uploadConfig);


//ROTAS GET
routes.get('/appointments', EnsureAuthenticated, appointmentController.listingAppointments);
routes.get('/files', express.static(uploadConfig.directory));

//ROTAS POST
routes.post('/appointments', appointmentController.createAppointments);
routes.post('/user', createUsersControllers.createUser);
routes.post('/session', sessionController.createSession);

//ROTAS PATCH
routes.patch('/user/avatar', EnsureAuthenticated, upload.single('avatar'), addAvatarToUserController.add);



export default routes;
