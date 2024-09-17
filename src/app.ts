import express, { Request, Response } from "express";
import dotenv from "dotenv";
const cors = require('cors')

const {roomRouter} = require("./controllers/routes/room");
const {reservationRouter} = require("./controllers/routes/reservation")
const {treatmentRouter} = require("./controllers/routes/treatment")
const {equipmentRouter} = require("./controllers/routes/equipment")

dotenv.config();
const app = express();

const PORT = process.env.PORT;


const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions))
app.use(express.json());


app.get("/", (req:Request, res:Response) => { 
  res.status(200).send("Hello World");
}); 

app.use(roomRouter);
app.use(reservationRouter);
app.use(treatmentRouter);
app.use(equipmentRouter)




app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
})