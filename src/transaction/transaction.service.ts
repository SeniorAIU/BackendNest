import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { TransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { Campaign } from 'src/campaign/entities/compaign.entity';
import { User } from 'src/user/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { map } from 'rxjs/operators';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class TransactionService {
  constructor(
    private httpService: HttpService,
    @Inject('ORDER_REPOSITORY')
    private orderReopsitory: Repository<Order>,
    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<Cart>,
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaginRepository: Repository<Campaign>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async updadteCampaignStatuses() {
    const transaction = await this.transactionRepository.find();
    for (let i = 0; i < transaction.length; i++) {
      const result = await this.Fatore(transaction[i].paymentId)
      if (result.Data.status == "A" && transaction[i].status == "Pending") {
        console.log(1)
        if (transaction[i].campId) {
          transaction[i].status = "Approved"
          const campId = transaction[i].campId
          const userId = transaction[i].userId
          const campaign = await this.campaginRepository.findOneBy({ id: campId })
          const user = await this.userRepository.findOneBy({ id: userId })
          campaign.amount = campaign.amount + transaction[i].amount
          user.amountDonate = user.amountDonate + transaction[i].amount;
          await this.campaginRepository.save(campaign)
          await this.userRepository.save(user)
          await this.transactionRepository.save(transaction[i])
        }
        if(transaction[i].cartId){
          transaction[i].status = "Approved"
          await this.transactionRepository.save(transaction[i])
          const cartId = transaction[i].cartId
          const userId = transaction[i].userId
          await this.transactionRepository.save(transaction[i])
          const cart = await this.cartRepository.findOneBy({id:cartId})
          for (let i = 0; i < cart.orders.length; i++) {
            console.log("order")
            console.log(cart.orders[i])
            const order = await this.orderReopsitory.findOneBy({ id: cart.orders[i].id })
            order.Buys = order.Buys + cart.orders[i].amount
            await this.orderReopsitory.save(order)
          }
          console.log('transaction[i]')
          console.log(transaction[i])
          const user = await this.userRepository.findOneBy({id:userId})
          user.amountDonate = user.amountDonate + transaction[i].amount
          await this.userRepository.save(user)
          cart.status = "Approved"
          await this.cartRepository.save(cart)
        }
      }
    }
  }

  async getTransaction() {
    const result = await this.transactionRepository.find();
    return result;
  }

  async createTransaction(data: TransactionDto) {
    const campId = data.campId
    const usreId = data.userId
    const cartId = data.cartId
    const user = await this.userRepository.findOneBy({ id: usreId })
    if (campId) {
      const campaign = await this.campaginRepository.findOneBy({ id: campId })
      if (!campaign) {
        return { message: "campaign id not exist", status: 500 }
      }
      if ((campaign.amount + data.amount) > campaign.target) {
        return { message: "you can`t donate above campaign target", status: 500 }
      }
      const result = await this.transactionRepository.save(data);
      return result;
    }
    if (cartId) {
      const transaction = await this.transactionRepository.save(data);
      return { data: transaction, status: 200 }

    }
    // return campaign
  }

  async findOne(id: string) {
    const result = await this.transactionRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.transactionRepository.findBy(data);
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, updateTransactionDto);
  }

  delete(id: string) {
    return this.transactionRepository.delete(id);
  }
  async Fatore(payId: any) {
    const apiUrl = `get-payment-status/${payId}`;

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
    const mergedHeaders = { ...headers };

    // Make the HTTP request
    const response = await this.httpService
      .get(apiUrl, { headers: mergedHeaders })
      .pipe(map((res) => res.data))
      .toPromise();

    return response;
  }
}
