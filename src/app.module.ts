import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ArticlesModule } from './articles/articles.module'
import { CommentsModule } from './comments/comments.module'
import { ProductsModule } from './products/products.module'
import { AuthModule } from './auth/auth.module'
import { StatisticModule } from './statistic/statistic.module'
import { PrismaModule } from './prismaControl/prisma.module'
import { PrismaService } from './prismaControl/prisma.service'

@Module({
	imports: [
		UserModule,
		ArticlesModule,
		CommentsModule,
		ProductsModule,
		StatisticModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
	exports: [],
})
export class AppModule {}
