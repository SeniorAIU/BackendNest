import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionDto, UpdateTransactionDto } from 'src/transaction/dto/transaction.dto';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getcampaign() {
      return this.cartService.getCart();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.cartService.findOne(id);
    }
  
    @Post('/cart/search')
    findOneBy(@Body() data: any) {
      return this.cartService.findOneby(data);
    }
  
    @Post()
    createCart(@Body() data: CartDto): any {
      return this.cartService.createCart(data);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateTransactionDto) {
      return this.cartService.update(id, updateRoleDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.cartService.delete(id);
    }

    @Post('/order/Buys/:id')
    Buys(@Param('id') id: string) {
      return this.cartService.Buys(id);
    }
}
