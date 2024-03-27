import { Body, Controller, Post, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";
import { CreateProductDto } from "./dtos/createProduct.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProduct(
        @Body() dto: CreateProductDto
    ) {
        return this.productService.insertProduct(dto);
    }

    @Get()
    getProducts() {
        return this.productService.getAllProducts();
    }

    // @Get(':id')
    // getSingleProduct(@Param('id') id: string) {
    //     return this.productService.getSingleProduct(id);
    // }

    @Patch(':id')
    updateProduct(
        @Param('id') id: number,
        @Body() dto: CreateProductDto
     ) {
        return this.productService.updateProduct(id, dto);
     }

    // @Delete(':id')
    // removeProduct(@Param('id') id: string) {
    //     return this.productService.removeProduct(id);
    // }
}