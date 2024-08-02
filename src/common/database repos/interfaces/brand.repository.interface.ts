import { Brand } from 'src/modules/brand/brand.schema';

export interface IBrandRepository {
  create(brand: Brand): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(id: string): Promise<Brand>;
  update(id: string, brand: Partial<Brand>): Promise<Brand>;
  delete(id: string): Promise<void>;
}
