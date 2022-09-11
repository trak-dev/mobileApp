import Item from '../../models/item.model.t';

export default class User_Core {
    
    static async add(item: Item) {
        try {
            return await item.save();
        } catch (error: any) {
            console.error(error);
            if (error.code === '22001') throw "the name or description is too long";
            throw "an error occured while adding the item";
        }
    }

    static async getAll() {
        try {
            return await Item.findAll();
        } catch (error) {
            console.error(error);
            throw "an error occured while getting all items";
        }
    }

    static async getById(id: string) {
        try {
            return await Item.findByPk(id);
        } catch (error) {
            console.error(error);
            throw "an error occured while getting the item";
        }
    }

    static async deleteItem(id: string) {
        try {
            const item = await Item.findByPk(id);
            if (!item) throw "item not found";
            await item.destroy();
            return item;
        } catch (error) {
            console.error(error);
            throw "an error occured while deleting the item";
        }
    }

    static async updateItem(item: Item) {
        try {
            const oldItem = await Item.findByPk(item.id);
            if (!oldItem) throw "item not found";
            const newItem = await Item.update( item.get() , { where: { id : item.id } });
            return newItem;
        } catch (error) {
            console.error(error);
            throw "an error occured while updating the item";
        }
    }

}