import fastify from 'fastify';
import { Sequelize } from 'sequelize-typescript';
import User from './models/user.model.t';
import Person from './models/person.model.t';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER!;
const host = process.env.DB_HOST!;
const database = process.env.DB_NAME!;
const password = process.env.DB_PASSWORD!;
const port = parseInt( process.env.PORT! ) || 5432;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  models: [User, Person],  
  define: {
    timestamps: false
  },
},
);

const router = fastify({
  logger: true
});

router.get('/ping', async (request, reply) => {
  return 'pong\n'
});


router.register(require('./routes/user'), { prefix: '/users' });
router.register(require('./routes/person'), { prefix: '/person' });

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