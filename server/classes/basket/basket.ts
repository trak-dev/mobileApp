import Basket from '../../models/basket.model.t';
import Basket_Core from '../../core/basket/basket';
import User_Core from '../../core/user/user';
import Item_Core from '../../core/item/item';


export default class Basket_Classe {
    
    static async createNewBasket(token: string, object_id: number, quantity: number) {
        try {
            const user = await User_Core.getByToken(token);
            const item = await Item_Core.getById(object_id);
            if (!item) throw "Item does not exist";
            if (item.quantity < quantity) throw "Not enough quantity to create the basket";
            const active_baskets = await Basket_Core.getActiveBaskets(user.id);
            if (active_baskets[0]) {
                await Basket_Core.updateActiveBasket(user.id, active_baskets[0], object_id, quantity);
            } else {
                await Basket_Core.createNewBasket(item.id, quantity, user.id);
            }
            item.quantity -= quantity;
            await Item_Core.updateItem(item);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async getBaskets(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            const baskets = await Basket_Core.getBaskets(user.id);
            return baskets;
        } catch (error) {
            throw error;
        }
    }
    
    static async getBasket(token: string, id: number) {
        try {
            const user = await User_Core.getByToken(token);
            const basket = await Basket_Core.getBasket(user.id, id);
            return basket;
        } catch (error) {
            throw error;
        }
    }

    static async updateBasket(token: string, basket: Basket) {
        try {
            const user = await User_Core.getByToken(token);
            const updatedBasket = await Basket_Core.updateBasket(user.id, basket);
            return updatedBasket;
        } catch (error) {
            throw error;
        }
    }

    static async deleteBasket(token: string, id: number) {
        try {
            const user = await User_Core.getByToken(token);
            const basket = await Basket_Core.deleteBasket(user.id, id);
            return basket;
        } catch (error) {
            throw error;
        }
    }
}