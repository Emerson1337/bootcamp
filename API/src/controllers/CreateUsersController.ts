import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class CreateUsersControllers {
  async createUser(request: Request, response: Response) {

    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    })

    //delete user.password;
    return response.status(200).json(user);
  }
}
export default CreateUsersControllers;
