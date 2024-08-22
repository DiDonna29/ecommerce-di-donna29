import { User } from './entities/user.entity';

export class UsersRepository {
  private user: User[] = [];

  findAll(): User[] {
    return this.user;
  }

  save(newUser: User): void {
    this.user.push(newUser);
  }
}
