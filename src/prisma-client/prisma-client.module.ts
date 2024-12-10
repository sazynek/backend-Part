import { Module } from '@nestjs/common'
import { PrismaClientService } from './prisma-client.service'

@Module({
	imports: [PrismaClientService],
	exports: [PrismaClientService],
})
export class PrismaClientModule {}
