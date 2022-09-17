import User from '../../models/user.model.t';
import User_Core from '../../core/user/user';


export default class User_Classe {
    
    static async register(user: User) {
        try {
            const pwd = user.password;
            const newuser = await User_Core.register(user);
            const token = await User_Core.login(newuser.email, pwd);
            newuser.password = "";
            return {token, user: newuser};
        } catch (error) {
            console.error(error);
            throw "Erreur lors de l'enregistrement";
        }
    }

    static async login(email: string, password: string) {
        try {
            const token =  await User_Core.login(email, password);
            const user = await User_Core.getByToken(token);
            return {token, user};
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la connexion";
        }
    }

    static async getbyId(id: number, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user.isadmin) {
                return await User_Core.getbyId(id);
            } else {
                return await User_Core.getbyId(user.id);
            }
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la récupération de l'utilisateur";
        }
    }

    static async getAllUsers(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user.isadmin) {
                return await User_Core.getAllUsers();
            } else {
                throw "Vous n'etes pas autorisés à récupérer la liste des utilisateurs";
            }
        } catch (error) {
            console.error(error);
            if (typeof error === "string") {
             throw error;
            } else {
                throw "Erreur lors de la récupération de la liste des utilisateurs";
            }
        }
    }
    
    static async deleteUser(id: number, token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user.isadmin) {
                return await User_Core.deleteUser(id);
            } else {
                return await User_Core.deleteUser(user.id);
            }
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la suppression de l'utilisateur";
        }
    }

    static async updateUser(id: number, token: string, user: User) {
        try {
            const requesting_user = await User_Core.getByToken(token);
            if (requesting_user.isadmin) {
                return await User_Core.updateUser(id, user);
            } else {
                user.id = requesting_user.id;
                return await User_Core.updateUser(requesting_user.id, user);
            }
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la mise à jour de l'utilisateur";
        }
    }

    static async isUserLoggedIn(token: string) {
        try {
            const user = await User_Core.getByToken(token);
            if (user) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la vérification de l'utilisateur";
        }
    }

    static async recoverPassword(email: string) {
        try {
            const User = await User_Core.getByEmail(email);
            return await User_Core.recoverPassword(User);
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la récupération du mot de passe";
        }
    }

    static async resetPassword(password: string, token: string) {
        try {
            const pwd = password;
            const user = await User_Core.resetPassword(token, pwd);
            const loginToken = await User_Core.login(user.email, pwd);
            return {token : loginToken, user};
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la réinitialisation du mot de passe";
        }
    }

    static async getByToken(token: string) {
        try {
            return await User_Core.getByToken(token);
        } catch (error) {
            console.error(error);
            throw "Erreur lors de la récupération de l'utilisateur";
        }
    }
}