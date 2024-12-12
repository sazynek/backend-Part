import { CreateArticleDto } from './../articles/dto/create-article.dto'
import { JwtAuthGuard } from './../guards/accTokenStrategy/jwt.guard'
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { Request } from 'express'

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Req() req: Request, createCommentDto: CreateCommentDto) {
		return this.commentsService.create(req, createCommentDto)
	}

	@Get()
	findAll() {
		return this.commentsService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Delete()
	remove(@Req() req: Request) {
		return this.commentsService.remove(req)
	}
}
