import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'task-management',
  password: 'task-management',
  database: 'task-management',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: true,
  // when synchronize: true don`t work with postres 12, so i have switched to 11.6
  synchronize: true
};