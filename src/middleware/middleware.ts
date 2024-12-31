import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		res.setHeader('Access-Control-Allow-Credentials', 'true')
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, DELETE, OPTIONS',
		)
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Credentials, Access-Control-Allow-Credentials, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Content-Type, Origin, X-Requested-With, Accept, Authorization',
		)

		// const a = res.getHeader('Access-Control-Allow-Headers')
		// console.log('NestMiddleware', a)
		next()
	}
}
