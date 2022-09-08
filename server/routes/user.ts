import { FastifyInstance } from "fastify";
import User_Classe from "../classes/user/user";
import User from '../models/user.model.t';

interface registerQueryInterface {
    firstname : string,
    lastname : string,
    email : string,
    password : string,
    pseudo : string
  };

interface loginInterface {
    email : string,
    password : string
  };

async function userRoutes (router: FastifyInstance) {

    router.post<{Body: registerQueryInterface}>('/register', async (req, reply) => {
        try {
            const { firstname, lastname, email, password, pseudo } = req.body;
            if (!firstname || !lastname || !email || !password) throw "Missing parameters";
            const newUser = new User({
                firstname,
                lastname, 
                email,
                password,
                pseudo
            });
            const createdUser = await User_Classe.register(newUser);
            reply.status(200).send(createdUser);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.post<{Body: loginInterface}>('/login', async (req, reply) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw "Missing parameters";
            const token = await User_Classe.login(email, password);
            reply.status(200).send(token);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.get<{Params: {id : string}}>('/get/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          if (!req.headers.authorization) throw "Missing token";
          if ('Bearer' !== req.headers.authorization.split(' ')[0] || !req.headers.authorization.split(' ')[1]) throw "Invalid token";
          const person = await User_Classe.getbyId(req.params.id, req.headers.authorization.split(' ')[1]);
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      router.get('/get', async (req, reply) => {
        try {
          if (!req.headers.authorization) throw "Missing token";
          if ('Bearer' !== req.headers.authorization.split(' ')[0] || !req.headers.authorization.split(' ')[1]) throw "Invalid token";
          const person = await User_Classe.getAllUsers(req.headers.authorization.split(' ')[1]);
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      // router.delete<{Params: {id : string}}>('/delete/:id', async (req, reply) => {
      //   try {
      //     const person = await User.destroy({where: {id: req.params.id}});
      //     reply.status(200).send(person);
      //   } catch (error) {
      //     console.error(error);
      //     reply.status(500).send({error: error});
      //   }
      
      // });
      
};

module.exports = userRoutes