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

    @Get('SearchOrderBuys/order/:id')
    SearchOrderBuys(@Param('id') id: string) {
      return this.cartService.SearchOrderBuys(id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.cartService.findOne(id);
    }


    @Get(':id/getAll')
    findAll(@Param('id') id: string) {
      return this.cartService.findAll(id);
    }
  
    @Post('/cart/search')
    findOneBy(@Body() data: any) {
      return this.cartService.findOneby(data);
    }
  
    @Post('user/:userId')
    createCart(@Body() data: CartDto,@Param('userId') userId: string,): any {
      return this.cartService.createCart(data,userId);
    }

    @Post('/fatora')
    Fatora(@Body() data: any): any {
      return this.cartService.Fatore(data);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateTransactionDto) {
      return this.cartService.update(id, updateRoleDto);
    }

    @Patch(':id/order/')
    addOrderToCart(@Param('id') id: string, @Body() addOrder: any) {
      return this.cartService.addOrderToCart(id, addOrder);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.cartService.delete(id);
    }

    @Delete('/order/:id')
    deleteItemFromCart(@Param('id') id: string) {
      return this.cartService.deleteItemFromCart(id);
    }

    @Post('/order/Buys/:id')
    Buys(@Param('id') id: string) {
      return this.cartService.Buys(id);
    }
}
