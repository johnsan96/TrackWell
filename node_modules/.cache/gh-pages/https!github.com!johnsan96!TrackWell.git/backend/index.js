import express from "express";
import {router as homeRouter} from "./routes/example.js"; 
import {router as activityRouter} from "./routes/activities.js";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors());
app.use(homeRouter); 
app.use(activityRouter);

app.listen(5000, () => {
    console.log("Server started...");
});
