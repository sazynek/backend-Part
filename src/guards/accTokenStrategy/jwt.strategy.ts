import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

interface IJwt {
	id?: string
	email?: string
	name?: string
	supportComment?: string
	updatedAt?: string
	createdAt?: string
	iat: string
	exp: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.ExtractJwtFromCookies,
			]),
			secretOrKey: process.env.JWT_SECRET,
		})
	}
	static ExtractJwtFromCookies(req: Request) {
		if (req.cookies['acc_token']) return req.cookies['acc_token']
		else throw new UnauthorizedException("you don't have acc_token")
	}
	async validate(payload: IJwt) {
		return payload
	}
}
