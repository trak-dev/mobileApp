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

    static async getActiveBaskets(user_id: number) {
        try {
            const baskets = await Basket.findAll({where : {user_id, ordered: false, hidden: false}});
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
            basket.items = JSON.stringify(basket.items);
            const updatedBasket = await Basket.update({
                items : basket.items,
                ordered : basket.ordered,
                hidden : basket.hidden
            }, {where : {user_id, id : basket.id}});
            return updatedBasket;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while updating basket";
        }
    }

    static async deleteBasket(user_id: number, id: number) {
        try {
            const basket = await Basket.findByPk(id);
            // @ts-ignore
            for (const basketItem of basket.items) {
                // @ts-ignore
                const item = await Item_Core.getById(basketItem.id);
                // @ts-ignore
                item.quantity += basketItem.quantity;
                await Item_Core.updateItem(item!);
            }
            const deleted = await Basket.destroy({where : {user_id, id}});
            return deleted;
        } catch (error) {
            console.error(error);
            throw "Error while deleting basket";
        }
    }

    static async updateActiveBasket(user_id: number, activeBasket: Basket, object_id: number, quantity: number) {
        try {
            // @ts-ignore
            const item = activeBasket.items.find((item) => item.id === object_id);
            if (item) {
                item.quantity += quantity;
            } else {
                // @ts-ignore
                activeBasket.items.push({id : object_id, quantity});
            }
            return await Basket.update({items : JSON.stringify(activeBasket.items)}, {where : {user_id, id : activeBasket.id}});
        } catch (error) {
            console.error(error);
            throw "Error while updating active basket";
        }
    }

}