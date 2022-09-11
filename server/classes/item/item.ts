import Item from '../../models/item.model.t';
import Item_Core from '../../core/item/item';
import User_Core from '../../core/user/user';


export default class Item_Classe {
    
    static async add(item: Item, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (!user.isadmin) throw "You are not allowed to add items";
            return await Item_Core.add(item);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAll(token: string) {
        try {
            await User_Core.getByToken(token);
            return await Item_Core.getAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getById(id: string, token: string) {
        try {
            await User_Core.getByToken(token);
            return await Item_Core.getById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteItem(id: string, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (!user.isadmin) throw "You are not allowed to delete items";
            return await Item_Core.deleteItem(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateItem(item: Item, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (!user.isadmin) throw "You are not allowed to update items";
            const newItem = await Item_Core.updateItem(item);
            return newItem;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}