import { FastifyInstance } from "fastify";
import Item_Classe from '../classes/item/item';
import Item from '../models/item.model.t';


async function itemRoutes (router: FastifyInstance) {

    router.post<{Body: Item}>('/', async (req, reply) => {
        try {
            if (!req.body || !req.body.name || !req.body.description || !req.body.price || !req.body.picture || !req.body.quantity) throw "Missing parameters";
            const { name, description, price, picture, quantity } = req.body;
            const newItem = new Item({
                name,
                description,
                price,
                picture,
                quantity
            });
            const createdItem = await Item_Classe.add(newItem, req.headers.authorization!);
            reply.status(200).send(createdItem);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.get('/', async (req, reply) => {
        try {
            const allItems = await Item_Classe.getAll(req.headers.authorization!);
            reply.status(200).send(allItems);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!parseInt(req.params.id)) throw "Missing parameters";
            const item = await Item_Classe.getById(parseInt(req.params.id), req.headers.authorization!);
            reply.status(200).send(item);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.delete<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!parseInt(req.params.id)) throw "Missing parameters";
            const item = await Item_Classe.deleteItem(parseInt(req.params.id), req.headers.authorization!);
            reply.status(200).send(item);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.patch<{ Body: Item}>('/', async (req, reply) => {
        try {
          if (!req.body || !req.body.name || !req.body.id || !req.body.description || !req.body.price || !req.body.picture || !req.body.quantity) throw "Missing parameters";
          const { id, name, description, price, picture, quantity } = req.body;
          const item = new Item({
            id,
            name,
            description,
            price,
            picture,
            quantity
          });
          const newItem = await Item_Classe.updateItem(item, req.headers.authorization!);
          reply.status(200).send(newItem);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

};

module.exports = itemRoutes