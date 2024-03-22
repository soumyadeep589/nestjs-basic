import { Body, Controller, Post, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('desc') desc: string,
        @Body('price') price: number,
    ) {
        const generatedId = this.productService.insertProduct(title, desc, price);
        return {id: generatedId};
    }

    @Get()
    getProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') id: string) {
        return this.productService.getSingleProduct(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('desc') desc: string,
        @Body('price') price: number
     ) {
        return this.productService.updateProduct(id, title, desc, price);
     }

    @Delete(':id')
    removeProduct(@Param('id') id: string) {
        return this.productService.removeProduct(id);
    }
}