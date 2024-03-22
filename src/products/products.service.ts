import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProducts() {
        return [...this.products];
    }

    getSingleProduct(id: string) {
        const [product, index] = this.findProduct(id);
        return {...product};
    }

    updateProduct(id: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updatedProduct = {...product};
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.desc = desc
        }
        if (price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct;
    }

    removeProduct(id: string) {
        const [_, index] = this.findProduct(id);
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException("Product not Found");
        }

        return [product, productIndex]
    }
}