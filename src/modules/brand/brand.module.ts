import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandService } from './brand.service';
import { Brand, BrandSchema } from './brand.schema';
import { BrandController } from './brand.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { BrandRepository } from 'src/common/database-repos/brand.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    AuthModule,
    UserModule,
  ],
  controllers: [BrandController],
  providers: [
    BrandService,
    { provide: 'BrandRepository', useClass: BrandRepository },
  ],
  exports: [MongooseModule],
})
export class BrandModule {}
