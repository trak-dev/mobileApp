import User from '../../models/user.model.t';
import User_Core from '../../core/user/user';


export default class User_Classe {
    
    static async createUser(user: User) {
        try {
            return await User_Core.createUser(user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}