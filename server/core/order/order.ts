import Order from '../../models/order.model.t';
import Basket_Core from '../../core/basket/basket';
import Item_Core from '../../core/item/item';

export default class User_Core {
    
    static async createNewOrder(order: Order) {
        try {
            const basket = await Basket_Core.getBasket(order.user_id, order.basket_id);
            if (!basket) throw "Basket does not exist";
            if (basket.user_id !== order.user_id) throw "Basket does not belong to the user";
            for (const item of basket.items) {
                // @ts-ignore
                const dbItem = await Item_Core.getById(item.id);
                // @ts-ignore
                if (typeof(basket.items) !== "string" && item.quantity < 0) throw "Quantity cannot be negative";
                // @ts-ignore
                if (item.quantity > dbItem.quantity) throw "Not enough quantity to update the basket for " + dbItem.name;
            }
            order.payed = true;
            const orderCreated = await Order.create(order);
            for (let items of basket.items) {
                // @ts-ignore
                const dbItem = await Item_Core.getById(items.id);
                // @ts-ignore
                dbItem.quantity -= items.quantity;
                // @ts-ignore
                await Item_Core.updateItem(dbItem);
            }
            basket.ordered = true;
            await Basket_Core.updateBasket(order.user_id, basket);
            return orderCreated;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while creating new order";
        }
    }

    static async deliverOrder(id : number) {
        try {
            const order = await Order.findOne({where: {payed: true, delivered: false, id}});
            if (!order) throw "No order to deliver";
            order.delivered = true;
            await order.save();
            return order;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while delivering order";
        }
    }

    static async getOrders(user_id: number) {
        try {
            const orders = await Order.findAll({where: {user_id}});
            if (!orders) return "No orders";
            return orders;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while getting orders";
        }
    }

    static async getOrder(user_id: number, id: number) {
        try {
            const order = await Order.findOne({where: {user_id, id}});
            if (!order) return "No orders";
            return order;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while getting order";
        }
    }

    static async cancelOrder(user_id: number, id: number) {
        try {
            const order = await Order.findOne({where: {user_id, id}});
            if (!order) throw "No order to cancel";
            const basket = await Basket_Core.getBasket(order.user_id, order.basket_id);
            for (let items of basket!.items) {
                // @ts-ignore
                const dbItem = await Item_Core.getById(items.id);
                // @ts-ignore
                dbItem.quantity += items.quantity;
                // @ts-ignore
                await Item_Core.updateItem(dbItem);
            }
            await order.destroy(); 
            return true;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while cancelling order";
        }
    }

}