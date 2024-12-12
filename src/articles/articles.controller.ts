import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Post()
	create(@Body() createArticleDto: CreateArticleDto) {
		return this.articlesService.create(createArticleDto)
	}

	@Get()
	findAll() {
		return this.articlesService.findAll()
	}

	@Delete(':id')
	remove(createArticleDto: Pick<CreateArticleDto, 'id'>) {
		return this.articlesService.remove(createArticleDto.id)
	}
}
