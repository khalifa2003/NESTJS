import { Subcategory } from 'src/modules/subcategory/subcategory.schema';

export interface ISubcategoryRepository {
  create(subcategory: Subcategory): Promise<Subcategory>;
  findAll(): Promise<Subcategory[]>;
  findById(id: string): Promise<Subcategory>;
  update(id: string, subcategory: Partial<Subcategory>): Promise<Subcategory>;
  delete(id: string): Promise<void>;
}
