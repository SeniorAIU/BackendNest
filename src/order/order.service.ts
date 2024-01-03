import { Inject, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}

  getOrder(): any {
    return this.orderRepository.find();
  }

  async createOrder(data: OrderDto): Promise<any> {
    const user = await this.orderRepository.save(data);
    return user;
  }

  findOne(id: string) {
    return this.orderRepository.findOneBy({ id });
  }

  findOneby(data: any) {
    return this.orderRepository.findBy(data);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  delete(id: string) {
    return this.orderRepository.delete(id);
  }

  async findAllSortedByColumn(data: any) {
    return this.orderRepository.find({
      order: {
        [data.column]: data.sort,
      },
    });
  }
}
