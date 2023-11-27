import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'donate',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const configuration = async () => {
  return {
    DATABASE_CONNECTION: {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'donate',
    },
  };
};
