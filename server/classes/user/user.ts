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
}