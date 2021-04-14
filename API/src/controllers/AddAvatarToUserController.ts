import { Request, Response } from "express";
import UpdateAvatarFileNameService from "../services/UpdateAvatarFileNameService";


class AddAvatarToUserController {
  async add(request: Request, response: Response) {
    const updateAvatarFileNameService = new UpdateAvatarFileNameService();

    const id_user = request.user.id;
    const avatarFilename = request.file.filename;

    const user = await updateAvatarFileNameService.execute({ id_user, avatarFilename });
    return response.json(user);
  }
}

export default AddAvatarToUserController;
