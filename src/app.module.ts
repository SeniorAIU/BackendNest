import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig, configuration } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CampaignModule } from './campaign/campaign.module';
import { OrderModule } from './order/order.module';
import { OrgModule } from './org/org.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    CampaignModule,
    OrderModule,
    OrgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
