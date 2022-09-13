import Order from '../../models/order.model.t';
import Order_Core from '../../core/order/order';
import User_Core from '../../core/user/user';


export default class Order_Classe {
    
    static async createNewOrder(token: string, order: Order) {
        try {
            const user = await User_Core.getByToken(token);
            order.user_id = user.id;
            const orderCreated = await Order_Core.createNewOrder(order);
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
    
}