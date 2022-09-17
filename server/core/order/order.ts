import Order from '../../models/order.model.t';
import Basket_Core from '../../core/basket/basket';
import Item_Core from '../../core/item/item';
import basket from '../../models/basket.model.t';
import User from '../../models/user.model.t';

export default class User_Core {
    
    static async createNewOrder(user : User,basket : basket) {
        console.log("basket", basket.id, "user", user.address);
        try {
            const order = new Order({
                user_id: user.id,
                basket_id: basket.id,
                payed: true,
                delivered: false,
                address: user.address,
            });
            console.log("order", order);
            const orderCreated = await order.save();
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

    static async cancelOrder(user_id: number, basket_id: number) {
        try {
            const order = await Order.findOne({where: {user_id, basket_id}});
            if (!order) throw "No order to cancel";
            const basket = await Basket_Core.getBasket(order.user_id, order.basket_id);
            console.log(user_id, basket_id, order)
            for (let items of basket!.items) {
                // @ts-ignore
                const dbItem = await Item_Core.getById(items.id);
                // @ts-ignore
                dbItem.quantity += items.quantity;
                // @ts-ignore
                await Item_Core.updateItem(dbItem);
            }
            await basket!.destroy();
            await order.destroy(); 
            return true;
        } catch (error) {
            console.error(error);
            if (typeof(error) === "string") throw error;
            throw "Error while cancelling order";
        }
    }

}