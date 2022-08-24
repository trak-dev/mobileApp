"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_t_1 = __importDefault(require("../models/user.model.t"));
;
async function userRoutes(router) {
    router.post('/createUser', async (req, reply) => {
        try {
            const { id, firstname, lastname, email, password, pseudo } = req.body;
            if (!id || !firstname || !lastname || !email || !password || !pseudo)
                throw "Missing parameters";
            const newUser = new user_model_t_1.default({
                id,
                firstname,
                lastname,
                email,
                password,
                pseudo
            });
            await newUser.save();
            reply.status(200).send(newUser);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: error });
        }
    });
    router.get('/get/:id', async (req, reply) => {
        try {
            const person = await user_model_t_1.default.findAll({ where: { id: req.params.id } });
            reply.status(200).send(person);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: error });
        }
    });
    router.get('/get', async (req, reply) => {
        try {
            const person = await user_model_t_1.default.findAll();
            reply.status(200).send(person);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: error });
        }
    });
    router.delete('/delete/:id', async (req, reply) => {
        try {
            const person = await user_model_t_1.default.destroy({ where: { id: req.params.id } });
            reply.status(200).send(person);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: error });
        }
    });
}
;
module.exports = userRoutes;
