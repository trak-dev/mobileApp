import { FastifyInstance } from "fastify";
import Order_Classe from '../classes/order/order';
import Order from '../models/order.model.t';


async function orderRoutes (router: FastifyInstance) {

    router.post<{Body : Order}>('/', async (req, reply) => {
        try {
          if (!req.body || !req.body.user_id || !req.body.basket_id || !req.body.address) throw "Missing parameters";
          const order = req.body;
          const orderCreated = await Order_Classe.createNewOrder(req.headers.authorization!, order);
          reply.status(200).send(orderCreated);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.patch<{Params: {id : string}}>('/deliver/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const deliveredOrder = await Order_Classe.deliverOrder(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send(deliveredOrder);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.get('/', async (req, reply) => {
        try {
          const orders = await Order_Classe.getOrders(req.headers.authorization!);
          reply.status(200).send(orders);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const order = await Order_Classe.getOrder(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send(order);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

      router.delete<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const order = await Order_Classe.cancelOrder(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send(order);
        } catch (error) {
          console.error(error);
          reply.status(500).send({error: error});
        }
      });

};

module.exports = orderRoutes