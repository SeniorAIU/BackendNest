import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Campaign } from 'src/campaign/entities/compaign.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as dotenv from 'dotenv';
dotenv.config();

export type Userd = any;

@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaingRepository: Repository<Campaign>,
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>, 
  ) {}
  private poolData = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
  };
  private userPool = new CognitoUserPool(this.poolData);

  getUsers(): any {
    return this.userRepository.find();
  }

  verifyEmail(email: string , code: string): any {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };
    console.log(userData)
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err.message || 'Error verifying email');
        } else {
          resolve('Email verified successfully');
          return this.userRepository.update({email:email}, {status:"Approved"});
        }
      });
    })
    // return this.userRepository.find();
  }

  async createUsers(data: UserDto): Promise<any> {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: data.email }),
      new CognitoUserAttribute({ Name: 'name', Value: data.name }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: data.phoneNumber }),
      new CognitoUserAttribute({ Name: 'address', Value: data.address }),
    ];
    const username = data.email
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, data.password, attributeList, null, async (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.user);
          await this.userRepository.save(data);
        }
      });
    });
    // const user = await this.userRepository.save(data);
    // return user;
  }

  findOneby(data: any) {
    return this.userRepository.findBy(data);
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findOnes(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  update(id: string, updateRoleDto: UserDto) {
    return this.userRepository.update(id, updateRoleDto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  async findAllSortedByColumn(data: any) {
    return this.userRepository.find({
      order: {
        [data.column]: data.sort,
      },
    });
  }

  async donation(id: string, campid: string, data:any){
    const user =  await this.userRepository.findOneBy({id})
    const campaign = await this.campaingRepository.findOneBy({id:campid})
    // if((campaign.target - campaign.donation) == 0 ){
    //   campaign.status = "approved"
    //   await this.campaingRepository.save(campaign)
    //   return{message:"You on Target amount ", status:500}
    // }
    const amountDonate = data.amount
    const amountDonation = parseInt(amountDonate, 10);
    if(!user || !campaign){
      return{message:"Error Data", status:500}
    }
    const transaction = await this.transactionRepository.findOneBy({status:"Pending", userId:id, cartId:IsNull()})
    if(transaction){
      console.log(transaction)
      return{message:"You have Transaction not Approved ", status:500}
    }
    if(campaign.target < (campaign.donation + amountDonation)){
      return{message:`You amount Above the Campaign Target, Donation still: ${campaign.target - campaign.donation}`, status:500}
    }
    const dataFatora = {
      "lang": "en",
      "terminalId": "14740050",
      "amount": data.amount
    }
    const result = await this.Fatore(dataFatora)
    if(result.ErrorMessage == "Success"){
      const transactionData = {
        "amount": data.amount,
        "date": "2023-10-01 00:00:00",
        "userId": id,
        "paymentId":result.Data.paymentId,
        "status":"Pending",
        "campId":campid
      }
      await this.transactionRepository.save(transactionData)
      if((campaign.target - campaign.donation) == 0 ){
        campaign.status = "Approved"
        await this.campaingRepository.save(campaign)
      }

    }
    return result
  }


  async Fatore(data: any) {
    const apiUrl = 'create-payment';

    // Add Basic Authentication credentials
    const username = 'donate';
    const password = 'donate@123';
    const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    // Headers with Basic Authentication
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    };

    // Merge additional headers from the request data, if needed
    const mergedHeaders = { ...headers, ...data.headers };

    // Make the HTTP request
    const response = await this.httpService
      .post(apiUrl, data, { headers: mergedHeaders })
      .pipe(map((res) => res.data))
      .toPromise();

    return response;
  }

}
