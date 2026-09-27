import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './app.controller';
import { db } from './db/db';
import { ordersTable } from './db/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('KITCHEN_SERVICE') private readonly kitchenClient: ClientProxy,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const [order] = await db
      .insert(ordersTable)
      .values({
        customerName: dto.customerName,
        item: dto.item,
        quantity: dto.quantity,
      })
      .returning();

    console.log(`Order saved to DB: ID ${order.id}`);

    this.kitchenClient.emit('order_created', {
      orderId: order.id,
      customerName: order.customerName,
      item: order.item,
      quantity: order.quantity,
    });

    console.log(`Event emmited to kitchen queue`);

    return { success: true, orderId: order.id };
  }
}
