import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Request, Response } from 'express'
import { JwtAuthGuardRf } from '../guards/rfTokenStrategy/jwt.guard'
import { GoogleAuthGuard } from '../guards/google-strategy/google.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(
		@Body() createAuthDto: CreateAuthDto,
		@Res({ passthrough: true }) res: Response,
		@Req() req: Request,
	) {
		// console.log(await req.cookies['rf_token'], 'its rf token')
		return await this.authService.login(createAuthDto, res)
	}
	@Post('register')
	async register(
		@Body() createAuthDto: CreateAuthDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.register(createAuthDto, res)
	}

	@UseGuards(JwtAuthGuardRf)
	@Post('logout')
	async logout(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.logout(req, res)
	}

	@UseGuards(JwtAuthGuardRf)
	@Post('refresh_token')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.refresh(req, res)
	}

	@UseGuards(GoogleAuthGuard)
	@Get('google')
	google(@Req() req: Request) {}
	@UseGuards(GoogleAuthGuard)
	@Get('google/callback')
	async googleCallback(
		@Req()
		req: Request<{
			email: string
			name: string
			picture?: string
		}>,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.googleLogin(req, res)
	}
}
