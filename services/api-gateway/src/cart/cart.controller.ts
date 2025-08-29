import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('cart')
export class CartController {
    constructor(private readonly http: HttpService) { }

    @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        const response = await this.http.get(`${process.env.CART_SERVICE_URL}/cart/${userId}`).toPromise();
        return response?.data ?? null;
    }
    @Post()
    async addToCart(@Body() body: any) {
        const response = await this.http
            .post(`${process.env.CART_SERVICE_URL}/cart`, body)
            .toPromise();
        return response?.data??null;
    }
    @Delete(':itemId')
    async removeFromCart(@Param('itemId') itemId: string) {
        const response = await this.http
            .delete(`${process.env.CART_SERVICE_URL}/cart/${itemId}`)
            .toPromise();
        return response?.data ?? null;
    }
}
