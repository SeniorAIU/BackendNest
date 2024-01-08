import { Inject, Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UpdateTransactionDto } from 'src/transaction/dto/transaction.dto';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {

    constructor(
        @Inject('CART_REPOSITORY')
        private CartRepository: Repository<Cart>, 
      ) {}
    
      async getCart() {
        const result = await this.CartRepository.find();
        return result;
      }
    
      async createCart(data: CartDto): Promise<any> {
        const user = await this.CartRepository.save(data);
        return user;
      }
    
      async findOne(id: string) {
        const result = await this.CartRepository.findOneBy({ id });
        console.log(result);
        return result;
      }
    
      findOneby(data: any) {
        return this.CartRepository.findBy(data);
      }
    
      update(id: string, updateTransactionDto: UpdateTransactionDto) {
        return this.CartRepository.update(id, updateTransactionDto);
      }
    
      delete(id: string) {
        return this.CartRepository.delete(id);
      }

      async Buys(id: string) {
        const cart = await this.CartRepository.findBy({ userId: id });
    
        // Create a dictionary to store the aggregated results based on orderId
        const aggregatedCart: { [key: string]: { amount: number, status: string } } = {};
    
        // Iterate through the original array and update the dictionary
        for (const item of cart) {
            const orderId = item.id;
    
            if (aggregatedCart[orderId]) {
                // If the orderId already exists in the dictionary, update the amount
                aggregatedCart[orderId].amount += item.amount;
            } else {
                // If the orderId doesn't exist, add a new entry
                aggregatedCart[orderId] = {
                    amount: item.amount,
                    status: item.status,
                };
            }
        }
    
        // Convert the dictionary values back to an array
        const aggregatedCartArray = Object.keys(aggregatedCart).map(orderId => ({
            orderId: orderId,
            amount: aggregatedCart[orderId].amount,
            status: aggregatedCart[orderId].status,
        }));
    
        return aggregatedCartArray;
    }
}
