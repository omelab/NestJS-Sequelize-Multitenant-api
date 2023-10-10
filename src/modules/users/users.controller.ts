import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTenantHeader } from 'src/middleware/tenant.decorator';
import { Request } from 'express';
// import { QueryTypes, Sequelize } from 'sequelize';
import { DatabaseConnectionService } from 'src/middleware/database-connection.service';

@Controller('users')
@ApiTags('User Management')
@SwaggerTenantHeader()
export class UsersController {
  constructor(
    private readonly dbConnectionService: DatabaseConnectionService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    // Access the Sequelize instance from the request

    /** Middleware approach */
    const sequelize = req['sequelize'];
    return await sequelize.models.User.findAll();

    // return await sequelize.query('SELECT * FROM users', {
    //   type: QueryTypes.SELECT,
    // });

    /* default database connection model */
    //return this.usersService.findAll();

    /* service approach */
    // const connectionName = req.headers['x-tenant'];
    // const sequelize: Sequelize = this.dbConnectionService.getOrCreateConnection(
    //   connectionName.toString(),
    // );
    // return = await sequelize.models.User.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
