import { FastifyInstance } from "fastify";
import User from '../models/user.model.t';

interface userQueryInterface {
    id : string,
    firstname : string,
    lastname : string,
    email : string,
    password : string,
    pseudo : string
  };

async function userRoutes (router: FastifyInstance) {

    router.post<{Body: userQueryInterface}>('/createUser', async (req, reply) => {
        try {
            const { id, firstname, lastname, email, password, pseudo } = req.body;
            if (!id || !firstname || !lastname || !email || !password || !pseudo) throw "Missing parameters";
            const newUser = new User({
                id,
                firstname,
                lastname,
                email,
                password,
                pseudo
            });
            await newUser.save();
            reply.status(200).send(newUser);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });
      
      router.get<{Params: {id : string}}>('/get/:id', async (req, reply) => {
        try {
          const person = await User.findAll({where: {id: req.params.id}});
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });
      
      router.get('/get', async (req, reply) => {
        try {
          const person = await User.findAll();
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      router.delete<{Params: {id : string}}>('/delete/:id', async (req, reply) => {
        try {
          const person = await User.destroy({where: {id: req.params.id}});
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

};

module.exports = userRoutes