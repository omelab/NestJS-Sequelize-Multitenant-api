import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { DatabaseConnectionService } from 'src/middleware/database-connection.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, DatabaseConnectionService],
  exports: [UsersService],
})
export class UsersModule {}
