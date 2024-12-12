import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
