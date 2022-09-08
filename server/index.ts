import fastify from 'fastify';
import { Sequelize } from 'sequelize-typescript';
import User from './models/user.model.t';
import dotenv from 'dotenv';
import config from './config';

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
  models: [User],  
  define: {
    timestamps: false
  },
},
);

const router = fastify({
  // logger: true
});

router.addHook('onRequest', (request, reply, done) => {
  if (!request.headers.authorization) reply.status(403).send({error: "Please provide a token"});
  if ('Bearer' !== request.headers.authorization.split(' ')[0] || !request.headers.authorization.split(' ')[1]) reply.status(403).send({error: "Invalid token"});
  done()
})

router.register(require('./routes/user'), { prefix: '/users' });

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