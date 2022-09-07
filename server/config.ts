import dotenv from 'dotenv';
dotenv.config();
const config = {
    database : {
        user : process.env.DB_USER || '',
        host : process.env.DB_HOST || '',
        name : process.env.DB_NAME || '',
        password : process.env.DB_PASSWORD || '',
    },
    port : parseInt( process.env.PORT! ) || 5432,
    jwtSecret : process.env.JWT_SECRET || '',
}

export default config;