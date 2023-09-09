import IcartRepository from "../../../repositories/Production/Cart/cartRepositories";
import { HttpCode, AppError } from "../../../exceptions/appError";
import { ICartInterface, ICartItemInterface } from "../../../interfaces /Production/Cart/cartInterface";
import { Cart, CartItem } from "../../../models/Production/Cart/cart";
// import Product from "../../../models/Production/Product/product";
// import { IProductInterface } from "../../../interfaces /Production/Product/productInterface";


export class CartRepository implements IcartRepository {

    // Create a new cart item
    async createCartItem(reqBody: any): Promise<any> {
        try {
            // const { user } = reqBody;
            // const cartItemData: ICartItemInterface = reqBody.cartItem;

            const { userId, productId, quantity } = reqBody;

            // Find the user's cart or create one if it doesn't exist
            let cart: ICartInterface | null = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId, items: [] });
            }

            const cartItem = new CartItem({
                products: productId,
                quantity,
                // ... other cart item fields
            });
            await cartItem.save()

            // Add the new cart item
            cart.items.push(cartItem);
            await cart.save();
            


            return cart;
        } catch (error) {
            console.error('Error creating cart item:', error);
        }
    };

    // Get a cart by user ID
    // Read all cart items for a user
    async getCartByUser(reqParams: any): Promise<any> {
        try {
            const { userId } = reqParams;

            const cart: ICartInterface | null = await Cart.findOne({ user: userId }).populate('items.products');

            if (!cart) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Cart is not Found'
                });
            }

            return cart;

        } catch (error) {
            console.error('Error getting cart items:', error);
        }
    };

    // Update a cart item's quantity
    async updateCartItem(reqBody: any): Promise<any> {
        try {
            const { userId, itemId, quantity } = reqBody;

            const cart: ICartInterface | null = await Cart.findOne({ user: userId });

            if (!cart) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Cart is not Found'
                });
            }

            // const cartItem = cart.items.id(cartItemId);
            // const cartItems = cart.items.filter((item) => item.products === productItemId)
            
            // Find the cart item by ID
            const cartItems: ICartItemInterface | null = await CartItem.findByIdAndUpdate(itemId, { quantity });

            if (!cartItems) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Cart Item is not Found'
                });
            }
            
            await cart.save();

        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };


    // Remove an item from the cart
    // Delete a cart item
    async removeCartItem(reqParams: any): Promise<any> {
        try {
            const { userId, itemId } = reqParams;

            const cart: ICartInterface | null = await Cart.findOne({ user: userId });

            if (!cart) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Cart is not Found'
                });
            }

            await CartItem.findByIdAndRemove(itemId);

            await cart.save();

        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };






}









