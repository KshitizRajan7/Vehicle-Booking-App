import {configDotenv} from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors'; //middleware to allow Cross-Origin Resource Sharing
const app = express();
import { connectToDb } from './db/db.js';
import userRoutes from "./routes/user.routes.js"
import driverRoutes from "./routes/driver.routes.js"; //importing the driver routes
import cookieParser from 'cookie-parser';


connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); //this will parse the cookies from the request.


app.get('/', async (req, res) => {
  res.send('hello');
});
 
app.use('/users', userRoutes); //this will use the user routes for all the requests that start with /users
app.use('/drivers', driverRoutes); //this will use the driver routes for all the requests that start with /drivers

export default app;
