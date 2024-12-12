import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class ArticlesService {
	constructor(private readonly prisma: PrismaService) {}
	create(createArticleDto: CreateArticleDto) {
		return this.prisma.articles.create({
			data: createArticleDto,
		})
	}

	findAll() {
		return this.prisma.articles.findMany()
	}

	remove(id: string | undefined) {
		if (id === undefined)
			throw new NotFoundException('not found article id')
		return this.prisma.articles.delete({
			where: { id },
		})
	}
}
