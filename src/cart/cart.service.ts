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
}
