import { FastifyInstance } from "fastify";
import Person from '../models/person.model.t';

interface PersonQueryInterface {
    id ?: string,
    first_name : string,
    last_name : string,
    email : string,
  };

async function userRoutes (router: FastifyInstance) {

    router.post<{Body: PersonQueryInterface}>('/createPerson', async (req, reply) => {
        try {
            const { first_name, last_name, email } = req.body;
            if (!first_name || !last_name || !email) throw "Missing parameters";
            const newPerson = new Person({
                id : 4,
                first_name,
                last_name, 
                email,
            });
            await newPerson.save();
            reply.status(200).send(newPerson);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });
      
      router.get<{Params: {id : string}}>('/get/:id', async (req, reply) => {
        try {
          const person = await Person.findAll({where: {id: req.params.id}});
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });
      
      router.get('/get', async (req, reply) => {
        try {
          const person = await Person.findAll();
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

      router.delete<{Params: {id : string}}>('/delete/:id', async (req, reply) => {
        try {
          const person = await Person.destroy({where: {id: req.params.id}});
          reply.status(200).send(person);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      
      });

};

module.exports = userRoutes