import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { CreateUserGoogleDto } from '../user/dto/create-user-google.dto.'
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
	async registerGoogleWithoutPassword(
		createUserDto: CreateUserGoogleDto,
		res: Response,
	) {
		const userCheck = await this.user.existUser(createUserDto)
		if (userCheck) {
			const resultUser = await this.user.update(
				userCheck.id,
				createUserDto,
			)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...user } = resultUser
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { acc_token, rf_token } =
				await this.generateTokens(resultUser)
			this.setRfToCookies(res, rf_token)
			return { ...user, acc_token }
		} else {
			const resultUser = await this.user.createFromGoogle(createUserDto)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...user } = resultUser
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { acc_token, rf_token } =
				await this.generateTokens(resultUser)
			this.setRfToCookies(res, rf_token)
			return { ...user, acc_token }
		}
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
	async googleLogin(
		req: Request<{
			email: string
			name: string
			picture?: string
		}>,
		res: Response,
	) {
		// console.log(req.user)

		if (!req.user) {
			throw new UnauthorizedException('No user from google auth')
		}
		try {
			const { acc_token } = await this.registerGoogleWithoutPassword(
				//@ts-ignore
				{ email: req.user.email, name: req.user.name },
				res,
			)
			if (acc_token) res.redirect('http://localhost:3000/home')
			else res.redirect('http://localhost:3000/login')
		} catch (e) {
			throw new UnauthorizedException('No user from google auth', {
				cause: e,
			})
		}
	}

	private async generateTokens(payload: CreateAuthDto | any) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = payload as CreateAuthDto
		const tokens = [
			{
				rf_token: await this.jwt.signAsync(rest, {
					expiresIn: 60 * 60,
				}),
			},
			{ acc_token: await this.jwt.signAsync(rest, { expiresIn: 60 }) },
		]
		const result = { ...tokens[1], ...tokens[0] }
		return result
	}

	private async eraseToken(req?: Request, res?: Response) {
		const time = new Date()

		res?.cookie(RF_TOKEN, '', {
			httpOnly: true,
			expires: time,
			secure: true,
			sameSite: true,
			partitioned: true,
			priority: 'high',
		})
	}

	private setRfToCookies(res: Response, rf_token: string | undefined) {
		const time = this.DateFunc()

		if (rf_token === undefined || rf_token === null)
			throw new UnauthorizedException('rf_token is not defined')
		res.cookie(RF_TOKEN, rf_token, {
			httpOnly: true,
			expires: time,
			secure: true,
			sameSite: true,
			partitioned: true,
			priority: 'high',
		})
	}
	private DateFunc() {
		const myDate = new Date(2050, 2, 3, 5, 1, 3, 4)
		return myDate
	}
}
