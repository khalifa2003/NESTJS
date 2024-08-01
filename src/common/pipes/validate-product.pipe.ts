import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/modules/brand/brand.schema';
import { Category } from 'src/modules/category/category.schema';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { Subcategory } from 'src/modules/subcategory/subcategory.schema';

@Injectable()
export class ValidateProductPipe implements PipeTransform {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
  ) {}
  async transform(value: CreateProductDto) {
    const category = await this.categoryModel.findById(value.category).exec();
    if (!category) {
      throw new BadRequestException('Category not found.');
    }

    const brand = await this.brandModel.findById(value.brand).exec();
    if (!brand) {
      throw new BadRequestException('Brand not found.');
    }

    if (value.subcategories.length > 0) {
      const subcategory = await this.subcategoryModel
        .find({
          _id: { $in: value.subcategories },
        })
        .exec();
      subcategory.map((sub) => {
        if (sub.category != value.category) {
          throw new BadRequestException(
            `Subcategory ${sub.name} not belong to this ${value.category}`,
          );
        }
      });
    }

    if (!value.quantity || value.quantity <= 0) {
      throw new BadRequestException('Quantity must be a positive number.');
    }

    return value;
  }
}
