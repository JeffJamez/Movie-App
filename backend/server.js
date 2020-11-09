import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from "cors";
import dotenv from 'dotenv';
import config from "./config.js";
import bodyParser from 'body-parser';
import favoritesRoute from './routes/favoritesRoute.js'

//app config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//DB config
const con_url = config.MONGODB_URL;
mongoose.connect(con_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch((error) => console.log(error.reason));

//api routes
app.get("/",(req, res)=>res.status(200).send('Good to Go...'));
app.use("/api/favorites", favoritesRoute);

app.listen(port,()=>console.log(`Listening on localhost:${port}`));