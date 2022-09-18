import { FastifyInstance } from "fastify";
import Order_Classe from '../classes/order/order';
import Order from '../models/order.model.t';


async function orderRoutes (router: FastifyInstance) {

    router.put<{Body : {basket_id : string }}>('/', async (req, reply) => {
        try {
          if (!req.body || !req.body.basket_id) throw "Missing parameters";
          const basket_id = parseInt(req.body.basket_id);
          const orderCreated = await Order_Classe.createNewOrder(req.headers.authorization!, basket_id);
          reply.status(200).send(orderCreated);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      });

      router.patch<{Params: {id : string}}>('/deliver/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const deliveredOrder = await Order_Classe.deliverOrder(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send(deliveredOrder);
        } catch (error) {
          console.error(error);1
          reply.status(500).send(error);
        }
      });

      router.get('/', async (req, reply) => {
        try {
          const orders = await Order_Classe.getOrders(req.headers.authorization!);
          reply.status(200).send(orders);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      });

      router.get('/get', async (req, reply) => {
        try {
          const orders = await Order_Classe.getOrdersAdmin(req.headers.authorization!);
          reply.status(200).send(orders);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const order = await Order_Classe.getOrder(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send(order);
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      });

      router.delete<{Params: {id : string}}>('/admin/:id', async (req, reply) => {
        try {
          if (!req.params.id) throw "Missing parameters";
          const order = await Order_Classe.deleteOrderAdmin(req.headers.authorization!, parseInt(req.params.id));
          reply.status(200).send({order});
        } catch (error) {
          console.error(error);
          reply.status(500).send(error);
        }
      });

};

module.exports = orderRoutes