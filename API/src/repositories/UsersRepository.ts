import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User>{
  private users: User[];

  public async findUserAuth(email: string, password: string): Promise<User | null> {
    const user = await this.findOne({
      where: { email, password },
    })

    return user || null;
  }
}

export default UsersRepository;
