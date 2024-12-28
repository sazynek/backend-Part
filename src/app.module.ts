import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ArticlesModule } from './articles/articles.module'
import { CommentsModule } from './comments/comments.module'
import { ProductsModule } from './products/products.module'
import { AuthModule } from './auth/auth.module'
import { StatisticModule } from './statistic/statistic.module'
import { CategoriesModule } from './categories/categories.module';
import { PraiseModule } from './praise/praise.module';
import { ProductCollectionsModule } from './product-collections/product-collections.module';
import { StatusProductModule } from './status-product/status-product.module';
import * as cookieParser from 'cookie-parser'

@Module({
	imports: [
		UserModule,
		ArticlesModule,
		CommentsModule,
		ProductsModule,
		StatisticModule,
		AuthModule,
		CategoriesModule,
		PraiseModule,
		ProductCollectionsModule,
		StatusProductModule,
	],
	controllers: [],
	providers: [],
	exports: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(cookieParser()).forRoutes('*')
	}
}
