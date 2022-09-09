import User from '../../models/user.model.t';
import User_Core from '../../core/user/user';


export default class User_Classe {
    
    static async register(user: User) {
        try {
            return await User_Core.register(user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async login(email: string, password: string) {
        try {
            return await User_Core.login(email, password);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getbyId(id: string, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user.isadmin) {
                return await User_Core.getbyId(id);
            } else {
                return await User_Core.getbyId(user.id);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllUsers(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user.isadmin) {
                return await User_Core.getAllUsers();
            } else {
                throw "You are not allowed to get all users";
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static async deleteUser(id: string, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user.isadmin) {
                return await User_Core.deleteUser(id);
            } else {
                return await User_Core.deleteUser(user.id);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}