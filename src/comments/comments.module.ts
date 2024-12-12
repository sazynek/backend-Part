import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { UserModule } from '../user/user.module'
import { PrismaModule } from '../prismaControl/prisma.module'

@Module({
	imports: [UserModule, PrismaModule],
	controllers: [CommentsController],
	providers: [CommentsService],
})
export class CommentsModule {}
