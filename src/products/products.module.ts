import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
