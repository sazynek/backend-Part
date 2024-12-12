import { Module } from '@nestjs/common'
import { PraiseService } from './praise.service'
import { PraiseController } from './praise.controller'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [PraiseController],
	providers: [PraiseService],
})
export class PraiseModule {}
