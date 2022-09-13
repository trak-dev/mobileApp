import { FastifyInstance } from "fastify";
import Basket_Classe from '../classes/basket/basket';
import Basket from '../models/basket.model.t';


async function basketRoutes (router: FastifyInstance) {

    router.post<{Body: { object_id: number, quantity: number}}>('/', async (req, reply) => {
        try {
            if (!req.body || !req.body.object_id || !req.body.quantity ) throw "Missing parameters";
            const { object_id, quantity} = req.body;
            const createdBasket = await Basket_Classe.createNewBasket(req.headers.authorization!, object_id, quantity);
            reply.status(200).send(createdBasket);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.get('/', async (req, reply) => {
        try {
            const baskets = await Basket_Classe.getBaskets(req.headers.authorization!);
            reply.status(200).send(baskets);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
            if (!req.params.id ) throw "Missing parameters";
            const basket = await Basket_Classe.getBasket(req.headers.authorization!, req.params.id);
            reply.status(200).send(basket);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.patch<{Body: Basket}>('/', async (req, reply) => {
        try {
            if (!req.body || !req.body.id) throw "Missing parameters";
            const basket = req.body;
            const createdBasket = await Basket_Classe.updateBasket(req.headers.authorization!, basket);
            reply.status(200).send(createdBasket);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

      router.delete<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
            if (!req.params.id) throw "Missing parameters";
            const deletedBasket = await Basket_Classe.deleteBasket(req.headers.authorization!, req.params.id);
            reply.status(200).send(deletedBasket);
        } catch (error) {
            console.error(error);
            reply.status(500).send({error: error});
        }
      
      });

};

module.exports = basketRoutes