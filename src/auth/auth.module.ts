import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../guards/accTokenStrategy/jwt.strategy'
import { JwtStrategyRf } from '../guards/rfTokenStrategy/jwt.strategy'
import { GoogleAuthGuard } from '../guards/google-strategy/google.guard'

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategyRf, JwtStrategy, GoogleAuthGuard],
})
export class AuthModule {}
