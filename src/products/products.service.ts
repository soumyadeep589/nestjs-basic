import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async insertProduct(dto: CreateProductDto) {
    const product = this.productsRepository.create(dto);
    return await this.productsRepository.save(product);
  }

  getAllProducts() {
    return this.productsRepository.find();
  }

  //   private products: Product[] = [];

  //   insertProduct(title: string, desc: string, price: number) {
  //     const prodId = Math.random().toString();
  //     const newProduct = new Product(prodId, title, desc, price);
  //     this.products.push(newProduct);
  //     return prodId;
  //   }

  //   getAllProducts() {
  //     return [...this.products];
  //   }

  //   getSingleProduct(id: string) {
  //     const [product, index] = this.findProduct(id);
  //     return { ...product };
  //   }

    async updateProduct(id: number, dto: CreateProductDto) {
      const product = await this.productsRepository.findOne({where: {id}});

      Object.assign(product, dto);

      return await this.productsRepository.save(product);
    }

  //   removeProduct(id: string) {
  //     const [_, index] = this.findProduct(id);
  //     this.products.splice(index, 1);
  //   }

  //   private findProduct(id: string): [Product, number] {
  //     const productIndex = this.products.findIndex((prod) => prod.id === id);
  //     const product = this.products[productIndex];
  //     if (!product) {
  //       throw new NotFoundException('Product not Found');
  //     }

  //     return [product, productIndex];
  //   }
}
