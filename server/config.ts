import dotenv from 'dotenv';
dotenv.config();
const config = {
    dbuser : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : parseInt( process.env.PORT! ) || 5432,
}

export default config;