import { Module } from '@nestjs/common'
import { ProductCollectionsService } from './product-collections.service'
import { ProductCollectionsController } from './product-collections.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [ProductCollectionsController],
	providers: [ProductCollectionsService],
})
export class ProductCollectionsModule {}
