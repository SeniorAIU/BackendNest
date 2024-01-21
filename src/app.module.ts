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
import { CartModule } from './cart/cart.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    MulterModule.register({
      dest: './uploads', // specify the upload directory
  }),
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
    CartModule,
    VolunteerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
