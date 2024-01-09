import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { cartProviders } from './cart.provider';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule,
    HttpModule.registerAsync({
      useFactory: async () => ({
        baseURL: "https://egate-t.fatora.me/api/",
      }),
    }),],
  controllers: [CartController],
  providers: [...cartProviders, CartService]
})
export class CartModule {}
