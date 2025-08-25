import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: { category },
      order: { created_at: 'DESC' }
    });
  }

  async findDiscounted(): Promise<Product[]> {
    return this.productsRepository.find({
      where: { discount: true },
      order: { created_at: 'DESC' }
    });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
        { category: Like(`%${query}%`) }
      ],
      order: { created_at: 'DESC' }
    });
  }
}
