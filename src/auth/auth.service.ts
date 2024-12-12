import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
const RF_TOKEN = 'rf_token'
@Injectable()
export class AuthService {
	constructor(
		private readonly user: UserService,
		private readonly jwt: JwtService,
	) {}

	async login(createUserDto: CreateAuthDto, res: Response) {
		const resultUser = await this.user.existUser(createUserDto)
		if (!resultUser || resultUser === null || resultUser === undefined)
			throw new UnauthorizedException('user is not login in account')
		const { password, ...user } = resultUser as CreateAuthDto
		const { acc_token, rf_token } = await this.generateTokens(resultUser)
		this.setRfToCookies(res, rf_token)
		return { ...user, acc_token }
	}

	async register(createUserDto: CreateAuthDto, res: Response) {
		const userCheck = await this.user.existUser(createUserDto)
		if (userCheck) throw new UnauthorizedException('user is has account')
		const resultUser = await this.user.create(createUserDto)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = resultUser
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { acc_token, rf_token } = await this.generateTokens(resultUser)
		this.setRfToCookies(res, rf_token)
		return { ...user, acc_token }
	}

	async logout(req: Request, res?: Response) {
		const { id } = req.user! as any
		// console.log(id)
		this.eraseToken(req, res)
		return await this.user.remove(id)
	}

	async refresh(req: Request, res: Response) {
		const { id } = req.user! as any
		const user = await this.user.findOne(id)
		if (!user || user === undefined || user === null)
			throw new UnauthorizedException('user is not login in account')
		const { acc_token, rf_token } = await this.generateTokens(user)
		this.setRfToCookies(res, rf_token)
		return { ...user, acc_token }
	}

	private async generateTokens(payload: CreateAuthDto | any) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = payload as CreateAuthDto
		const tokens = [
			{ rf_token: await this.jwt.signAsync(rest, { expiresIn: '60s' }) },
			{ acc_token: await this.jwt.signAsync(rest, { expiresIn: '1m' }) },
		]
		const result = { ...tokens[1], ...tokens[0] }
		return result
	}

	private async eraseToken(req?: Request, res?: Response) {
		res?.cookie(RF_TOKEN, '', { httpOnly: false })
	}

	private setRfToCookies(res: Response, rf_token: string | undefined) {
		if (rf_token === undefined || rf_token === null)
			throw new UnauthorizedException('rf_token is not defined')
		res.cookie(RF_TOKEN, rf_token, { httpOnly: true })
	}

	// private TakeTokenFromCookies(req: Request) {
	// 	let rfTokenFromCookies: string = ''
	// 	if (req.headers.cookie !== undefined || req.headers.cookie === null)
	// 		rfTokenFromCookies = req.headers.cookie
	// 	const [nameToken, rfTokenFromCookiesResult] = rfTokenFromCookies.split(
	// 		'=',
	// 		2,
	// 	)
	// 	return { nameToken, rfTokenFromCookiesResult }
	// }
}
