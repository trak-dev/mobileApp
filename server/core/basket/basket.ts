import Basket from '../../models/basket.model.t';
import Item_Core from '../../core/item/item';

export default class User_Core {
    
    static async createNewBasket(object_id : number, quantity: number, user_id: number) {
        try {
            const basket = await Basket.create({
                items : JSON.stringify([{id : object_id, quantity : quantity }]),
                user_id
            });
            return basket;
        } catch (error) {
            console.error(error);
            throw "Error while creating new basket";
        }
    }

    static async getBaskets(user_id: number) {
        try {
            const baskets = await Basket.findAll({where : {user_id}});
            return baskets;
        } catch (error) {
            console.error(error);
            throw "Error while getting baskets";
        }
    }

    static async getBasket(user_id: number, id: number) {
        try {
            const basket = await Basket.findOne({where : {user_id, id}});
            return basket;
        } catch (error) {
            console.error(error);
            throw "Error while getting basket";
        }
    }

    static async updateBasket(user_id: number, basket: Basket) {
        try {

            for (const item of basket.items) {
                // @ts-ignore
                const dbItem = await Item_Core.getById(item.id);
                // @ts-ignore
                if (typeof(basket.items) !== "string" && item.quantity < 0) throw "Quantity cannot be negative";
                if (!dbItem) throw "Item does not exist";
                // @ts-ignore
                if (dbItem.quantity < item.quantity) throw "Not enough quantity to update the basket for " + dbItem.name;

            }
            basket.items = JSON.stringify(basket.items);
            const updatedBasket = await Basket.update(basket, {where : {user_id, id : basket.id}});
            return updatedBasket;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while updating basket";
        }
    }

    static async deleteBasket(user_id: number, id: number) {
        try {
            const basket = await Basket.destroy({where : {user_id, id}});
            return basket;
        } catch (error) {
            console.error(error);
            throw "Error while deleting basket";
        }
    }

}