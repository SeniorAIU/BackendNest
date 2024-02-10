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

  async createCart(data: CartDto, userId: string): Promise<any> {
    const cart = await this.CartRepository.findOneBy({ userId: userId, status: "Pending" });
    console.log(cart)
    if (!cart) {
      const order = await this.orderReopsitory.findOneBy({ id: data.orders[0].id })

      const CartData = {
        userId,
        orders: data.orders,
        amount: data.orders[0].amount,
        totalPrice: order.price * data.orders[0].amount
      }
      const cartData = await this.CartRepository.save(CartData);
      return { data: cartData, message: "New Cart", status: 200 };
    }
    const orderData = {
      id: data.orders[0].id,
      amount: data.orders[0].amount,
    };
    const order = await this.orderReopsitory.findOneBy({ id: data.orders[0].id })
    for (let i = 0; i < cart.orders.length; i++) {
      if (cart.orders[i].id == data.orders[0].id) {
        cart.totalPrice = cart.totalPrice + (order.price * data.orders[0].amount)
        cart.orders[i].amount = cart.orders[i].amount + data.orders[0].amount
        cart.amount = cart.amount + data.orders[0].amount
        await this.CartRepository.save(cart);
        return { message: "Order is exist and i will add quantity", data: cart }
      }
    }
    cart.totalPrice = cart.totalPrice + (order.price * data.orders[0].amount)
    cart.amount = cart.amount + data.orders[0].amount
    cart.orders.push(orderData);
    const updatedCart = await this.CartRepository.save(cart);
    return { data: updatedCart, message: "Cart updated with new order", status: 200 };
  }

  async findOne(id: string) {
    const cart = await this.CartRepository.findBy({ userId: id, status: "Pending" });
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

  async addOrderToCart(id: string, orderData: any) {
    const cart = await this.CartRepository.findOneBy({ id });
    console.log(cart)
    const data = {
      "id": orderData.id,
      "amount": orderData.amount
    }
    const order = await this.orderReopsitory.findOneBy({ id: orderData.id })
    if ((orderData.amount + order.Buys) > order.amount) {
      return { message: `ERROR: Big Quantity in this order ${order.amount - order.Buys}` }
    }
    // order.Buys = order.Buys + orderData.amount
    cart.orders.push(data)
    await this.CartRepository.save(cart)
    await this.orderReopsitory.save(order)

    // return this.CartRepository.update(id, orderAmoujnt);
  }

  delete(id: string) {
    return this.CartRepository.delete(id);
  }

  async SearchOrderBuys(id: string) {
    const cart = await this.CartRepository.find();
    const arr = [];
    const promises = cart.map(async (cartItem) => {
      await Promise.all(cartItem.orders.map(async (order) => {
        if (order.id === id) {
          arr.push({ userId: cartItem.userId, amount: order.amount });
        }
      }));
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return arr;
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
    if (result.ErrorMessage == "Success") {
      for (let i = 0; i < cart.orders.length; i++) {
        // const order = await this.orderReopsitory.findOneBy({ id: cart.orders[i].id })
        // order.Buys = order.Buys + cart.orders[i].amount
        // await this.orderReopsitory.save(order)
        // const user = await this.userReopsitory.findOneBy({id})
        // user.amountDonate = user.amountDonate + totalAmount
        // await this.userReopsitory.save(user)
        const cartId = cart.id
        const transactionData = {
          "amount": totalAmount,
          "date": "2023-10-01 00:00:00",
          "userId": id,
          "cartId": cartId,
          "paymentId": result.Data.paymentId,
          "status": "Pending"
        }
        console.log(transactionData)
        await this.transactionRepository.save(transactionData)
        // await this.update(cartId,{status: "Approved"})
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
}
