import { Injectable } from '@nestjs/common'
import { CreatePraiseDto } from './dto/create-praise.dto'
import { UpdatePraiseDto } from './dto/update-praise.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class PraiseService {
	constructor(private readonly prisma: PrismaService) {}
	create(createProductDto: CreatePraiseDto) {
		return this.prisma.praise.create({
			data: createProductDto,
		})
	}

	findAll() {
		return this.prisma.categories.findMany()
	}

	remove(id: string) {
		return this.prisma.categories.delete({
			where: { id },
		})
	}
}
