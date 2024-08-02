import { Module } from '@nestjs/common';
import { BrandRepository } from 'src/common/database repos/brand.repository';
import { CategoryRepository } from 'src/common/database repos/category.repository';
import { ProductRepository } from 'src/common/database repos/product.repository';
import { SubcategoryRepository } from 'src/common/database repos/subcategory.repository';

@Module({
  providers: [
    { provide: 'ProductRepository', useClass: ProductRepository },
    { provide: 'CategoryRepository', useClass: CategoryRepository },
    { provide: 'SubcategoryRepository', useClass: SubcategoryRepository },
    { provide: 'BrandRepository', useClass: BrandRepository },
  ],
  exports: [
    'ProductRepository',
    'CategoryRepository',
    'SubcategoryRepository',
    'BrandRepository',
  ],
})
export class SharedModule {}
