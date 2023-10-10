import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class DatabaseConnectionService {
  private connections: { [key: string]: Sequelize } = {};

  getOrCreateConnection(connectionName: string): Sequelize {
    if (!this.connections[connectionName]) {
      this.connections[connectionName] = new Sequelize({
        dialect: 'postgres',
        username: 'abubakar',
        password: '3458',
        host: 'localhost',
        port: 5432,
        database: connectionName,
        models: [User],
      });
    }
    return this.connections[connectionName];
  }
}
