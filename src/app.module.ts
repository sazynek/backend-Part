import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { ProductsModule } from './products/products.module';
import { StaticticModule } from './statictic/statictic.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, ArticlesModule, CommentsModule, ProductsModule, StaticticModule, AuthModule],
	controllers: [],
	providers: [],
	exports: [],
})
export class AppModule {}
