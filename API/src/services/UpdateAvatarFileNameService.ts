import { getRepository } from "typeorm";
import User from "../models/User";
import path from "path";
import fs from 'fs';

import uploadConfig from "../config/upload";
import AppError from "../errors/AppErrors";

interface Request {
  id_user: string,
  avatarFilename: string,
}

class UpdateAvatarFileNameService {

  async execute({ id_user, avatarFilename }: Request): Promise<User> {

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      id: id_user,
    })

    if (!user) {
      throw new AppError('Only users authenticated can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }

}

export default UpdateAvatarFileNameService;
