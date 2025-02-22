import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../guards/accTokenStrategy/jwt.strategy'
import { JwtStrategyRf } from '../guards/rfTokenStrategy/jwt.strategy'
import { GoogleStrategy } from '../guards/google-strategy/google.strategy'

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategyRf, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
