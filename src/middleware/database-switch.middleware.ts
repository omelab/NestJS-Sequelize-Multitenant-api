import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class DatabaseSwitchMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the database name from the request header
    const databaseName = req.headers['x-tenant'];

    // Check if the database name is provided in the header
    if (!databaseName) {
      return res
        .status(400)
        .json({ error: 'Database name not provided in the header' });
    }
    try {
      // Create a new Sequelize instance for the specified database
      const sequelize: Sequelize = new Sequelize({
        dialect: 'postgres',
        username: 'abubakar',
        password: '3458',
        database: databaseName.toString(),
        host: 'localhost',
        models: [User],
      });

      // Test the connection to the new database
      await sequelize.authenticate();

      //sync the database
      await sequelize.sync();

      req['sequelize'] = sequelize; // Attach the Sequelize instance to the request
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Failed to switch the database connection' });
    }
  }
}
