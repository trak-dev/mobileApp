import { FastifyInstance } from "fastify";
import User_Classe from "../classes/user/user";
import User from '../models/user.model.t';

interface loginInterface {
    email : string,
    password : string
  };

async function userRoutes (router: FastifyInstance) {

    router.post<{Body: User}>('/register', async (req, reply) => {
        try {
          if (!req.body || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) throw "Missing parameters";
          const { firstname, lastname, email, password, pseudo, address } = req.body;
            const newUser = new User({
                firstname,
                lastname, 
                email,
                password,
                pseudo,
                address
            });
            const userTokenAndId = await User_Classe.register(newUser);
            reply.status(200).send(userTokenAndId);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
      
      });

      router.post<{Body: loginInterface}>('/login', async (req, reply) => {
        try {
          if (!req.body || !req.body.email || !req.body.password) throw "Missing parameters";
          const { email, password } = req.body;
            const userTokenAndId = await User_Classe.login(email, password);
            reply.status(200).send(userTokenAndId);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
      
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!parseInt(req.params.id)) throw "Missing parameters";
          const user = await User_Classe.getbyId(parseInt(req.params.id), req.headers.authorization!);
          reply.status(200).send(user);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.delete<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!parseInt(req.params.id)) throw "Missing parameters";
          const user = await User_Classe.deleteUser(parseInt(req.params.id), req.headers.authorization!);
          reply.status(200).send({user});
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.patch<{Params: {id : string}, Body: User}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id || !req.body || !req.body.firstname || !req.body.lastname || !req.body.email) throw "Missing parameters";
          const { firstname, lastname, email, password, pseudo, address } = req.body;
          const user = new User({
            id : parseInt(req.params.id),
            firstname,
            lastname, 
            email,
            password,
            pseudo,
            address
        });
          const updated_user = await User_Classe.updateUser(parseInt(req.params.id), req.headers.authorization!, user as User);
          reply.status(200).send({updated_user});
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.get('/get', async (req, reply) => {
        try {
          const user = await User_Classe.getAllUsers(req.headers.authorization!);
          reply.status(200).send(user);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.get('/isUserConnected', async (req, reply) => {
        try {
          const logged = await User_Classe.isUserLoggedIn(req.headers.authorization! );
          reply.status(200).send({logged});
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.get('/isAdminConnected', async (req, reply) => {
        try {
          const logged = await User_Classe.isAdminLoggedIn(req.headers.authorization! );
          reply.status(200).send({logged});
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.patch<{Body: { email : string}}>('/recover-password', async (req, reply) => {
        try {
          if (!req.body || !req.body.email) throw "Missing parameters";
          const { email } = req.body;
          const tokenCreated = await User_Classe.recoverPassword(email);
          reply.status(200).send({tokenCreated});
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.patch<{Body: { password : string, token : string}}>('/reset-password', async (req, reply) => {
        try {
          if (!req.body || !req.body.password || !req.body.token) throw "Missing parameters";
          const { password, token } = req.body;
          const loginData = await User_Classe.resetPassword(password, token);
          reply.status(200).send(loginData);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.get('/', async (req, reply) => {
        try {
          const user = await User_Classe.getByToken(req.headers.authorization!);
          reply.status(200).send(user);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });

      router.patch<{Params : {id: string}}>('/:id/toggle-admin', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          await User_Classe.toggleAdmin(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send(true);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      
      });


      
};

module.exports = userRoutes