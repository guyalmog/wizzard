import express from 'express';
import cors from 'cors';
import Path from 'path';
import cookieParser from 'cookie-parser';
// routers
import generalroute from './route/routes.js';
import wizards from './route/wizards.js';
import wdata from './route/wdata.js';

import dotenv from 'dotenv';
// configuring .env file
dotenv.config();
// mongodb
import connectDb from "./database/db.js";
const DATABASE_URL = process.env.DB_URL;
connectDb(DATABASE_URL);

const __dirname = Path.resolve();
const app = express();

// server configrations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// using cookieparser package
app.use(cookieParser());
// setting server port
const PORT = process.env.PORT || 3333;

// setting view engine ejs
app.set('view engine', 'ejs');
app.set('views', "./views");
app.use(express.static(__dirname + '/public'));


// general routing
app.use("/", generalroute);
// routing for "/wizards" pages
app.use("/wizards", wizards);
// routing for "/wdata" pages
app.use("/wdata", wdata);
// 404 page
app.get('*', (req, res)=>{
  res.render("pages/404");
});

// running server
app.listen(PORT, () => {
  console.log("localhost:" + PORT);
});