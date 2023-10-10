import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<any> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<[number]> {
    return this.userModel.update(user, {
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userModel.destroy({
      where: { id },
    });
  }
}
