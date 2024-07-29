import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { Product } from 'src/modules/product/product.schema';

@Injectable()
export class CartServeice {
  constructor(
    @InjectModel(Product.name) private ProductSchema: Model<Product>,
    @InjectModel(Cart.name) private CartSchema: Model<Cart>,
  ) {}

  async addOneToCart(body) {
    const productId = body.product;
    const product = await this.ProductSchema.findById(productId);
    let cart = await this.CartSchema.findOne({ user: body.user._id });
    if (!cart) {
      // create cart fot logged user with product
      cart = await this.CartSchema.create({
        user: body.user._id,
        cartItems: [{ product: productId, price: product.price }],
      });
    } else {
      const productIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId,
      );
      if (productIndex > -1) {
        const cartItem = cart.cartItems[productIndex];
        cartItem.quantity += 1;
        cart.cartItems[productIndex] = cartItem;
      } else {
        cart.cartItems.push({
          product: productId,
          price: product.price,
          quantity: 0,
          createdAt: undefined,
        });
      }
    }
    // Calculate total cart price
    calcTotalCartPrice(cart);
    await cart.save();

    return cart;
  }

  async getCart(body) {
    const cart = await this.CartSchema.findOne({ user: body.user._id });
    if (!cart) {
      return new Error(`There is no cart for this user id : ${body.user._id}`);
    }
    return cart;
  }

  async removeOneFromCart(body, params) {
    const cart = await this.CartSchema.findOneAndUpdate(
      { user: body.user._id },
      {
        $pull: { cartItems: { _id: params.itemId } },
      },
      { new: true },
    );
    calcTotalCartPrice(cart);
    cart.save();

    return cart;
  }

  async clear(id: string) {
    await this.CartSchema.findOneAndDelete({ user: id });
    return;
  }

  async updateQuantity(body, params) {
    const cart = await this.CartSchema.findOne({ user: body.user._id });
    if (!cart) {
      return new Error(`there is no cart for user ${body.user._id}`);
      // return next(
      //   new ApiError(`there is no cart for user ${body.user._id}`, 404),
      // );
    }
    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === params.itemId,
    );
    if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantity = +body.quantity;
      cart.cartItems[itemIndex] = cartItem;
    } else {
      return new Error(`there is no item for this id :${params.itemId}`);
      // return next(
      //   new ApiError(`there is no item for this id :${req.params.itemId}`, 404),
      // );
    }
    calcTotalCartPrice(cart);
    await cart.save();

    return cart;
  }
}

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};
