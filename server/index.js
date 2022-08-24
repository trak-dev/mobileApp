"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_t_1 = __importDefault(require("./models/user.model.t"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const port = parseInt(process.env.PORT) || 5432;
const sequelize = new sequelize_typescript_1.Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    models: [user_model_t_1.default],
    define: {
        timestamps: false
    },
});
const router = (0, fastify_1.default)({
    logger: true
});
router.get('/ping', async (request, reply) => {
    return 'pong\n';
});
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
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
