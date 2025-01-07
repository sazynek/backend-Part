import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

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
export class JwtStrategyRf extends PassportStrategy(Strategy, 'rf-jwt') {
	constructor(public jwt: JwtService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategyRf.ExtractJwtFromCookies,
			]),
			secretOrKey: process.env.JWT_SECRET,
		})
	}
	static ExtractJwtFromCookies(req: Request) {
		if (
			req.cookies['rf_token'] &&
			//@ts-ignore
			req.cookies['rf_token'] !== ('undefined' || undefined)
		)
			return req.cookies['rf_token']
		else throw new UnauthorizedException("you don't have rf_token")
	}
	async validate(payload: IJwt) {
		return payload
	}
}
