import express from 'express';
import cors from 'cors'
import dotenv  from 'dotenv';
dotenv.config();





const app = express();
app.use(express.static('public'));
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ["http://localhost:8000"];

//  CORS middleware
app.use((req, res,  next) =>{
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(","));
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
})

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
            // if (allowedOrigins.indexOf(origin) === -1) {
                callback(null, true);
            }
            else{
                callback(new Error('Origin Not allowed By CORS'));
            }
        }
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const _port = process.env.PORT || 3000;
const server = app.listen(_port, async () => {
    console.log(`Server listening on port ${_port}.\xlb[0m`);
})