import User from '../../models/user.model.t';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../config';

dotenv.config();

export default class User_Core {
    
    static async register(user: User) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            return await user.save();
        } catch (error: any) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                switch (error.errors[0].path) {
                    case 'email':
                        throw 'Email already exists';
                    case 'pseudo':
                        throw 'Pseudo already exists';
                    default:
                        throw error.errors.message;
                }
            } else {
                throw "an error occured while creating the user";
            }
        }
    }

        static async login(email: string, password: string) {
        try {
            const user = await User.findOne({where: {email: email}});
            if (!user) throw "Nom de compte incorrect";
            console.log(password, user.id)
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw "Mot de passe incorrect";
            user.password = "";
            const token = await jwt.sign({ user }, config.jwtSecret, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error(error);
            if (typeof error === 'string') throw error;
            throw "an error occured while logging in the user";
        }
    }

    static async getByToken(token: string) {
        try {
            const userToken = (await jwt.verify(token, config.jwtSecret)) as JwtPayload;
            const user = await User.findOne({where: {id: userToken.user.id}});
            if (!user) throw "Utilisateur non trouvé";
            user.password = "";
            return user as User;
        } catch (error) {
            console.error(error);
            throw "invalid token";
        }
    }

    static async getbyId(id: number) {
        try {
            const user = await User.findOne({where: {id: id}});
            if (!user) throw "Utilisateur non trouvé";
            return user;
        } catch (error) {
            console.error(error);
            if (error === "Utilisateur non trouvé") throw error;
            throw "an error occured while getting the user";
        }
    }

    static async getAllUsers() {
        try {
            return await User.findAll();
        } catch (error) {
            console.error(error);
            throw "an error occured while getting all users";
        }
    }

    static async deleteUser(id: number) {
        try {
            return await User.destroy({where: {id: id}});
        } catch (error) {
            console.error(error);
            throw "an error occured while deleting the user";
        }
    }

    static async updateUser(id: number, user: User) {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            return await User.update(user, {where: {id: id}});
        } catch (error) {
            console.error(error);
            throw "an error occured while updating the user";
        }
    }

    static async getByEmail(email: string) {
        try {
            const user = await User.findOne({where: {email: email}});
            if (!user) throw "Utilisateur non trouvé";
            return user;
        } catch (error) {
            console.error(error);
            if (error === "Utilisateur non trouvé") throw error;
            throw "an error occured while getting the user";
        }
    }

    static async recoverPassword(user: User) {
        try {
            const token = await jwt.sign({ id : user.id }, config.jwtSecret, { expiresIn: '1h' });
            user.update({password_token: token}, {where: {id: user.id}});
            return true;
        } catch (error) {
            console.error(error);
            throw "an error occured while recovering the password";
        }
    }

    static async resetPassword(token: string, password: string) {
        try {
            const userToken = (await jwt.verify(token, config.jwtSecret)) as JwtPayload;
            if (!userToken.id) throw "invalid token";
            const user = await User.findOne({where: {id: userToken.id}});
            if (!user) throw "Utilisateur non trouvé";
            console.log(password, user.id)
            user.password = await bcrypt.hash(password, 10);
            user.password_token = "";
            await user.save();
            user.password = "";
            return user;
        } catch (error) {
            console.error(error);
            throw "an error occured while resetting the password";
        }
    }
}