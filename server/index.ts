import fastify from 'fastify';
import { Sequelize } from 'sequelize-typescript';
import User from './models/user.model.t';
import dotenv from 'dotenv';
import config from './config';
import Item from './models/item.model.t';
import Basket from './models/basket.model.t';
import Order from './models/order.model.t';

dotenv.config();

const dbuser = config.database.user;
const host = config.database.host;
const database = config.database.name;
const password = config.database.password;
const port = config.port;

const sequelize = new Sequelize(database, dbuser, password, {
  host,
  port,
  dialect: 'postgres',
  models: [User, Item, Basket, Order],  
  define: {
    timestamps: false
  },
},
);

const routesWithoutAuth = [
  '/users/login',
  '/users/register',
];

const router = fastify({
  // logger: true
});

router.addHook('onRequest', (request, reply, done) => {
  // no auth needed for some routes
  if (routesWithoutAuth.includes(request.raw.url!)) return done();
  // check auth
  if (request.headers.authorization) {
    // check if token is valid
    if (request.headers.authorization.split(' ')[0] && 'Bearer' === request.headers.authorization.split(' ')[0] && request.headers.authorization.split(' ')[1]) {
      request.headers.authorization = request.headers.authorization.split(' ')[1];
      return done();
    } else {
      console.error('Invalid token');
      reply.status(403).send({error: "Invalid token"});
    }
  } else {
    console.error('No token');
    reply.status(401).send({error: "Please provide a token"});
  }
})

router.register(require('./routes/user'), { prefix: '/users' });
router.register(require('./routes/order'), { prefix: '/orders' });
router.register(require('./routes/basket'), { prefix: '/baskets' });
router.register(require('./routes/item'), { prefix: '/items' });

// start server
router.listen({ port: 8080 }, async (err, address) => {

  if (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log(`Server listening at ${address}`);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

})