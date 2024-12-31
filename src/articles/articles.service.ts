import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class ArticlesService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createArticleDto: CreateArticleDto) {
		return await this.prisma.articles.create({
			data: createArticleDto,
		})
	}

	async findAll(offset: number) {
		const offsetData = await this.prisma.articles.findMany()
		if(!offsetData || offsetData===null || offsetData===undefined) throw new NotFoundException(`your articles is not found`)
		const data=offsetData.slice(0,offset)
		return data
	}

	async remove(id: string | undefined) {
		if (id === undefined)
			throw new NotFoundException('not found article id')
		return await this.prisma.articles.delete({
			where: { id },
		})
	}
}
