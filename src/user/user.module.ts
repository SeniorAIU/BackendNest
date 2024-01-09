import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule,
    HttpModule.registerAsync({
      useFactory: async () => ({
        baseURL: "https://egate-t.fatora.me/api/",
      }),
    }),],
  providers: [...usersProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
