import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Request, Response } from 'express'
import { JwtAuthGuard } from '../guards/accTokenStrategy/jwt.guard'
import { JwtAuthGuardRf } from '../guards/rfTokenStrategy/jwt.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(
		@Body() createAuthDto: CreateAuthDto,
		@Res({ passthrough: true }) res: Response,
		@Req() req: Request,
	) {
		console.log(await req.cookies['rf_token'], 'its rf token')
		return this.authService.login(createAuthDto, res)
	}
	@Post('register')
	async register(
		@Body() createAuthDto: CreateAuthDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.authService.register(createAuthDto, res)
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res)
	}

	@UseGuards(JwtAuthGuardRf)
	@Post('refresh_token')
	refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.refresh(req, res)
	}
}
