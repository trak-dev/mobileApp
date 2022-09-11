import { FastifyInstance } from "fastify";
import User_Classe from "../classes/user/user";
import User from '../models/user.model.t';

interface userQueryInterface {
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

    router.post<{Body: userQueryInterface}>('/register', async (req, reply) => {
        try {
          if (!req.body || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) throw "Missing parameters";
          const { firstname, lastname, email, password, pseudo } = req.body;
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
          if (!req.body || !req.body.email || !req.body.password) throw "Missing parameters";
          const { email, password } = req.body;
            const token = await User_Classe.login(email, password);
            reply.status(200).send(token);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const user = await User_Classe.getbyId(req.params.id, req.headers.authorization!);
          reply.status(200).send(user);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      router.delete<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const user = await User_Classe.deleteUser(req.params.id, req.headers.authorization!);
          reply.status(200).send(user);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      router.patch<{Params: {id : string}, Body: userQueryInterface}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id || !req.body || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) throw "Missing parameters";
          const user = req.body;
          const updated_user = await User_Classe.updateUser(req.params.id, req.headers.authorization!, user as User);
          reply.status(200).send(updated_user);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      router.get('/get', async (req, reply) => {
        try {
          const user = await User_Classe.getAllUsers(req.headers.authorization!);
          reply.status(200).send(user);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });


      
};

module.exports = userRoutes