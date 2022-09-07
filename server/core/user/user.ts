import User from '../../models/user.model.t';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
            if (!user) throw "User not found";
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw "Password incorrect";
            user.password = "";
            const token = await jwt.sign({ user }, config.jwtSecret, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error(error);
            throw "an error occured while logging in the user";
        }
    }

    static async getByToken(token: string) {
        try {
            const user = await jwt.verify(token, config.jwtSecret);
            return user;
        } catch (error) {
            console.error(error);
            throw "invalid token";
        }
    }
}