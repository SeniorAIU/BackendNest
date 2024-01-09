import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartDto, UpdateCartDto } from './dto/cart.dto';
import { Order } from 'src/order/entities/order.entity';
import { map } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class CartService {

  constructor(
    private httpService: HttpService,
    @Inject('CART_REPOSITORY')
    private CartRepository: Repository<Cart>,
    @Inject('ORDER_REPOSITORY')
    private orderReopsitory: Repository<Order>,
    @Inject('USER_REPOSITORY')
    private userReopsitory: Repository<User>,
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,

  ) { }

  async getCart() {
    const result = await this.CartRepository.find();
    return result;
  }

  async createCart(data: CartDto): Promise<any> {
    const cart = await this.CartRepository.findOneBy({ userId: data.userId });
    
    if(cart.status == "Approved"){
      const cartData = await this.CartRepository.save(data);
      return { data: cartData, message: "New Cart", status: 200 };
    }
    if (!cart) {
      const cartData = await this.CartRepository.save(data);
      return { data: cartData, message: "New Cart", status: 200 };
    }  
    const orderData = {
      id: data.orders[0].id,
      amount: data.orders[0].amount,
    };
    for (let i = 0; i < cart.orders.length; i++) {
      if(cart.orders[i].id == data.orders[0].id){
        cart.orders[i].amount = cart.orders[i].amount + data.orders[0].amount
        cart.amount = cart.amount + data.orders[0].amount
        await this.CartRepository.save(cart);
        return {message: "Order is exist and i will add quantity", data:cart}
      }
    }
    cart.amount = cart.amount + data.orders.amount
    cart.orders.push(orderData);
    const updatedCart = await this.CartRepository.save(cart);
  
    return { data: updatedCart, message: "Cart updated with new order", status: 200 };
  }

  async findOne(id: string) {
    const cart = await this.CartRepository.findBy({ userId: id, status:"Pending" });
    return cart;
  }

  async findAll(id: string) {
    const cart = await this.CartRepository.findBy({ userId: id });
    return cart;
  }

  findOneby(data: any) {
    return this.CartRepository.findBy(data);
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.CartRepository.update(id, updateCartDto);
  }

  delete(id: string) {
    return this.CartRepository.delete(id);
  }

  deleteItemFromCart(orderId: string) {
    // return this.CartRepository.delete({ orderId });
  }

  async Buys(id: any) {
    const cart = await this.CartRepository.findOneBy({ userId: id, status: "Pending" });
    if (!cart) {
      return { message: 'You don`t have item in this cart', status: 500 }
    }
    let totalAmount = 0
    for (let i = 0; i < cart.orders.length; i++) {
      const order = await this.orderReopsitory.findOneBy({ id: cart.orders[i].id })
      if ((cart.orders[i].amount + order.Buys) >= order.amount) {
        return { message: `ERROR: Big Quantity in this order ${cart.orders[i].id}` }
      }
      totalAmount = totalAmount + cart.orders[i].amount * order.price;
    }
    const data = {
      "lang": "en",
      "terminalId": "14740050",
      "amount": totalAmount
    }
    const result = await this.Fatore(data)
    console.log(result)
    if (result.ErrorMessage == "Success") {
      for (let i = 0; i < cart.orders.length; i++) {
        const order = await this.orderReopsitory.findOneBy({ id: cart.orders[i].id })
        order.Buys = order.Buys + cart.orders[i].amount
        await this.orderReopsitory.save(order)
        const user = await this.userReopsitory.findOneBy({id})
        user.amountDonate = user.amountDonate + totalAmount
        await this.userReopsitory.save(user)
        const cartId = cart.id
        const transactionData = {
          "amount": totalAmount,
          "date": "2023-10-01 00:00:00",
          "userId": id,
          "cartId":cartId,
          "paymentId":result.Data.paymentId,
          "status":"Pending"
        }
        console.log(transactionData)
        await this.transactionRepository.save(transactionData)
        await this.update(cartId,{status: "Approved"})
      }
    }
    else {
      return "Error"
    }

    return result;
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
  // }
}
