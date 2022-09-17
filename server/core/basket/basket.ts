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
            throw "Erreur pendant la création du panier";
        }
    }

    static async getBaskets(user_id: number) {
        try {
            const baskets = await Basket.findAll({where : {user_id}});
            return baskets;
        } catch (error) {
            console.error(error);
            throw "Erreur pendant la récupération des paniers";
        }
    }

    static async getActiveBaskets(user_id: number) {
        try {
            const baskets = await Basket.findAll({where : {user_id, ordered: false, hidden: false}});
            return baskets;
        } catch (error) {
            console.error(error);
            throw "Erreur pendant la récupération des paniers";
        }
    }

    static async getBasket(user_id: number, id: number) {
        try {
            const basket = await Basket.findOne({where : {user_id, id}});
            return basket;
        } catch (error) {
            console.error(error);
            throw "Erreur pendant la récupération du panier";
        }
    }

    static async updateBasket(user_id: number, basket: Basket) {
        try {
            const oldBasket = await Basket.findByPk(basket.id);
            for (let item of basket.items) {
                // @ts-ignore
                const oldItem = oldBasket!.items.find((oldItem) => oldItem.id === item.id);

                // @ts-ignore
                const itemFromDB = await Item_Core.getById(item.id);

                if (!itemFromDB!.id) throw "L'objet n'existe pas";

                // @ts-ignore
                let numberToChange = item.quantity - oldItem.quantity;

                // @ts-ignore
                if (itemFromDB.quantity - numberToChange < 0) throw "Pas assez d'objets en stock !";

                // @ts-ignore
                itemFromDB!.quantity -= numberToChange;
                await Item_Core.updateItem(itemFromDB!); 

                // @ts-ignore
                if (item.quantity === 0) {
                    // @ts-ignore
                    basket.items = basket.items.filter((i) => i.id !== oldItem.id);
                }

            }
            if (basket.items.length === 0) {
                await Basket.destroy({where : {user_id, id : basket.id}});
            } else {
                basket.items = JSON.stringify(basket.items);
                await Basket.update({
                    items : basket.items,
                    ordered : basket.ordered,
                    hidden : basket.hidden
                }, {where : {user_id, id : basket.id}});
            }
            return true;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Erreur pendant la mise à jour du panier";
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
            throw "Erreur pendant la suppression du panier";
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
            throw "Erreur pendant la mise à jour du panier";
        }
    }

}