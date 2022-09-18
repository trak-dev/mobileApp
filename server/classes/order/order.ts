import Order from '../../models/order.model.t';
import Order_Core from '../../core/order/order';
import User_Core from '../../core/user/user';
import Basket_Core from '../../core/basket/basket';


export default class Order_Classe {
    
    static async createNewOrder(token: string, basket_id: number) {
        try {
            const user = await User_Core.getByToken(token);
            const basket = await Basket_Core.getBasket(user.id, basket_id);
            if (!basket) throw "Basket does not exist";
            if (basket.ordered || basket.hidden) throw "Basket is already delivered";
            if (basket.user_id !== user.id) throw "Basket does not belong to the user";
            const orderCreated = await Order_Core.createNewOrder(user, basket);
            return orderCreated;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    static async deliverOrder(token: string, id: number) {
        try {
            const user = await User_Core.getByToken(token);
            if (!user.isadmin) throw "You are not an admin";
            const order = await Order_Core.deliverOrder(id);
            return order;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getOrders(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            const orders = await Order_Core.getOrders(user.id);
            return orders;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getOrdersAdmin(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (!user.isadmin) throw "Vous devez etre admin !";
            const orders = await Order_Core.getAllOrders();
            return orders;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getOrder(token: string, id: number) {
        try {
            const user = await User_Core.getByToken(token);
            const order = await Order_Core.getOrder(user.id, id);
            return order;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async cancelOrder(token: string, id: number) {
        try {
            const user = await User_Core.getByToken(token);
            const order = await Order_Core.cancelOrder(user.id, id);
            return order;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    
    static async deleteOrderAdmin(token: string, id: number) {
        try {
            const user = await User_Core.getByToken(token);
            if (!user.isadmin) throw "Vous devez etre admin !";
            const order = await Order_Core.deleteOrderAdmin(id);
            return order;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}