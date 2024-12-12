import { Module } from '@nestjs/common'
import { StatusProductService } from './status-product.service'
import { StatusProductController } from './status-product.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [StatusProductController],
	providers: [StatusProductService],
})
export class StatusProductModule {}
