import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '../prismaControl/prisma.service'

@Injectable()
export class ArticlesService {
	constructor(private readonly prisma: PrismaService) {}
	create(createArticleDto: CreateArticleDto) {
		return this.prisma.articles.create({
			data:createArticleDto
		})
	}

	findAll() {
		return this.prisma.articles
	}

	findOne(id: number) {
		return this.prisma.articles
	}

	update(id: number, updateArticleDto: UpdateArticleDto) {
		return this.prisma.articles
	}

	remove(id: number) {
		return this.prisma.articles
	}
}
