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
import { NeedyModule } from './needy/needy.module';
import { TransactionModule } from './transaction/transaction.module';
import { OppertunityModule } from './oppertunity/oppertunity.module';
import { CommentsModule } from './comment/comment.module';
import { AdverImageModule } from './adver-image/adver-image.module';
import { AuthModule } from './auth/auth.module';

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
    NeedyModule,
    TransactionModule,
    OppertunityModule,
    CommentsModule,
    AdverImageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
