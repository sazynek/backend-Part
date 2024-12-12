import { Module } from '@nestjs/common'
import { ArticlesService } from './articles.service'
import { ArticlesController } from './articles.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [ArticlesController],
	providers: [ArticlesService],
})
export class ArticlesModule {}
